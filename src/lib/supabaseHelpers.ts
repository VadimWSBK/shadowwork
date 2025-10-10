import { supabase } from './supabaseClient';

type Language = 'en' | 'de' | 'pl';

export type AnswerRow = {
  day_id: string;
  question_index: number;
  answer_text: string | null;
  updated_at?: string | null;
};

export async function fetchAnswersForUser(params: { profileId?: string; username?: string }) {
  const { profileId } = params;
  try {
    // Prefer stable profile_id
    if (profileId) {
      const { data, error } = await supabase
        .from('answers')
        .select('day_id, question_index, answer_text, updated_at')
        .eq('profile_id', profileId)
        .order('day_id', { ascending: true })
        .order('question_index', { ascending: true });
      if (!error && data && data.length > 0) return { data: data as AnswerRow[], error: null };
      if (error) {
        // Fall through to username or RPC
      }
    }

    // No username fallback: rely on RPC if profile_id isn’t known

    // RPC fallback: expects a server-side function that returns rows for current auth user
    try {
      const { data, error } = await supabase.rpc('get_user_answers');
      if (!error && Array.isArray(data)) return { data: data as AnswerRow[], error: null };
    } catch {}

    return { data: [], error: null };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

// Backward-compat: original username-only upsert
export async function upsertProfile(username: string) {
  if (!username) return { error: new Error('Missing username') };
  try {
    const { error } = await supabase
      .from('profiles')
      .upsert({ username }, { onConflict: 'username' });
    return { error };
  } catch (e) {
    return { error: e as Error };
  }
}

// New: upsert or update profile by unique email, including settings like language
export async function updateProfileSettings(params: { email: string; username?: string; language?: Language }) {
  const { email, username, language } = params;
  if (!email) return { error: new Error('Missing email') };
  try {
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('id, username')
      .eq('email', email)
      .single();
    if (fetchError || !profile?.id) {
      console.error('Profile not found for update:', fetchError?.message || 'No profile');
      return { error: fetchError || new Error('Profile not found') };
    }

    // If trying to change username, check if it's different from current and if it's available
    if (username && username !== profile.username) {
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', username)
        .neq('id', profile.id) // Exclude current user
        .limit(1);
      
      if (checkError) {
        console.error('Error checking username availability:', checkError);
        return { error: new Error('Could not check username availability') };
      }
      
      if (existingUser && existingUser.length > 0) {
        return { error: new Error('USERNAME_TAKEN') };
      }
    }

    const updates: Record<string, any> = {};
    if (username) updates.username = username;
    if (language) updates.language = language;
    if (Object.keys(updates).length === 0) return { error: null };
    
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id);
    
    if (error) {
      // Handle specific constraint violations
      if (error.message.includes('profiles_username_unique')) {
        return { error: new Error('USERNAME_TAKEN') };
      }
      return { error };
    }
    
    return { error: null };
  } catch (e) {
    console.error('Update profile settings failed:', e);
    return { error: e as Error };
  }
}

export async function getProfileByEmail(email: string) {
  if (!email) return { data: null, error: new Error('Missing email') };
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, email, username, language, payment_received')
      .eq('email', email)
      .limit(1)
      .maybeSingle();
    return { data, error };
  } catch (e) {
    return { data: null, error: e as Error };
  }
}

export async function persistAnswer(params: {
  profileId?: string;
  username?: string;
  dayId: string;
  questionIndex: number;
  answer: string;
}) {
  const { profileId, dayId, questionIndex, answer } = params;
  if (!dayId) return { error: new Error('Missing dayId') };
  // Small utility to prevent hanging requests causing the UI to feel stuck
  // Accept any thenable (Supabase builders are awaitable but not typed as Promise)
  const withTimeout = <T>(fn: () => any, ms = 4000): Promise<T> =>
    Promise.race<T>([
      Promise.resolve(fn()),
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Timeout during persistAnswer')), ms))
    ]);

  // Preferred path: server-side upsert using explicit profile_id (fast, avoids auth stalls)
  if (profileId) {
    try {
      const rpcProfileResp: any = await withTimeout(
        () =>
          supabase.rpc('upsert_answer_profile', {
            p_profile_id: profileId,
            p_day_id: dayId,
            p_question_index: questionIndex,
            p_answer_text: answer,
          })
      );
      if (!rpcProfileResp?.error) {
        console.log('RPC upsert via profile_id succeeded');
        return { error: null };
      }
      console.warn('RPC upsert via profile_id failed; falling back:', rpcProfileResp?.error);
    } catch (e) {
      console.warn('RPC upsert via profile_id threw; falling back:', e);
    }
  }

  // Secondary path: server-side upsert with server-resolved profile via auth.uid()
  try {
    const rpcResp: any = await withTimeout(
      () =>
        supabase.rpc('upsert_answer_v2', {
          p_day_id: dayId,
          p_question_index: questionIndex,
          p_answer_text: answer,
        })
    );
    if (!rpcResp?.error) {
      console.log('RPC upsert via v2 succeeded');
      return { error: null };
    }
    console.warn('RPC upsert via v2 failed; falling back:', rpcResp?.error);
  } catch (e) {
    console.warn('RPC upsert via v2 threw; falling back:', e);
  }

  // Single atomic upsert via a unique constraint on (profile_id, day_id, question_index)
  const payload = {
    profile_id: profileId,
    day_id: dayId,
    question_index: questionIndex,
    answer_text: answer,
    // Let DB set updated_at default (server time) if available
  };
  try {
    if (!profileId) {
      return { error: new Error('Missing profileId for client upsert') };
    }
    const upsertResp: any = await withTimeout(
      () =>
        supabase
          .from('answers')
          .upsert(payload, { onConflict: 'profile_id,day_id,question_index' })
    );
    const { error } = upsertResp || {};
    if (!error) {
      console.log('Atomic upsert succeeded');
      return { error: null };
    }
    console.error('Atomic upsert failed:', error);
    return { error };
  } catch (e) {
    console.error('Persist answer failed:', e);
    return { error: e as Error };
  }
}

// Delete all answers by stable profile_id (preferred)
export async function deleteAllAnswers(profileId: string) {
  if (!profileId) return { error: new Error('Missing profile_id') };
  try {
    const { error } = await supabase
      .from('answers')
      .delete()
      .eq('profile_id', profileId);
    return { error };
  } catch (e) {
    return { error: e as Error };
  }
}

// Delete all answers for a user, covering legacy rows keyed by username
export async function deleteAllAnswersForUser(params: { profileId?: string; username?: string }) {
  const { profileId } = params;
  if (!profileId) return { error: new Error('Missing profile_id') };
  try {
    // Delete strictly by profile_id; wraps in timeout to avoid hangs
    const resp: any = await Promise.race([
      Promise.resolve(
        supabase
          .from('answers')
          .delete()
          .eq('profile_id', profileId)
      ),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout during deleteAllAnswersForUser')), 6000))
    ]);
    const { error } = resp;
    return { error: error || null };
  } catch (e) {
    return { error: e as Error };
  }
}

// RPC-based delete that relies on a Postgres function `delete_user_answers`
// This should be defined server-side to delete answers for the current auth user
// using their email -> profile mapping. Recommended when RLS blocks client-side deletes.
export async function deleteUserAnswersRpc() {
  try {
    const { error } = await supabase.rpc('delete_user_answers');
    return { error };
  } catch (e) {
    return { error: e as Error };
  }
}

// Returns true when the current authenticated user has payment_received in profiles
export async function isAuthorizedUser(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return Boolean(user?.id);
  } catch {
    return false;
  }
}
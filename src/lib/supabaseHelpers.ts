import { supabase } from './supabaseClient';

type Language = 'en' | 'de' | 'pl';

export type AnswerRow = {
  day_id: string;
  question_index: number;
  answer_text: string | null;
  updated_at?: string | null;
};

export async function fetchAnswersForUser(params: { profileId?: string; username?: string }) {
  const { profileId, username } = params;
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

    // Legacy username path
    if (username) {
      const { data, error } = await supabase
        .from('answers')
        .select('day_id, question_index, answer_text, updated_at')
        .eq('username', username)
        .order('day_id', { ascending: true })
        .order('question_index', { ascending: true });
      if (!error && data && data.length > 0) return { data: data as AnswerRow[], error: null };
      if (error) {
        // Fall through to RPC
      }
    }

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
      .select('id')
      .eq('email', email)
      .single();
    if (fetchError || !profile?.id) {
      console.error('Profile not found for update:', fetchError?.message || 'No profile');
      return { error: fetchError || new Error('Profile not found') };
    }
    const updates: Record<string, any> = {};
    if (username) updates.username = username;
    if (language) updates.language = language;
    if (Object.keys(updates).length === 0) return { error: null };
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id);
    return { error };
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
  const { profileId, username, dayId, questionIndex, answer } = params;
  if (!dayId) return { error: new Error('Missing dayId') };
  try {
    // Use client-side upsert/update paths directly. RPC may not exist in some deployments.
    if (profileId) {
        // 1) Try by (profile_id, day_id, question_index)
        console.log('Checking for existing by profile_id');
        const byProfile = await supabase
          .from('answers')
          .select('id')
          .eq('profile_id', profileId)
          .eq('day_id', dayId)
          .eq('question_index', questionIndex)
          .limit(1)
          .maybeSingle();

        if (byProfile.data?.id) {
          console.log('Found existing by profile_id, updating');
          const { error } = await supabase
            .from('answers')
            .update({
              username: typeof username === 'string' ? username : undefined,
              answer_text: answer,
              updated_at: new Date().toISOString(),
            })
            .eq('id', byProfile.data.id);
          if (!error) console.log('Client-side update succeeded');
          else console.error('Client-side update failed:', error);
          return { error };
        }

        // 2) Not found by profile_id, try legacy (username, day_id, question_index)
        console.log('Checking for existing by username');
        const byUsername = username
          ? await supabase
              .from('answers')
              .select('id')
              .eq('username', username)
              .eq('day_id', dayId)
              .eq('question_index', questionIndex)
              .limit(1)
              .maybeSingle()
          : { data: null, error: null };

        if (byUsername.data?.id) {
          console.log('Found existing by username, updating');
          const { error } = await supabase
            .from('answers')
            .update({
              profile_id: profileId,
              answer_text: answer,
              updated_at: new Date().toISOString(),
            })
            .eq('id', byUsername.data.id);
          if (!error) console.log('Client-side update succeeded');
          else console.error('Client-side update failed:', error);
          return { error };
        }

        // 3) Insert a fresh row
        console.log('No existing row found, inserting new');
        const { error } = await supabase
          .from('answers')
          .insert({
            username: username ?? '',
            profile_id: profileId,
            day_id: dayId,
            question_index: questionIndex,
            answer_text: answer,
            updated_at: new Date().toISOString(),
          });
        if (!error) console.log('Client-side insert succeeded');
        else console.error('Client-side insert failed:', error);
        return { error };
      } else if (username) {
        // Keep legacy path by username
        console.log('Using legacy username path');
        const existing = await supabase
          .from('answers')
          .select('id')
          .eq('username', username)
          .eq('day_id', dayId)
          .eq('question_index', questionIndex)
          .limit(1)
          .maybeSingle();

        if (existing.data?.id) {
          console.log('Found existing by username (legacy), updating');
          const { error } = await supabase
            .from('answers')
            .update({
              answer_text: answer,
              updated_at: new Date().toISOString(),
            })
            .eq('id', existing.data.id);
          if (!error) console.log('Client-side update succeeded (legacy)');
          else console.error('Client-side update failed (legacy):', error);
          return { error };
        } else {
          console.log('No existing row found (legacy), inserting new');
          const { error } = await supabase
            .from('answers')
            .insert({
              username,
              day_id: dayId,
              question_index: questionIndex,
              answer_text: answer,
              updated_at: new Date().toISOString(),
            });
          if (!error) console.log('Client-side insert succeeded (legacy)');
          else console.error('Client-side insert failed (legacy):', error);
          return { error };
        }
      } else {
        return { error: new Error('Missing identifiers (profileId or username)') };
      }
  } catch (e) {
    console.error('Persist answer failed:', e);
    return { error: e as any };
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
  const { profileId, username } = params;
  if (!profileId && !username) return { error: new Error('Missing identifiers (profileId or username)') };
  try {
    let lastError: Error | null = null;
    if (profileId) {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('profile_id', profileId);
      if (error) lastError = error as Error;
    }
    if (username) {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('username', username);
      if (error) lastError = error as Error;
    }
    return { error: lastError };
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
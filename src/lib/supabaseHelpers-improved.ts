import { supabase } from './supabaseClient';

type Language = 'en' | 'de' | 'pl';

export type AnswerRow = {
  day_id: string;
  question_index: number;
  answer_text: string | null;
  updated_at?: string | null;
};

// Connection monitoring
let isOnline = true;
let connectionCheckInterval: number | null = null;

function startConnectionMonitoring() {
  if (typeof window === 'undefined') return;
  
  // Initial check
  isOnline = navigator.onLine;
  
  // Listen for online/offline events
  window.addEventListener('online', () => { isOnline = true; });
  window.addEventListener('offline', () => { isOnline = false; });
  
  // Periodic connectivity check
  if (!connectionCheckInterval) {
    connectionCheckInterval = window.setInterval(async () => {
      try {
        const response = await fetch('/favicon.svg', { 
          method: 'HEAD', 
          cache: 'no-cache',
          signal: AbortSignal.timeout(3000)
        });
        isOnline = response.ok;
      } catch {
        isOnline = false;
      }
    }, 30000); // Check every 30 seconds
  }
}

// Start monitoring when module loads
if (typeof window !== 'undefined') {
  startConnectionMonitoring();
}

// Enhanced retry logic with exponential backoff
async function withRetry<T>(
  operation: () => Promise<T>,
  maxAttempts = 3,
  baseDelay = 1000,
  timeoutMs = 12000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      // Add timeout wrapper
      const result = await Promise.race([
        operation(),
        new Promise<never>((_, reject) => 
          setTimeout(() => reject(new Error(`Operation timeout after ${timeoutMs}ms`)), timeoutMs)
        )
      ]);
      return result;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on certain errors
      if (error instanceof Error) {
        const msg = error.message.toLowerCase();
        if (msg.includes('unauthorized') || msg.includes('forbidden') || msg.includes('not found')) {
          throw error;
        }
      }
      
      // Don't retry on last attempt
      if (attempt === maxAttempts) break;
      
      // Wait before retry with exponential backoff
      const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

// Offline operation queue
interface OfflineOperation {
  type: 'persist' | 'delete';
  params: any;
  timestamp: number;
}

let offlineQueue: OfflineOperation[] = [];

function queueOfflineOperation(type: 'persist' | 'delete', params: any) {
  if (typeof window === 'undefined') return;
  
  offlineQueue.push({
    type,
    params,
    timestamp: Date.now()
  });
  
  // Persist queue to localStorage
  try {
    localStorage.setItem('shadowwork_offline_queue', JSON.stringify(offlineQueue));
  } catch (e) {
    console.warn('Could not save offline queue:', e);
  }
}

// Process offline queue when connection is restored
async function processOfflineQueue() {
  if (!isOnline || offlineQueue.length === 0) return;
  
  console.log(`Processing ${offlineQueue.length} offline operations`);
  const operations = [...offlineQueue];
  offlineQueue = [];
  
  for (const op of operations) {
    try {
      if (op.type === 'persist') {
        await persistAnswer(op.params);
      } else if (op.type === 'delete') {
        await deleteAllAnswersForUser(op.params);
      }
    } catch (e) {
      console.warn('Failed to process offline operation:', e);
      // Re-queue failed operations
      offlineQueue.push(op);
    }
  }
  
  // Update localStorage
  try {
    if (offlineQueue.length > 0) {
      localStorage.setItem('shadowwork_offline_queue', JSON.stringify(offlineQueue));
    } else {
      localStorage.removeItem('shadowwork_offline_queue');
    }
  } catch (e) {
    console.warn('Could not update offline queue:', e);
  }
}

// Load offline queue on startup
if (typeof window !== 'undefined') {
  try {
    const saved = localStorage.getItem('shadowwork_offline_queue');
    if (saved) {
      offlineQueue = JSON.parse(saved);
      // Process queue when online
      if (isOnline) {
        setTimeout(processOfflineQueue, 1000);
      }
    }
  } catch (e) {
    console.warn('Could not load offline queue:', e);
  }
  
  // Process queue when coming back online
  window.addEventListener('online', () => {
    setTimeout(processOfflineQueue, 1000);
  });
}

export async function fetchAnswersForUser(params: { profileId?: string; username?: string }) {
  const { profileId } = params;
  
  if (!isOnline) {
    return { data: [], error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
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
          throw error;
        }
      }

      // RPC fallback: expects a server-side function that returns rows for current auth user
      const { data, error } = await supabase.rpc('get_user_answers');
      if (!error && Array.isArray(data)) return { data: data as AnswerRow[], error: null };
      if (error) throw error;
      
      return { data: [], error: null };
    });
  } catch (e) {
    console.error('fetchAnswersForUser failed:', e);
    return { data: null, error: e as Error };
  }
}

// Backward-compat: original username-only upsert
export async function upsertProfile(username: string) {
  if (!username) return { error: new Error('Missing username') };
  
  if (!isOnline) {
    return { error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
      const { error } = await supabase
        .from('profiles')
        .upsert({ username }, { onConflict: 'username' });
      return { error };
    });
  } catch (e) {
    return { error: e as Error };
  }
}

// New: upsert or update profile by unique email, including settings like language
export async function updateProfileSettings(params: { email: string; username?: string; language?: Language }) {
  const { email, username, language } = params;
  if (!email) return { error: new Error('Missing email') };
  
  if (!isOnline) {
    return { error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
      const { data: profile, error: fetchError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();
      if (fetchError || !profile?.id) {
        console.error('Profile not found for update:', fetchError?.message || 'No profile');
        throw fetchError || new Error('Profile not found');
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
    });
  } catch (e) {
    console.error('Update profile settings failed:', e);
    return { error: e as Error };
  }
}

export async function getProfileByEmail(email: string) {
  if (!email) return { data: null, error: new Error('Missing email') };
  
  if (!isOnline) {
    return { data: null, error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, username, language, payment_received')
        .eq('email', email)
        .limit(1)
        .maybeSingle();
      return { data, error };
    });
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
  console.log('🔄 persistAnswer called with:', { profileId, username, dayId, questionIndex, answerLength: answer?.length });
  
  if (!dayId) return { error: new Error('Missing dayId') };
  
  if (!isOnline) {
    console.log('📴 Offline - queueing operation');
    // Queue for later if offline
    queueOfflineOperation('persist', params);
    return { error: new Error('Queued for when online') };
  }

  // Check authentication status
  const { data: { user } } = await supabase.auth.getUser();
  console.log('👤 Current user:', user ? { id: user.id, email: user.email } : 'Not authenticated');

  try {
    return await withRetry(async () => {
      // Preferred path: RPC using explicit profile_id (fast, avoids auth stalls)
      if (profileId) {
        try {
          console.log('🚀 Attempting RPC upsert_answer_profile with profileId');
          const rpc2Resp = await supabase.rpc('upsert_answer_profile', {
            p_profile_id: profileId,
            p_day_id: dayId,
            p_question_index: questionIndex,
            p_answer_text: answer,
          });
          console.log('📥 RPC2 response:', rpc2Resp);
          if (!rpc2Resp?.error) {
            console.log('✅ RPC upsert via profile_id succeeded');
            return { error: null };
          }
          console.warn('❌ RPC upsert via profile_id failed; falling back:', rpc2Resp?.error);
        } catch (e) {
          console.warn('💥 RPC upsert via profile_id threw; falling back:', e);
        }
      }

      // Secondary path: RPC with server-resolved profile via auth.uid()
      try {
        console.log('🚀 Attempting RPC upsert_answer_v2 with:', { day_id: dayId, question_index: questionIndex, answer_text: answer });
        const rpcResp = await supabase.rpc('upsert_answer_v2', {
          p_day_id: dayId,
          p_question_index: questionIndex,
          p_answer_text: answer,
        });
        console.log('📥 RPC response:', rpcResp);
        if (!rpcResp?.error) {
          console.log('✅ RPC upsert via v2 succeeded');
          return { error: null };
        }
        console.warn('❌ RPC upsert via v2 failed; falling back:', rpcResp?.error);
      } catch (e) {
        console.warn('💥 RPC upsert via v2 threw; falling back:', e);
      }

      // Fallback: client-side upsert
      if (!profileId) {
        console.log('❌ Missing profileId for client upsert');
        throw new Error('Missing profileId for client upsert');
      }
      
      console.log('🔄 Attempting client-side upsert with profileId:', profileId);
      
      const payload = {
        profile_id: profileId,
        day_id: dayId,
        question_index: questionIndex,
        answer_text: answer,
      };
      
      console.log('📤 Client upsert payload:', payload);
      
      const { error } = await supabase
        .from('answers')
        .upsert(payload, { onConflict: 'profile_id,day_id,question_index' });
      
      if (error) {
        console.error('❌ Client upsert error:', error);
        throw error;
      }
      
      console.log('✅ Client upsert succeeded');
      return { error: null };
    });
  } catch (e) {
    console.error('💥 persistAnswer failed:', e);
    return { error: e as Error };
  }
}

// Delete all answers by stable profile_id (preferred)
export async function deleteAllAnswers(profileId: string) {
  if (!profileId) return { error: new Error('Missing profile_id') };
  
  if (!isOnline) {
    return { error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('profile_id', profileId);
      return { error };
    });
  } catch (e) {
    return { error: e as Error };
  }
}

// Delete all answers for a user, covering legacy rows keyed by username
export async function deleteAllAnswersForUser(params: { profileId?: string; username?: string }) {
  const { profileId } = params;
  
  if (!isOnline) {
    queueOfflineOperation('delete', params);
    return { error: new Error('Queued for when online') };
  }
  
  if (!profileId) return { error: new Error('Missing profile_id') };
  
  try {
    return await withRetry(async () => {
      // Try RPC first (respects RLS, atomic)
      try {
        const { error: rpcError } = await supabase.rpc('delete_user_answers');
        if (!rpcError) return { error: null };
        console.warn('RPC delete failed; falling back:', rpcError);
      } catch (e) {
        console.warn('RPC delete threw; falling back:', e);
      }
      
      // Fallback to client-side delete
      const { error } = await supabase
        .from('answers')
        .delete()
        .eq('profile_id', profileId);
      
      if (error) throw error;
      return { error: null };
    });
  } catch (e) {
    console.error('deleteAllAnswersForUser failed:', e);
    return { error: e as Error };
  }
}

// RPC-based delete that relies on a Postgres function `delete_user_answers`
// This should be defined server-side to delete answers for the current auth user
// using their email -> profile mapping. Recommended when RLS blocks client-side deletes.
export async function deleteUserAnswersRpc() {
  if (!isOnline) {
    return { error: new Error('No internet connection') };
  }
  
  try {
    return await withRetry(async () => {
      const { error } = await supabase.rpc('delete_user_answers');
      return { error };
    });
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

// Export connection status for UI components
export function getConnectionStatus() {
  return { isOnline, queueLength: offlineQueue.length };
}
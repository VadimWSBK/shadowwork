import { supabase } from './supabaseClient';
import { PUBLIC_SUPABASE_ANON_KEY } from '$env/static/public';
import { encryptText, tryDecrypt, setPassphrase as setCryptoPassphrase, clearPassphrase as clearCryptoPassphrase, getPassphrase } from './crypto';

export type AnswerRow = {
  day_id: string;
  question_index: number;
  answer_text: string | null;
  updated_at?: string | null;
};

/**
 * Simple, reliable answer storage using RPC-only operations.
 * Server functions resolve the profile via auth.uid() and perform atomic writes.
 */
export class SimpleAnswerStorage {
  constructor() {}

  /**
   * Save a single answer via Edge Function only (no RPC/table fallbacks)
   */
  async saveAnswer(dayId: string, questionIndex: number, answer: string): Promise<{ success: boolean; error?: any }> {
    const profileId = this.getProfileId();
    
    // Enhanced logging for debugging
    console.log('💾 SaveAnswer called:', { 
      dayId, 
      questionIndex, 
      answerLength: answer.length,
      profileId: profileId || 'missing',
      hasPassphrase: !!getPassphrase()
    });
    
    // Verify user authentication securely
    const { data: { user } } = await supabase.auth.getUser();
    const hasValidSession = !!user;
    console.log('🔐 Session status:', { 
      hasSession: hasValidSession,
      userId: user?.id,
      currentTime: new Date().toISOString()
    });
    
    // Get session for tokens after verifying user
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData?.session;
    
    // Always encrypt using automatic project key (derived in crypto.ts)
    let toStore = answer;
    try {
      console.log('🔐 Encrypting answer using env-derived project key');
      toStore = await encryptText(answer);
      console.log('✅ Answer encrypted successfully');
    } catch (e) {
      console.error('❌ Encryption failed:', e);
      return { success: false, error: 'Encryption failed' };
    }
    
    try {
      // Primary: Edge Function invocation (uses user's JWT and RLS on server)
      const accessToken = session?.access_token || '';
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      if (PUBLIC_SUPABASE_ANON_KEY) headers['apikey'] = PUBLIC_SUPABASE_ANON_KEY;
      
      console.log('📤 Invoking save-answer function:', { 
        hasAccessToken: !!accessToken, 
        profileId: profileId || 'none',
        dayId,
        questionIndex,
        headers: Object.keys(headers),
        tokenExpiry: session?.expires_at ? new Date(session.expires_at * 1000).toISOString() : 'none'
      });
      
      const requestBody = profileId ? { dayId, questionIndex, answer: toStore, profileId } : { dayId, questionIndex, answer: toStore };
      console.log('📦 Request body:', { ...requestBody, answer: '[ENCRYPTED]' });
      
      const { data: fnData, error: fnError } = await supabase.functions.invoke('save-answer', {
        body: requestBody,
        headers,
      });
      
      console.log('📥 Edge function response:', { 
        success: (fnData as any)?.success,
        mode: (fnData as any)?.mode,
        error: fnError?.message || 'none',
        fullError: fnError,
        fullData: fnData
      });
      
      if (!fnError && (fnData as any)?.success) {
        console.log('✅ Save successful');
        return { success: true };
      }
      
      const errMsg = fnError ? (fnError.message || 'Edge function error') : 'Unexpected edge function response';
      console.error('❌ Save failed:', errMsg);
      return { success: false, error: errMsg };
    } catch (e) {
      console.error('❌ Save operation failed with exception:', e);
      return { success: false, error: e };
    }
  }

  /**
   * Get all answers for current authenticated user via RPC (get_user_answers)
   */
  async getAnswers(): Promise<{ data: AnswerRow[] | null; error?: string }> {
    const profileId = this.getProfileId();
    try {
      // Primary: RPC returning answers for current auth user
      const { data, error } = await supabase.rpc('get_user_answers');
      if (!error && Array.isArray(data)) {
        const rows = (data as AnswerRow[]) || [];
        for (const r of rows) {
          if (typeof r.answer_text === 'string') {
            const dec = await tryDecrypt(r.answer_text);
            r.answer_text = dec !== null ? dec : r.answer_text;
          }
        }
        return { data: rows };
      }
      console.warn('RPC get_user_answers failed or returned invalid data; considering fallback:', error?.message);

      // Fallback: query by profile_id if available
      if (profileId) {
        const { data: rows, error: selectError } = await supabase
          .from('answers')
          .select('day_id, question_index, answer_text, updated_at')
          .eq('profile_id', profileId)
          .order('day_id', { ascending: true })
          .order('question_index', { ascending: true });
        if (!selectError) {
          const rows2 = (rows as AnswerRow[]) || [];
          for (const r of rows2) {
            if (typeof r.answer_text === 'string') {
              const dec = await tryDecrypt(r.answer_text);
              r.answer_text = dec !== null ? dec : r.answer_text;
            }
          }
          return { data: rows2 };
        }
        console.error('Client select failed:', selectError);
        return { data: null, error: selectError.message };
      }

      return { data: [], error: 'No data and no profileId for fallback' };
    } catch (error: any) {
      console.error('Fetch answers threw exception:', error);
      return { data: null, error: error?.message || 'Network error' };
    }
  }

  /**
   * Delete all answers for current authenticated user via RPC (delete_user_answers)
   */
  async deleteAllAnswers(): Promise<{ success: boolean; error?: string }> {
    const profileId = this.getProfileId();
    try {
      // Verify user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      // Primary: Edge Function delete to support both JWT and anonymous modes
      const { data: sessionRes } = await supabase.auth.getSession();
      const accessToken = sessionRes?.session?.access_token || '';
      const headers: Record<string, string> = {};
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;
      if (PUBLIC_SUPABASE_ANON_KEY) headers['apikey'] = PUBLIC_SUPABASE_ANON_KEY;

      // Try edge function first when we have either a user token or a profileId
      if (accessToken || profileId) {
        const { data: fnData, error: fnError } = await supabase.functions.invoke('delete-answers', {
          body: profileId ? { profileId } : {},
          headers,
        });
        if (!fnError && (fnData as any)?.success) {
          return { success: true };
        }
        const errMsg = fnError ? (fnError.message || 'Edge function error') : 'Unexpected edge function response';
        console.warn('Edge function delete-answers failed:', errMsg, fnError || fnData);
      }

      // Fallback: RPC delete for current auth user
      const { error: rpcDeleteError } = await supabase.rpc('delete_user_answers');
      if (!rpcDeleteError) {
        return { success: true };
      }
      console.warn('RPC delete_user_answers failed; considering fallback:', rpcDeleteError?.message);

      // Fallback: client-side delete by profile_id
      if (profileId) {
        const { error: deleteError } = await supabase
          .from('answers')
          .delete()
          .eq('profile_id', profileId);
        if (!deleteError) {
          return { success: true };
        }
        console.error('Client delete failed:', deleteError);
        return { success: false, error: deleteError.message };
      }

      return { success: false, error: 'Unable to delete: missing profileId and all fallbacks failed' };
    } catch (error: any) {
      console.error('Delete threw exception:', error);
      return { success: false, error: error?.message || 'Network error' };
    }
  }

  private getProfileId(): string | null {
    try {
      if (typeof window === 'undefined') return null;
      const pid = localStorage.getItem('shadowwork_profile_id');
      
      // Enhanced logging for debugging
      if (!pid) {
        console.warn('⚠️ profileId not found in localStorage');
        // Try to get it from a potential backup location or wait briefly
        const backupPid = localStorage.getItem('shadowwork_profile_id');
        if (backupPid) {
          console.log('🔄 Found profileId on retry:', backupPid);
          return backupPid;
        }
      } else {
        console.log('✅ profileId retrieved from localStorage:', pid);
      }
      
      return pid || null;
    } catch (e) {
      console.error('❌ Error retrieving profileId from localStorage:', e);
      return null;
    }
  }

  // Passphrase helpers
  setPassphrase(passphrase: string, persistInSession = true) {
    setCryptoPassphrase(passphrase, persistInSession);
  }
  clearPassphrase() {
    clearCryptoPassphrase();
  }
}

// Export a singleton instance
export const answerStorage = new SimpleAnswerStorage();

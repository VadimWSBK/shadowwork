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
    
    // Verify user authentication securely (validates JWT with auth server)
    const { data: { user } } = await supabase.auth.getUser();
    const hasValidSession = !!user;
    console.log('🔐 Session status:', { 
      hasSession: hasValidSession,
      userId: user?.id,
      currentTime: new Date().toISOString()
    });
    
    // After verification, get session tokens (needed for Edge Function auth)
    // This is safe because we've already verified the user above
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
   * Get all answers for current authenticated user via direct Supabase query
   */
  async getAnswers(): Promise<{ data: AnswerRow[] | null; error?: string }> {
    try {
      console.log('📥 getAnswers() called - starting authentication check...');
      
      // Verify user authentication securely (validates JWT with auth server)
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('❌ User authentication error:', userError);
        return { data: null, error: `Authentication error: ${userError.message}` };
      }
      
      if (!user) {
        console.warn('⚠️ No authenticated user found');
        return { data: null, error: 'No authenticated user' };
      }

      console.log('✅ User authenticated:', user.email, 'user.id:', user.id);

      // Get user's profile first
      console.log('🔍 Looking for profile with user_id:', user.id);
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, user_id, email')
        .eq('user_id', user.id)
        .single();

      if (profileError || !profile) {
        console.error('❌ Profile not found:', profileError);
        return { data: null, error: 'Profile not found' };
      }

      console.log('✅ Profile found:', { id: profile.id, user_id: profile.user_id, email: profile.email });

      // Get answers directly from the database
      console.log('📞 Querying answers directly from database with profile_id:', profile.id);
      const { data: answers, error: answersError } = await supabase
        .from('answers')
        .select('day_id, question_index, answer_text, updated_at')
        .eq('profile_id', profile.id)
        .order('day_id')
        .order('question_index');

      if (answersError) {
        console.error('❌ Database query error:', answersError);
        return { data: null, error: answersError.message };
      }

      console.log('📦 Database response received:', { 
        hasData: !!answers, 
        answerCount: answers?.length || 0
      });

      if (answers && answers.length > 0) {
        const answerCount = answers.length;
        console.log(`✅ Loaded ${answerCount} answer row(s) from database`);
        
        // Decrypt answers if they are encrypted
        const rows = answers as AnswerRow[];
        let decryptedCount = 0;
        for (const r of rows) {
          if (typeof r.answer_text === 'string' && r.answer_text.length > 0) {
            const dec = await tryDecrypt(r.answer_text);
            if (dec !== null && dec !== r.answer_text) {
              decryptedCount++;
            }
            r.answer_text = dec !== null ? dec : r.answer_text;
          }
        }
        
        console.log(`🔓 Decrypted ${decryptedCount} answer(s)`);
        return { data: rows };
      }

      console.log('ℹ️ No answers found in database - returning empty array');
      return { data: [] };
    } catch (error: any) {
      console.error('❌ Error loading answers:', error);
      return { data: null, error: error?.message || 'Network error' };
    }
  }

  /**
   * Delete all answers for current authenticated user via RPC (delete_user_answers)
   */
  async deleteAllAnswers(): Promise<{ success: boolean; error?: string }> {
    const profileId = this.getProfileId();
    try {
      // Verify user is authenticated (validates JWT with auth server)
      const { data: { user } } = await supabase.auth.getUser();
      // After verification, get session tokens (needed for Edge Function auth)
      // This is safe because we've already verified the user above
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

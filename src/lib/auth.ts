import { supabase } from './supabaseClient';

export type AuthUserInfo = { id: string; email: string | null };

// Client-side helper that returns authenticated user info by contacting Supabase Auth
export async function getAuthenticatedUser(): Promise<AuthUserInfo | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;
    return { id: user.id, email: user.email ?? null };
  } catch {
    return null;
  }
}
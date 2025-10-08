import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// Clears Supabase auth cookies on the server
export const POST: RequestHandler = async ({ locals }) => {
  try {
    const { error } = await locals.supabase.auth.signOut();
    if (error) return json({ error: error.message }, { status: 400 });
    return json({ ok: true });
  } catch (e: any) {
    return json({ error: e?.message || 'Logout failed' }, { status: 400 });
  }
};
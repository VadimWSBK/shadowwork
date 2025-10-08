import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

// Sets Supabase auth cookies on the server using tokens from the client session
export const POST: RequestHandler = async ({ request, locals }) => {
  try {
    const { access_token, refresh_token } = await request.json();
    if (!access_token || !refresh_token) {
      return json({ error: 'Missing tokens' }, { status: 400 });
    }

    // Use the server Supabase client wired to cookies to persist the session
    const { error } = await locals.supabase.auth.setSession({
      access_token,
      refresh_token
    });
    if (error) return json({ error: error.message }, { status: 400 });

    // Get authenticated user data securely
    const { data: { user } } = await locals.supabase.auth.getUser();
    return json({ ok: true, user: user ? { id: user.id, email: user.email } : null });
  } catch (e: any) {
    return json({ error: e?.message || 'Bad request' }, { status: 400 });
  }
};
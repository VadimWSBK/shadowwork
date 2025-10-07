import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
  // Prefer authenticated user info from Supabase Auth
  const { data: { user } } = await locals.supabase.auth.getUser();
  const session = await locals.getSession();
  // Return both for compatibility; client should rely on user when needed
  return { session, authorized: Boolean(user) };
};
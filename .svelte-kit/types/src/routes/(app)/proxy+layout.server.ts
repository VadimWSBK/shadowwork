// @ts-nocheck
import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: Parameters<LayoutServerLoad>[0]) => {
  // Verify authentication by contacting Supabase Auth (more secure than trusting cookies)
  const { data: { user } } = await locals.supabase.auth.getUser();
  if (!user) throw redirect(303, '/login');

  // Still return the session for compatibility if needed elsewhere
  const session = await locals.getSession();
  return { session, authorized: true };
};
// @ts-nocheck
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  // Verify auth with Supabase server for stronger guarantees
  const { data: { user } } = await locals.supabase.auth.getUser();
  if (!user) return {};
  // Any authenticated user should proceed to dashboard
  throw redirect(303, '/dashboard');
};
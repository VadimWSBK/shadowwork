import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
  // If Supabase redirects back with invite verification query params, send to /signup server-side.
  const hasInviteQuery = url.searchParams.has('token_hash') || url.searchParams.has('code') || (url.searchParams.get('type') === 'invite');
  if (hasInviteQuery) {
    const q = url.searchParams.toString();
    throw redirect(303, `/signup${q ? `?${q}` : ''}`);
  }
  // Otherwise allow client page to inspect the URL hash (server cannot read hash) and route accordingly.
  return {};
};
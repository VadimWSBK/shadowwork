import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
  // Handle auth flows - redirect to appropriate pages
  const searchParams = url.searchParams;
  const type = searchParams.get('type');
  
  // Invite links -> signup page
  if (type === 'invite' || searchParams.has('token_hash') || searchParams.has('code')) {
    const query = searchParams.toString();
    throw redirect(303, `/signup${query ? `?${query}` : ''}`);
  }
  
  // Magic link login -> login page
  if (type === 'magiclink') {
    const query = searchParams.toString();
    throw redirect(303, `/login${query ? `?${query}` : ''}`);
  }
  
  // Password reset -> reset page
  if (type === 'recovery') {
    const query = searchParams.toString();
    throw redirect(303, `/reset${query ? `?${query}` : ''}`);
  }
  
  // Default: show the purchase landing page
  return {};
};
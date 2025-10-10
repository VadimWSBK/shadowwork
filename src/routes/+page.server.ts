import { redirect } from '@sveltejs/kit';

export const load = async ({ url }) => {
  // Handle auth flows - redirect to appropriate pages
  const searchParams = url.searchParams;
  const type = searchParams.get('type');
  
  // Invite links -> signup page
  if (type === 'invite' || searchParams.has('token_hash') || searchParams.has('code')) {
    const query = searchParams.toString();
    const url = query ? `/signup?${query}` : '/signup';
    throw redirect(303, url);
  }
  
  // Magic link login -> login page
  if (type === 'magiclink') {
    const query = searchParams.toString();
    const url = query ? `/login?${query}` : '/login';
    throw redirect(303, url);
  }
  
  // Password reset -> reset page
  if (type === 'recovery') {
    const query = searchParams.toString();
    const url = query ? `/reset?${query}` : '/reset';
    throw redirect(303, url);
  }
  
  // Default: show the coaching tools main page
  return {};
};

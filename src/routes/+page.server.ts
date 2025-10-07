import { redirect } from '@sveltejs/kit';

export const load = async () => {
  // Redirect root to login to avoid 404 on GET /
  throw redirect(303, '/login');
};
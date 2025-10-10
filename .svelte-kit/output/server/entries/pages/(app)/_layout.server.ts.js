import { redirect } from "@sveltejs/kit";
const load = async ({ locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  if (!user) throw redirect(303, "/login");
  const session = await locals.getSession();
  return { session, authorized: true };
};
export {
  load
};

import { redirect } from "@sveltejs/kit";
const load = async ({ locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  if (!user) return {};
  throw redirect(303, "/dashboard");
};
export {
  load
};

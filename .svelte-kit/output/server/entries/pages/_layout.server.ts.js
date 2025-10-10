const load = async ({ locals }) => {
  const { data: { user } } = await locals.supabase.auth.getUser();
  const session = await locals.getSession();
  return { session, authorized: Boolean(user) };
};
export {
  load
};

import { json } from "@sveltejs/kit";
const POST = async ({ locals }) => {
  try {
    const { error } = await locals.supabase.auth.signOut();
    if (error) return json({ error: error.message }, { status: 400 });
    return json({ ok: true });
  } catch (e) {
    return json({ error: e?.message || "Logout failed" }, { status: 400 });
  }
};
export {
  POST
};

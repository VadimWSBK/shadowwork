import { json } from "@sveltejs/kit";
const POST = async ({ request, locals }) => {
  try {
    const { access_token, refresh_token } = await request.json();
    if (!access_token || !refresh_token) {
      return json({ error: "Missing tokens" }, { status: 400 });
    }
    const { error } = await locals.supabase.auth.setSession({
      access_token,
      refresh_token
    });
    if (error) return json({ error: error.message }, { status: 400 });
    const { data: { user } } = await locals.supabase.auth.getUser();
    return json({ ok: true, user: user ? { id: user.id, email: user.email } : null });
  } catch (e) {
    return json({ error: e?.message || "Bad request" }, { status: 400 });
  }
};
export {
  POST
};

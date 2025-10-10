import { redirect } from "@sveltejs/kit";
const load = async ({ url }) => {
  const searchParams = url.searchParams;
  const type = searchParams.get("type");
  if (type === "invite" || searchParams.has("token_hash") || searchParams.has("code")) {
    const query = searchParams.toString();
    const url2 = query ? `/signup?${query}` : "/signup";
    throw redirect(303, url2);
  }
  if (type === "magiclink") {
    const query = searchParams.toString();
    const url2 = query ? `/login?${query}` : "/login";
    throw redirect(303, url2);
  }
  if (type === "recovery") {
    const query = searchParams.toString();
    const url2 = query ? `/reset?${query}` : "/reset";
    throw redirect(303, url2);
  }
  return {};
};
export {
  load
};

import { redirect } from "@sveltejs/kit";
const load = async ({ url }) => {
  const searchParams = url.searchParams;
  const type = searchParams.get("type");
  if (type === "invite" || searchParams.has("token_hash") || searchParams.has("code")) {
    const query = searchParams.toString();
    throw redirect(303, `/signup${query ? `?${query}` : ""}`);
  }
  if (type === "magiclink") {
    const query = searchParams.toString();
    throw redirect(303, `/login${query ? `?${query}` : ""}`);
  }
  if (type === "recovery") {
    const query = searchParams.toString();
    throw redirect(303, `/reset${query ? `?${query}` : ""}`);
  }
  return {};
};
export {
  load
};

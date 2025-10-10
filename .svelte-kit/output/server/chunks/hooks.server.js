import { createServerClient } from "@supabase/ssr";
import { p as public_env, c as private_env } from "./internal.js";
const handle = async ({ event, resolve }) => {
  const url = public_env.PUBLIC_SUPABASE_URL || private_env.SUPABASE_URL || "https://gaafkvyzvchroojmvjdu.supabase.co";
  const key = public_env.PUBLIC_SUPABASE_ANON_KEY || private_env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdhYWZrdnl6dmNocm9vam12amR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkyNjM3NzcsImV4cCI6MjA3NDgzOTc3N30.ng-cTBCVxV1UtkmpRZjdX66-PZtiHOAdxyie0cfcmxg";
  event.locals.supabase = createServerClient(url, key, {
    cookies: {
      get: (name) => event.cookies.get(name),
      set: (name, value, options) => event.cookies.set(name, value, {
        ...options,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
      }),
      remove: (name, options) => event.cookies.delete(name, {
        ...options,
        path: "/"
      })
    }
  });
  event.locals.getSession = async () => {
    const { data: { user }, error } = await event.locals.supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  };
  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      return name === "content-range" || name === "x-supabase-api-version";
    }
  });
};
export {
  handle
};

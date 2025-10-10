import type { Handle } from '@sveltejs/kit';
import { createServerClient } from '@supabase/ssr';
import { env as publicEnv } from '$env/dynamic/public';
import { env as privateEnv } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  const url = publicEnv.PUBLIC_SUPABASE_URL || privateEnv.SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL;
  const key = publicEnv.PUBLIC_SUPABASE_ANON_KEY || privateEnv.SUPABASE_ANON_KEY || (import.meta as any).env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    // Fallback: no Supabase env configured. Provide no-op session getter.
    event.locals.getSession = async () => null;
    return resolve(event);
  }

  event.locals.supabase = createServerClient(url, key, {
    cookies: {
      get: (name) => event.cookies.get(name),
      set: (name, value, options) =>
        event.cookies.set(name, value, {
          ...options,
          path: '/',
          sameSite: 'lax',
          secure: process.env.NODE_ENV === 'production'
        }),
      remove: (name, options) =>
        event.cookies.delete(name, {
          ...options,
          path: '/'
        })
    }
  });

  event.locals.getSession = async () => {
    // Verify the user is authenticated (secure check)
    // getUser() validates the JWT with the auth server
    const { data: { user }, error } = await event.locals.supabase.auth.getUser();
    if (error || !user) {
      return null;
    }
    // After verification, get session data (needed for server-side operations)
    // This is safe because we've already verified the user above
    const { data: { session } } = await event.locals.supabase.auth.getSession();
    return session;
  };

  return resolve(event, {
    filterSerializedResponseHeaders(name) {
      // Allow Set-Cookie headers to be sent in responses
      return name === 'content-range' || name === 'x-supabase-api-version';
    }
  });
};
import * as server from '../entries/pages/course/_slug_/_page.server.ts.js';

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/course/_slug_/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/course/[slug]/+page.server.ts";
export const imports = ["_app/immutable/nodes/6.Bb8qt7hI.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/VjwJ5DFS.js","_app/immutable/chunks/CBH2oh36.js","_app/immutable/chunks/4tzv8gyV.js","_app/immutable/chunks/TFLlWf41.js","_app/immutable/chunks/OyAhmQEq.js","_app/immutable/chunks/fbDB8B4R.js","_app/immutable/chunks/v6OzXV5o.js","_app/immutable/chunks/BPy5W3vs.js","_app/immutable/chunks/KHq5D6Xm.js","_app/immutable/chunks/B7L_XSWS.js","_app/immutable/chunks/8tgGsUWp.js"];
export const stylesheets = [];
export const fonts = [];

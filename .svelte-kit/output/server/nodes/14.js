import * as server from '../entries/pages/shadowwork/_page.server.ts.js';

export const index = 14;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/shadowwork/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/shadowwork/+page.server.ts";
export const imports = ["_app/immutable/nodes/14.BtLyL6K6.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/VjwJ5DFS.js","_app/immutable/chunks/CBH2oh36.js","_app/immutable/chunks/4tzv8gyV.js","_app/immutable/chunks/TFLlWf41.js","_app/immutable/chunks/OyAhmQEq.js","_app/immutable/chunks/fbDB8B4R.js","_app/immutable/chunks/v6OzXV5o.js","_app/immutable/chunks/DISU_b14.js","_app/immutable/chunks/B7L_XSWS.js","_app/immutable/chunks/8tgGsUWp.js","_app/immutable/chunks/BG9fG1Ip.js"];
export const stylesheets = ["_app/immutable/assets/14.LRSGYdOu.css"];
export const fonts = [];

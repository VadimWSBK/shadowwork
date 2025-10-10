import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.B1rO_ZCb.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/VjwJ5DFS.js","_app/immutable/chunks/CBH2oh36.js","_app/immutable/chunks/4tzv8gyV.js","_app/immutable/chunks/KHq5D6Xm.js","_app/immutable/chunks/B7L_XSWS.js","_app/immutable/chunks/DxmBqDFk.js","_app/immutable/chunks/PPVm8Dsz.js"];
export const stylesheets = ["_app/immutable/assets/0.B-GaYsGa.css"];
export const fonts = [];

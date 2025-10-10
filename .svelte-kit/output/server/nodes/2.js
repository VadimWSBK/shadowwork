import * as server from '../entries/pages/(app)/_layout.server.ts.js';

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/(app)/+layout.server.ts";
export const imports = ["_app/immutable/nodes/2.BoyzSGfg.js","_app/immutable/chunks/DsnmJJEf.js","_app/immutable/chunks/CBH2oh36.js"];
export const stylesheets = [];
export const fonts = [];

import * as server from '../entries/pages/admin/usuarios/_page.server.ts.js';

export const index = 20;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/usuarios/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/usuarios/+page.server.ts";
export const imports = ["_app/immutable/nodes/20.N9CliBH2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B3baiw5N.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js"];
export const stylesheets = [];
export const fonts = [];

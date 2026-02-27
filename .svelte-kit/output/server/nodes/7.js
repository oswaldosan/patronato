import * as server from '../entries/pages/admin/aportes/nuevo/_page.server.ts.js';

export const index = 7;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/aportes/nuevo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/aportes/nuevo/+page.server.ts";
export const imports = ["_app/immutable/nodes/7.BH14eh6z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js"];
export const stylesheets = [];
export const fonts = [];

import * as server from '../entries/pages/admin/egresos/nuevo/_page.server.ts.js';

export const index = 15;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/egresos/nuevo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/egresos/nuevo/+page.server.ts";
export const imports = ["_app/immutable/nodes/15.CafG25Qg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/DwYBmEoc.js"];
export const stylesheets = [];
export const fonts = [];

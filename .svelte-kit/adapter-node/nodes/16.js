import * as server from '../entries/pages/admin/login/_page.server.ts.js';

export const index = 16;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/login/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/login/+page.server.ts";
export const imports = ["_app/immutable/nodes/16.B60jDIMP.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js"];
export const stylesheets = [];
export const fonts = [];

import * as server from '../entries/pages/admin/donantes/nuevo/_page.server.ts.js';

export const index = 12;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/donantes/nuevo/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/donantes/nuevo/+page.server.ts";
export const imports = ["_app/immutable/nodes/12.BngViccA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/XiZwx-Ce.js"];
export const stylesheets = [];
export const fonts = [];

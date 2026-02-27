import * as server from '../entries/pages/admin/aportes/_page.server.ts.js';

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/admin/aportes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/admin/aportes/+page.server.ts";
export const imports = ["_app/immutable/nodes/5.CS_rC7Fl.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
export const stylesheets = [];
export const fonts = [];

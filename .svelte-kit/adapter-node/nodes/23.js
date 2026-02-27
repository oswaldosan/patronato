import * as server from '../entries/pages/egresos/_page.server.ts.js';

export const index = 23;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/egresos/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/egresos/+page.server.ts";
export const imports = ["_app/immutable/nodes/23.D6rxVvQk.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js"];
export const stylesheets = [];
export const fonts = [];

import * as server from '../entries/pages/reportes/_page.server.ts.js';

export const index = 26;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/reportes/_page.svelte.js')).default;
export { server };
export const server_id = "src/routes/reportes/+page.server.ts";
export const imports = ["_app/immutable/nodes/26.CuPZsCme.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/qp4zB8mr.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/DJc31okB.js"];
export const stylesheets = [];
export const fonts = [];

import { g as getReportData } from './reports-MXHz2gQu.js';
import './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const desde = url.searchParams.get("desde");
  const hasta = url.searchParams.get("hasta");
  const reportes = await getReportData({ desde, hasta });
  return reportes;
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 26;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CwTy6lVS.js')).default;
const server_id = "src/routes/reportes/+page.server.ts";
const imports = ["_app/immutable/nodes/26.CuPZsCme.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/qp4zB8mr.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=26-Dc9h1I_X.js.map

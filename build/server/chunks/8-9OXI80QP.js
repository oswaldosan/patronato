import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const entity = url.searchParams.get("entity") || "";
  const action = url.searchParams.get("action") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 50;
  const where = {};
  if (entity) {
    where.entity = entity;
  }
  if (action) {
    where.action = action;
  }
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.auditLog.count({ where })
  ]);
  const entities = await prisma.auditLog.groupBy({
    by: ["entity"]
  });
  return {
    logs: logs.map((l) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      entityId: l.entityId,
      user: l.user?.name || "Sistema",
      userEmail: l.user?.email,
      oldData: l.oldData,
      newData: l.newData,
      ip: l.ip,
      createdAt: l.createdAt.toISOString()
    })),
    entities: entities.map((e) => e.entity),
    filtros: { entity, action },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-rsOb4pCr.js')).default;
const server_id = "src/routes/admin/auditoria/+page.server.ts";
const imports = ["_app/immutable/nodes/8.Dmowshho.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-9OXI80QP.js.map

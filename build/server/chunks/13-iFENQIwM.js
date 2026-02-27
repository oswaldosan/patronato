import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const search = url.searchParams.get("q") || "";
  const estado = url.searchParams.get("estado") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const where = {};
  if (search) {
    where.OR = [
      { concepto: { contains: search, mode: "insensitive" } },
      { proveedor: { nombre: { contains: search, mode: "insensitive" } } }
    ];
  }
  if (estado) {
    where.estado = estado;
  }
  const [egresos, total] = await Promise.all([
    prisma.egreso.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        rubro: { select: { nombre: true, color: true } },
        proveedor: { select: { nombre: true } }
      }
    }),
    prisma.egreso.count({ where })
  ]);
  return {
    egresos: egresos.map((e) => ({
      id: e.id,
      fecha: e.fecha.toISOString(),
      monto: e.monto.toNumber(),
      concepto: e.concepto,
      proveedor: e.proveedor?.nombre ?? null,
      rubro: e.rubro?.nombre ?? null,
      rubroColor: e.rubro?.color ?? null,
      estado: e.estado,
      createdAt: e.createdAt.toISOString()
    })),
    filtros: { search, estado },
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

const index = 13;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-C3uf35tj.js')).default;
const server_id = "src/routes/admin/egresos/+page.server.ts";
const imports = ["_app/immutable/nodes/13.BgDgb8wv.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=13-iFENQIwM.js.map

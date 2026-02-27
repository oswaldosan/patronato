import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const search = url.searchParams.get("q") || "";
  const estado = url.searchParams.get("estado") || "";
  const rubroId = url.searchParams.get("rubro") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const where = {};
  if (search) {
    where.donante = {
      OR: [
        { nombre: { contains: search, mode: "insensitive" } },
        { nombreNegocio: { contains: search, mode: "insensitive" } }
      ]
    };
  }
  if (estado) {
    where.estado = estado;
  }
  if (rubroId) {
    where.rubroId = rubroId;
  }
  const [aportes, total, rubros] = await Promise.all([
    prisma.aporte.findMany({
      where,
      include: {
        donante: { select: { nombre: true, nombreNegocio: true, tipo: true } },
        rubro: { select: { nombre: true, color: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.aporte.count({ where }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" }
    })
  ]);
  return {
    aportes: aportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      metodo: a.metodo,
      estado: a.estado,
      donante: a.donante.nombreNegocio || a.donante.nombre,
      donanteId: a.donanteId,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
      createdAt: a.createdAt.toISOString()
    })),
    rubros: rubros.map((r) => ({ id: r.id, nombre: r.nombre })),
    filtros: { search, estado, rubroId },
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

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BSFwvwkm.js')).default;
const server_id = "src/routes/admin/aportes/+page.server.ts";
const imports = ["_app/immutable/nodes/5.CS_rC7Fl.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-BWTOMwpB.js.map

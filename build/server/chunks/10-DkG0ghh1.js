import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const search = url.searchParams.get("q") || "";
  const tipo = url.searchParams.get("tipo") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const where = {};
  if (search) {
    where.OR = [
      { nombre: { contains: search, mode: "insensitive" } },
      { nombreNegocio: { contains: search, mode: "insensitive" } }
    ];
  }
  if (tipo) {
    where.tipo = tipo;
  }
  const [donantes, total] = await Promise.all([
    prisma.donante.findMany({
      where,
      include: {
        _count: {
          select: { aportes: true }
        },
        aportes: {
          where: { estado: "VERIFICADO" },
          select: { monto: true }
        }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.donante.count({ where })
  ]);
  return {
    donantes: donantes.map((d) => ({
      id: d.id,
      nombre: d.nombre,
      nombreNegocio: d.nombreNegocio,
      tipo: d.tipo,
      telefono: d.telefono,
      email: d.email,
      activo: d.activo,
      totalAportes: d._count.aportes,
      totalDonado: d.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0),
      createdAt: d.createdAt.toISOString()
    })),
    filtros: { search, tipo },
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

const index = 10;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CyzHFQlA.js')).default;
const server_id = "src/routes/admin/donantes/+page.server.ts";
const imports = ["_app/immutable/nodes/10.UouBgmYE.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=10-DkG0ghh1.js.map

import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const query = url.searchParams.get("q") || "";
  if (!query || query.length < 2) {
    return {
      donantes: [],
      query,
      searched: false
    };
  }
  const donantes = await prisma.donante.findMany({
    where: {
      activo: true,
      OR: [
        { nombre: { contains: query, mode: "insensitive" } },
        { nombreNegocio: { contains: query, mode: "insensitive" } }
      ]
    },
    include: {
      aportes: {
        where: { estado: "VERIFICADO" },
        select: { monto: true }
      }
    },
    orderBy: { nombre: "asc" },
    take: 50
  });
  const donantesConTotal = donantes.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    nombreNegocio: d.nombreNegocio,
    tipo: d.tipo,
    totalDonado: d.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0),
    cantidadAportes: d.aportes.length
  }));
  donantesConTotal.sort((a, b) => b.totalDonado - a.totalDonado);
  return {
    donantes: donantesConTotal,
    query,
    searched: true
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 21;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DyqzGUnx.js')).default;
const server_id = "src/routes/buscar/+page.server.ts";
const imports = ["_app/immutable/nodes/21.CNx0uFEJ.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=21-BSA6wJ8h.js.map

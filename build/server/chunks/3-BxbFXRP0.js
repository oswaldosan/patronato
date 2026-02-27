import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async () => {
  const [totalIngresos, totalEgresos, totalDonantes, totalAportes] = await Promise.all([
    prisma.aporte.aggregate({
      _sum: { monto: true },
      where: { estado: "VERIFICADO" }
    }),
    prisma.egreso.aggregate({
      _sum: { monto: true },
      where: { estado: "VERIFICADO" }
    }),
    prisma.donante.count({ where: { activo: true } }),
    prisma.aporte.count({ where: { estado: "VERIFICADO" } })
  ]);
  const ingresosPorRubro = await prisma.aporte.groupBy({
    by: ["rubroId"],
    _sum: { monto: true },
    where: { estado: "VERIFICADO" }
  });
  const rubros = await prisma.rubro.findMany({
    where: { activo: true },
    orderBy: { orden: "asc" }
  });
  const rubroStats = rubros.map((rubro) => {
    const stats = ingresosPorRubro.find((r) => r.rubroId === rubro.id);
    return {
      id: rubro.id,
      nombre: rubro.nombre,
      color: rubro.color,
      total: stats?._sum?.monto?.toNumber() || 0
    };
  }).filter((r) => r.total > 0);
  const ultimosAportes = await prisma.aporte.findMany({
    where: { estado: "VERIFICADO" },
    include: {
      donante: { select: { nombre: true, nombreNegocio: true, tipo: true } },
      rubro: { select: { nombre: true, color: true } }
    },
    orderBy: { fecha: "desc" },
    take: 9
  });
  const topDonantes = await prisma.aporte.groupBy({
    by: ["donanteId"],
    _sum: { monto: true },
    _count: { id: true },
    where: { estado: "VERIFICADO" },
    orderBy: { _sum: { monto: "desc" } },
    take: 10
  });
  const donantesInfo = await prisma.donante.findMany({
    where: { id: { in: topDonantes.map((d) => d.donanteId) } },
    select: { id: true, nombre: true, nombreNegocio: true, tipo: true }
  });
  const topDonantesData = topDonantes.map((d) => {
    const info = donantesInfo.find((di) => di.id === d.donanteId);
    return {
      id: d.donanteId,
      nombre: info?.nombre || "Anónimo",
      nombreNegocio: info?.nombreNegocio,
      tipo: info?.tipo,
      total: d._sum.monto?.toNumber() || 0,
      aportes: d._count.id
    };
  });
  const fechaInicio = /* @__PURE__ */ new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 12);
  const donacionesPorMes = await prisma.$queryRaw`
    SELECT
      TO_CHAR(fecha, 'YYYY-MM') as mes,
      SUM(monto)::float as total
    FROM "Aporte"
    WHERE estado = 'VERIFICADO' AND fecha >= ${fechaInicio}
    GROUP BY TO_CHAR(fecha, 'YYYY-MM')
    ORDER BY mes ASC
  `;
  const metaConfig = await prisma.config.findFirst({
    where: { key: "META_PROYECTO" },
    orderBy: { createdAt: "desc" }
  });
  const metaProyecto = metaConfig ? parseFloat(metaConfig.value) : 5e6;
  return {
    stats: {
      totalIngresos: totalIngresos._sum.monto?.toNumber() || 0,
      totalEgresos: totalEgresos._sum.monto?.toNumber() || 0,
      balance: (totalIngresos._sum.monto?.toNumber() || 0) - (totalEgresos._sum.monto?.toNumber() || 0),
      totalDonantes,
      totalAportes,
      metaProyecto
    },
    rubroStats,
    ultimosAportes: ultimosAportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      donante: a.donante.nombreNegocio || a.donante.nombre,
      tipoDonante: a.donante.tipo,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color
    })),
    topDonantes: topDonantesData,
    donacionesPorMes
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Sa4HcMPN.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/3.CoeIpbEC.js","_app/immutable/chunks/D2gFui-Z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/C5uhlMZ_.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js","_app/immutable/chunks/D49RTWSx.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js"];
const stylesheets = ["_app/immutable/assets/ProgressBar.bXyYL7lj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-BxbFXRP0.js.map

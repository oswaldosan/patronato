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
    _count: { id: true },
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
      total: stats?._sum?.monto?.toNumber() || 0,
      cantidad: stats?._count?.id || 0
    };
  });
  const ingresosPorMetodo = await prisma.aporte.groupBy({
    by: ["metodo"],
    _sum: { monto: true },
    _count: { id: true },
    where: { estado: "VERIFICADO" }
  });
  const metodoStats = ingresosPorMetodo.map((m) => ({
    metodo: m.metodo,
    total: m._sum.monto?.toNumber() || 0,
    cantidad: m._count.id
  }));
  const aportesConDonante = await prisma.aporte.findMany({
    where: { estado: "VERIFICADO" },
    select: {
      monto: true,
      donante: { select: { tipo: true } }
    }
  });
  const porTipoDonante = aportesConDonante.reduce(
    (acc, a) => {
      const tipo = a.donante.tipo;
      if (!acc[tipo]) {
        acc[tipo] = { total: 0, cantidad: 0 };
      }
      acc[tipo].total += a.monto.toNumber();
      acc[tipo].cantidad++;
      return acc;
    },
    {}
  );
  const fechaInicio = /* @__PURE__ */ new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 12);
  const ingresosPorMes = await prisma.$queryRaw`
    SELECT 
      TO_CHAR(fecha, 'YYYY-MM') as mes,
      SUM(monto)::float as total,
      COUNT(*)::bigint as cantidad
    FROM "Aporte"
    WHERE estado = 'VERIFICADO' AND fecha >= ${fechaInicio}
    GROUP BY TO_CHAR(fecha, 'YYYY-MM')
    ORDER BY mes ASC
  `;
  const egresosPorMes = await prisma.$queryRaw`
    SELECT 
      TO_CHAR(fecha, 'YYYY-MM') as mes,
      SUM(monto)::float as total
    FROM "Egreso"
    WHERE estado = 'VERIFICADO' AND fecha >= ${fechaInicio}
    GROUP BY TO_CHAR(fecha, 'YYYY-MM')
    ORDER BY mes ASC
  `;
  const topDonantes = await prisma.aporte.groupBy({
    by: ["donanteId"],
    _sum: { monto: true },
    _count: { id: true },
    where: { estado: "VERIFICADO" },
    orderBy: { _sum: { monto: "desc" } },
    take: 10
  });
  const donantesInfo = await prisma.donante.findMany({
    where: { id: { in: topDonantes.map((d) => d.donanteId) } }
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
  const promedioAporte = totalAportes > 0 ? (totalIngresos._sum.monto?.toNumber() || 0) / totalAportes : 0;
  const metaConfig = await prisma.config.findFirst({
    where: { key: "META_PROYECTO" },
    orderBy: { createdAt: "desc" }
  });
  const metaProyecto = metaConfig ? parseFloat(metaConfig.value) : 5e5;
  return {
    totales: {
      ingresos: totalIngresos._sum.monto?.toNumber() || 0,
      egresos: totalEgresos._sum.monto?.toNumber() || 0,
      balance: (totalIngresos._sum.monto?.toNumber() || 0) - (totalEgresos._sum.monto?.toNumber() || 0),
      donantes: totalDonantes,
      aportes: totalAportes,
      promedioAporte,
      metaProyecto
    },
    rubroStats,
    metodoStats,
    porTipoDonante,
    ingresosPorMes: ingresosPorMes.map((m) => ({
      ...m,
      cantidad: Number(m.cantidad)
    })),
    egresosPorMes,
    topDonantes: topDonantesData
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 24;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B9bm1YIQ.js')).default;
const server_id = "src/routes/estadisticas/+page.server.ts";
const imports = ["_app/immutable/nodes/24.voERhVHH.js","_app/immutable/chunks/D2gFui-Z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/C5uhlMZ_.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js","_app/immutable/chunks/D49RTWSx.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js"];
const stylesheets = ["_app/immutable/assets/ProgressBar.bXyYL7lj.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=24-BH9utaVo.js.map

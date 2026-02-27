import { p as prisma } from "../../../chunks/db.js";
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
export {
  load
};

import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [totalIngresos, totalEgresos, totalDonantes, totalAportes] = await Promise.all([
    prisma.aporte.aggregate({
      _sum: { monto: true },
      where: { estado: 'VERIFICADO' },
    }),
    prisma.egreso.aggregate({
      _sum: { monto: true },
      where: { estado: 'VERIFICADO' },
    }),
    prisma.donante.count({ where: { activo: true } }),
    prisma.aporte.count({ where: { estado: 'VERIFICADO' } }),
  ]);

  const ingresosPorRubro = await prisma.aporte.groupBy({
    by: ['rubroId'],
    _sum: { monto: true },
    where: { estado: 'VERIFICADO' },
  });

  const rubros = await prisma.rubro.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
  });

  const rubroStats = rubros
    .map((rubro) => {
      const stats = ingresosPorRubro.find((r) => r.rubroId === rubro.id);
      return {
        id: rubro.id,
        nombre: rubro.nombre,
        color: rubro.color,
        total: stats?._sum?.monto?.toNumber() || 0,
      };
    })
    .filter((r) => r.total > 0);

  const ultimosAportes = await prisma.aporte.findMany({
    where: { estado: 'VERIFICADO' },
    include: {
      donante: { select: { nombre: true, nombreNegocio: true, tipo: true } },
      rubro: { select: { nombre: true, color: true } },
    },
    orderBy: { fecha: 'desc' },
    take: 9,
  });

  const topDonantes = await prisma.aporte.groupBy({
    by: ['donanteId'],
    _sum: { monto: true },
    _count: { id: true },
    where: { estado: 'VERIFICADO' },
    orderBy: { _sum: { monto: 'desc' } },
    take: 10,
  });

  const donantesInfo = await prisma.donante.findMany({
    where: { id: { in: topDonantes.map((d) => d.donanteId) } },
    select: { id: true, nombre: true, nombreNegocio: true, tipo: true },
  });

  const topDonantesData = topDonantes.map((d) => {
    const info = donantesInfo.find((di) => di.id === d.donanteId);
    return {
      id: d.donanteId,
      nombre: info?.nombre || 'Anónimo',
      nombreNegocio: info?.nombreNegocio,
      tipo: info?.tipo,
      total: d._sum.monto?.toNumber() || 0,
      aportes: d._count.id,
    };
  });

  const fechaInicio = new Date();
  fechaInicio.setMonth(fechaInicio.getMonth() - 12);

  const donacionesPorMes = await prisma.$queryRaw<Array<{ mes: string; total: number }>>`
    SELECT
      TO_CHAR(fecha, 'YYYY-MM') as mes,
      SUM(monto)::float as total
    FROM "Aporte"
    WHERE estado = 'VERIFICADO' AND fecha >= ${fechaInicio}
    GROUP BY TO_CHAR(fecha, 'YYYY-MM')
    ORDER BY mes ASC
  `;

  const metaConfig = await prisma.config.findFirst({
    where: { key: 'META_PROYECTO' },
    orderBy: { createdAt: 'desc' },
  });
  const metaProyecto = metaConfig ? parseFloat(metaConfig.value) : 5000000;

  return {
    stats: {
      totalIngresos: totalIngresos._sum.monto?.toNumber() || 0,
      totalEgresos: totalEgresos._sum.monto?.toNumber() || 0,
      balance: (totalIngresos._sum.monto?.toNumber() || 0) - (totalEgresos._sum.monto?.toNumber() || 0),
      totalDonantes,
      totalAportes,
      metaProyecto,
    },
    rubroStats,
    ultimosAportes: ultimosAportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      donante: a.donante.nombreNegocio || a.donante.nombre,
      tipoDonante: a.donante.tipo,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
    })),
    topDonantes: topDonantesData,
    donacionesPorMes,
  };
};

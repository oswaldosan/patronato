import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const [grouped, totalAgg] = await Promise.all([
    prisma.aporte.groupBy({
      by: ['donanteId'],
      _sum: { monto: true },
      _count: { id: true },
      where: { estado: 'VERIFICADO' },
      orderBy: { _sum: { monto: 'desc' } },
    }),
    prisma.aporte.aggregate({
      _sum: { monto: true },
      where: { estado: 'VERIFICADO' },
    }),
  ]);

  const donantes = await prisma.donante.findMany({
    where: { id: { in: grouped.map((g) => g.donanteId) } },
    select: { id: true, nombre: true, nombreNegocio: true, tipo: true },
  });

  const donanteMap = new Map(donantes.map((d) => [d.id, d]));

  const aportantes = grouped.map((g) => {
    const info = donanteMap.get(g.donanteId);
    return {
      id: g.donanteId,
      nombre: info?.nombre || 'Anónimo',
      nombreNegocio: info?.nombreNegocio || null,
      tipo: info?.tipo || 'PERSONA',
      total: g._sum.monto?.toNumber() || 0,
      aportes: g._count.id,
    };
  });

  return {
    aportantes,
    totalIngresos: totalAgg._sum.monto?.toNumber() || 0,
  };
};

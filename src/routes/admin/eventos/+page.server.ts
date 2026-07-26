import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('q') || '';
  const estado = url.searchParams.get('estado') || '';

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { nombre: { contains: search, mode: 'insensitive' } },
      { lugar: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (estado === 'publicado') {
    where.publicado = true;
  } else if (estado === 'borrador') {
    where.publicado = false;
  }

  const eventos = await prisma.evento.findMany({
    where,
    include: {
      ingresos: { select: { monto: true } },
      gastos: { select: { monto: true } },
    },
    orderBy: { fecha: 'desc' },
  });

  const mapped = eventos.map((e) => {
    const totalIngresos = e.ingresos.reduce((sum, i) => sum + i.monto.toNumber(), 0);
    const totalGastos = e.gastos.reduce((sum, g) => sum + g.monto.toNumber(), 0);
    return {
      id: e.id,
      nombre: e.nombre,
      fecha: e.fecha.toISOString(),
      lugar: e.lugar,
      publicado: e.publicado,
      activo: e.activo,
      totalIngresos,
      totalGastos,
      balance: totalIngresos - totalGastos,
    };
  });

  return {
    eventos: mapped,
    resumen: {
      totalEventos: mapped.length,
      totalRecaudado: mapped.reduce((sum, e) => sum + e.totalIngresos, 0),
      totalGastado: mapped.reduce((sum, e) => sum + e.totalGastos, 0),
      balanceGlobal: mapped.reduce((sum, e) => sum + e.balance, 0),
    },
    filtros: { search, estado },
  };
};

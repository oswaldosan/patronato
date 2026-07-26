import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const eventos = await prisma.evento.findMany({
    where: { publicado: true },
    include: {
      ingresos: { select: { monto: true } },
      gastos: { select: { monto: true } },
    },
    orderBy: { fecha: 'desc' },
  });

  return {
    eventos: eventos.map((e) => {
      const totalRecaudado = e.ingresos.reduce((sum, i) => sum + i.monto.toNumber(), 0);
      const totalGastos = e.gastos.reduce((sum, g) => sum + g.monto.toNumber(), 0);
      return {
        id: e.id,
        nombre: e.nombre,
        descripcion: e.descripcion,
        fecha: e.fecha.toISOString(),
        lugar: e.lugar,
        foto1: e.foto1,
        totalRecaudado,
        totalGastos,
        neto: totalRecaudado - totalGastos,
      };
    }),
  };
};

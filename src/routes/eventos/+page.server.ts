import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const eventos = await prisma.evento.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' },
  });

  return {
    eventos: eventos.map((e) => ({
      id: e.id,
      nombre: e.nombre,
      descripcion: e.descripcion,
      fecha: e.fecha.toISOString(),
      lugar: e.lugar,
      foto1: e.foto1,
    })),
  };
};

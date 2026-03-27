import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const proyectos = await prisma.proyecto.findMany({
    where: { publicado: true },
    orderBy: { fecha: 'desc' },
  });

  return {
    proyectos: proyectos.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion,
      fecha: p.fecha.toISOString(),
      gastoTotal: p.gastoTotal?.toNumber() ?? null,
      foto1: p.foto1,
      foto2: p.foto2,
      foto3: p.foto3,
      foto4: p.foto4,
    })),
  };
};

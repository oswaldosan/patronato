import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const proyecto = await prisma.proyecto.findUnique({
    where: { id: params.id, publicado: true },
  });

  if (!proyecto) {
    throw error(404, 'Proyecto no encontrado');
  }

  return {
    proyecto: {
      id: proyecto.id,
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      fecha: proyecto.fecha.toISOString(),
      gastoTotal: proyecto.gastoTotal?.toNumber() ?? null,
      foto1: proyecto.foto1,
      foto2: proyecto.foto2,
      foto3: proyecto.foto3,
      foto4: proyecto.foto4,
    },
  };
};

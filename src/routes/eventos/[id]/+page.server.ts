import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import type { ExcelParsed } from '$lib/server/excel';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const evento = await prisma.evento.findUnique({
    where: { id: params.id, publicado: true },
  });

  if (!evento) {
    throw error(404, 'Evento no encontrado');
  }

  return {
    evento: {
      id: evento.id,
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha: evento.fecha.toISOString(),
      lugar: evento.lugar,
      foto1: evento.foto1,
      excelNombre: evento.excelNombre,
      excelData: (evento.excelData as unknown as ExcelParsed | null) ?? null,
      excelActualizado: evento.excelActualizado?.toISOString() ?? null,
    },
  };
};

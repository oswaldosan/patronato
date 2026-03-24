import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('q') || '';
  const estado = url.searchParams.get('estado') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 20;

  const where: Record<string, unknown> = {};

  if (search) {
    where.donante = {
      OR: [
        { nombre: { contains: search, mode: 'insensitive' } },
        { nombreNegocio: { contains: search, mode: 'insensitive' } },
      ],
    };
  }

  if (estado) {
    where.estado = estado;
  }

  const [donaciones, total] = await Promise.all([
    prisma.donacionMaterial.findMany({
      where,
      include: {
        donante: { select: { nombre: true, nombreNegocio: true, tipo: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.donacionMaterial.count({ where }),
  ]);

  return {
    donaciones: donaciones.map((d) => ({
      id: d.id,
      descripcion: d.descripcion,
      cantidad: d.cantidad,
      valorEstimado: d.valorEstimado.toNumber(),
      fecha: d.fecha.toISOString(),
      estado: d.estado,
      donante: d.donante.nombreNegocio || d.donante.nombre,
      donanteId: d.donanteId,
      createdAt: d.createdAt.toISOString(),
    })),
    filtros: { search, estado },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

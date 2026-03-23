// @ts-nocheck
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const search = url.searchParams.get('q') || '';
  const estado = url.searchParams.get('estado') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 20;

  const where: Record<string, unknown> = {};

  if (search) {
    where.OR = [
      { titulo: { contains: search, mode: 'insensitive' } },
      { descripcion: { contains: search, mode: 'insensitive' } },
    ];
  }

  if (estado === 'publicado') {
    where.publicado = true;
  } else if (estado === 'borrador') {
    where.publicado = false;
  }

  const [proyectos, total] = await Promise.all([
    prisma.proyecto.findMany({
      where,
      orderBy: { fecha: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.proyecto.count({ where }),
  ]);

  return {
    proyectos: proyectos.map((p) => ({
      id: p.id,
      titulo: p.titulo,
      descripcion: p.descripcion,
      fecha: p.fecha.toISOString(),
      gastoTotal: p.gastoTotal.toNumber(),
      foto1: p.foto1,
      publicado: p.publicado,
      createdAt: p.createdAt.toISOString(),
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

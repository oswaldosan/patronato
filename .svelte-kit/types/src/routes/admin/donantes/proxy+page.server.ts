// @ts-nocheck
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const search = url.searchParams.get('q') || '';
  const tipo = url.searchParams.get('tipo') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 20;
  
  const where: Record<string, unknown> = {};
  
  if (search) {
    where.OR = [
      { nombre: { contains: search, mode: 'insensitive' } },
      { nombreNegocio: { contains: search, mode: 'insensitive' } },
    ];
  }
  
  if (tipo) {
    where.tipo = tipo;
  }
  
  const [donantes, total] = await Promise.all([
    prisma.donante.findMany({
      where,
      include: {
        _count: {
          select: { aportes: true },
        },
        aportes: {
          where: { estado: 'VERIFICADO' },
          select: { monto: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.donante.count({ where }),
  ]);
  
  return {
    donantes: donantes.map((d) => ({
      id: d.id,
      nombre: d.nombre,
      nombreNegocio: d.nombreNegocio,
      tipo: d.tipo,
      telefono: d.telefono,
      email: d.email,
      activo: d.activo,
      totalAportes: d._count.aportes,
      totalDonado: d.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0),
      createdAt: d.createdAt.toISOString(),
    })),
    filtros: { search, tipo },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

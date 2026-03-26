import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const estado = url.searchParams.get('estado') || '';
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 20;

  const where: Record<string, unknown> = {};

  if (estado === 'PENDIENTE' || estado === 'APROBADO' || estado === 'RECHAZADO') {
    where.estado = estado;
  }

  const [solicitudes, total, pendientes] = await Promise.all([
    prisma.solicitudDonacion.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.solicitudDonacion.count({ where }),
    prisma.solicitudDonacion.count({ where: { estado: 'PENDIENTE' } }),
  ]);

  return {
    solicitudes: solicitudes.map((s) => ({
      id: s.id,
      nombre: s.nombre,
      identidad: s.identidad,
      telefono: s.telefono,
      monto: s.monto?.toNumber() ?? null,
      comprobante: s.comprobante,
      mensaje: s.mensaje,
      estado: s.estado,
      createdAt: s.createdAt.toISOString(),
    })),
    filtros: { estado },
    pendientes,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

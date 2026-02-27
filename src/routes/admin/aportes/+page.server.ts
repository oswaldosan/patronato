import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const search = url.searchParams.get('q') || '';
  const estado = url.searchParams.get('estado') || '';
  const rubroId = url.searchParams.get('rubro') || '';
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
  
  if (rubroId) {
    where.rubroId = rubroId;
  }
  
  const [aportes, total, rubros] = await Promise.all([
    prisma.aporte.findMany({
      where,
      include: {
        donante: { select: { nombre: true, nombreNegocio: true, tipo: true } },
        rubro: { select: { nombre: true, color: true } },
      },
      orderBy: { createdAt: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.aporte.count({ where }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
    }),
  ]);
  
  return {
    aportes: aportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      metodo: a.metodo,
      estado: a.estado,
      donante: a.donante.nombreNegocio || a.donante.nombre,
      donanteId: a.donanteId,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
      createdAt: a.createdAt.toISOString(),
    })),
    rubros: rubros.map((r) => ({ id: r.id, nombre: r.nombre })),
    filtros: { search, estado, rubroId },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

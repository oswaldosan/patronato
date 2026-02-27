// @ts-nocheck
import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const query = url.searchParams.get('q') || '';
  
  if (!query || query.length < 2) {
    return { 
      donantes: [],
      query,
      searched: false,
    };
  }
  
  const donantes = await prisma.donante.findMany({
    where: {
      activo: true,
      OR: [
        { nombre: { contains: query, mode: 'insensitive' } },
        { nombreNegocio: { contains: query, mode: 'insensitive' } },
      ],
    },
    include: {
      aportes: {
        where: { estado: 'VERIFICADO' },
        select: { monto: true },
      },
    },
    orderBy: { nombre: 'asc' },
    take: 50,
  });
  
  const donantesConTotal = donantes.map((d) => ({
    id: d.id,
    nombre: d.nombre,
    nombreNegocio: d.nombreNegocio,
    tipo: d.tipo,
    totalDonado: d.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0),
    cantidadAportes: d.aportes.length,
  }));
  
  // Ordenar por total donado
  donantesConTotal.sort((a, b) => b.totalDonado - a.totalDonado);
  
  return { 
    donantes: donantesConTotal,
    query,
    searched: true,
  };
};

// @ts-nocheck
import { prisma } from '$lib/server/db';
import type { MetodoPago, Prisma } from '@prisma/client';
import type { PageServerLoad } from './$types';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = 20;
  const skip = (page - 1) * limit;
  
  const tipo = url.searchParams.get('tipo') || 'todos'; // ingresos, egresos, todos
  const rubroId = url.searchParams.get('rubro') || '';
  const metodo = url.searchParams.get('metodo') || '';
  const desde = url.searchParams.get('desde') || '';
  const hasta = url.searchParams.get('hasta') || '';
  
  // Filtros para aportes
  const aporteWhere: Prisma.AporteWhereInput = {
    estado: 'VERIFICADO',
  };
  
  if (rubroId) {
    aporteWhere.rubroId = rubroId;
  }
  
  if (metodo) {
    aporteWhere.metodo = metodo as MetodoPago;
  }
  
  if (desde || hasta) {
    aporteWhere.fecha = {
      ...(desde ? { gte: new Date(desde) } : {}),
      ...(hasta ? { lte: new Date(hasta + 'T23:59:59') } : {}),
    };
  }
  
  // Filtros para egresos
  const egresoWhere: Prisma.EgresoWhereInput = {
    estado: 'VERIFICADO',
  };
  
  if (rubroId) {
    egresoWhere.rubroId = rubroId;
  }

  if (desde || hasta) {
    egresoWhere.fecha = {
      ...(desde ? { gte: new Date(desde) } : {}),
      ...(hasta ? { lte: new Date(hasta + 'T23:59:59') } : {}),
    };
  }
  
  let aportes: Array<{
    id: string;
    tipo: 'ingreso';
    fecha: string;
    monto: number;
    concepto: string;
    detalle: string;
    rubro: string | null;
    rubroColor: string | null;
    metodo: string;
  }> = [];
  
  let egresos: Array<{
    id: string;
    tipo: 'egreso';
    fecha: string;
    monto: number;
    concepto: string;
    detalle: string | null;
    rubro: string | null;
    rubroColor: string | null;
    metodo: string | null;
  }> = [];
  
  // Obtener aportes si corresponde
  if (tipo === 'todos' || tipo === 'ingresos') {
    const aportesData = await prisma.aporte.findMany({
      where: aporteWhere,
      include: {
        donante: { select: { nombre: true, nombreNegocio: true } },
        rubro: { select: { nombre: true, color: true } },
      },
      orderBy: { fecha: 'desc' },
      take: tipo === 'todos' ? Math.ceil(limit / 2) : limit,
      skip: tipo === 'todos' ? 0 : skip,
    });
    
    aportes = aportesData.map((a) => ({
      id: a.id,
      tipo: 'ingreso' as const,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      concepto: a.donante.nombreNegocio || a.donante.nombre,
      detalle: a.comentario || '',
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
      metodo: a.metodo,
    }));
  }
  
  // Obtener egresos si corresponde
  if (tipo === 'todos' || tipo === 'egresos') {
    const egresosData = await prisma.egreso.findMany({
      where: egresoWhere,
      include: {
        rubro: { select: { nombre: true, color: true } },
        proveedor: { select: { nombre: true } },
      },
      orderBy: { fecha: 'desc' },
      take: tipo === 'todos' ? Math.ceil(limit / 2) : limit,
      skip: tipo === 'todos' ? 0 : skip,
    });
    
    egresos = egresosData.map((e) => ({
      id: e.id,
      tipo: 'egreso' as const,
      fecha: e.fecha.toISOString(),
      monto: e.monto.toNumber(),
      concepto: e.concepto,
      detalle: e.proveedor?.nombre ?? null,
      rubro: e.rubro?.nombre ?? null,
      rubroColor: e.rubro?.color ?? null,
      metodo: null,
    }));
  }
  
  // Combinar y ordenar
  const movimientos = [...aportes, ...egresos].sort((a, b) => 
    new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  
  // Obtener rubros para filtro
  const rubros = await prisma.rubro.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' },
    select: { id: true, nombre: true },
  });
  
  // Totales
  const totalIngresos = await prisma.aporte.aggregate({
    _sum: { monto: true },
    where: aporteWhere,
  });
  
  const totalEgresos = await prisma.egreso.aggregate({
    _sum: { monto: true },
    where: egresoWhere,
  });
  
  return {
    movimientos,
    rubros,
    filtros: { tipo, rubroId, metodo, desde, hasta },
    totales: {
      ingresos: totalIngresos._sum.monto?.toNumber() || 0,
      egresos: totalEgresos._sum.monto?.toNumber() || 0,
    },
    pagination: {
      page,
      limit,
      hasMore: movimientos.length === limit,
    },
  };
};

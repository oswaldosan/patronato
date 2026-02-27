import { prisma } from '$lib/server/db';
import type { Prisma } from '@prisma/client';

type ReportFilters = {
  desde?: string | null;
  hasta?: string | null;
};

const toInputDate = (date: Date) => date.toISOString().split('T')[0];

export async function getReportData(filters: ReportFilters) {
  const ahora = new Date();
  const hastaDate = filters.hasta ? new Date(filters.hasta) : new Date(ahora);
  hastaDate.setHours(23, 59, 59, 999);

  const desdeDate = filters.desde ? new Date(filters.desde) : new Date(hastaDate);
  desdeDate.setMonth(desdeDate.getMonth() - 12);

  const aporteWhere: Prisma.AporteWhereInput = {
    estado: 'VERIFICADO',
    fecha: {
      gte: desdeDate,
      lte: hastaDate,
    },
  };

  const egresoWhere: Prisma.EgresoWhereInput = {
    estado: 'VERIFICADO',
    fecha: {
      gte: desdeDate,
      lte: hastaDate,
    },
  };

  const [
    aportesPorPeriodo,
    egresosPorPeriodo,
    aportesPorRubroRaw,
    egresosPorRubroRaw,
    aportesPorDonanteRaw,
    egresosPorProveedorRaw,
    rubros,
  ] = await Promise.all([
    prisma.$queryRaw<Array<{ mes: string; total: number; cantidad: bigint }>>`
      SELECT
        TO_CHAR(DATE_TRUNC('month', fecha), 'YYYY-MM') as mes,
        SUM(monto)::float as total,
        COUNT(*)::bigint as cantidad
      FROM "Aporte"
      WHERE estado = 'VERIFICADO' AND fecha >= ${desdeDate} AND fecha <= ${hastaDate}
      GROUP BY 1
      ORDER BY 1 ASC
    `,
    prisma.$queryRaw<Array<{ mes: string; total: number; cantidad: bigint }>>`
      SELECT
        TO_CHAR(DATE_TRUNC('month', fecha), 'YYYY-MM') as mes,
        SUM(monto)::float as total,
        COUNT(*)::bigint as cantidad
      FROM "Egreso"
      WHERE estado = 'VERIFICADO' AND fecha >= ${desdeDate} AND fecha <= ${hastaDate}
      GROUP BY 1
      ORDER BY 1 ASC
    `,
    prisma.aporte.groupBy({
      by: ['rubroId'],
      _sum: { monto: true },
      _count: { id: true },
      where: aporteWhere,
      orderBy: { _sum: { monto: 'desc' } },
    }),
    prisma.egreso.groupBy({
      by: ['rubroId'],
      _sum: { monto: true },
      _count: { id: true },
      where: egresoWhere,
      orderBy: { _sum: { monto: 'desc' } },
    }),
    prisma.aporte.groupBy({
      by: ['donanteId'],
      _sum: { monto: true },
      _count: { id: true },
      where: aporteWhere,
      orderBy: { _sum: { monto: 'desc' } },
    }),
    prisma.egreso.groupBy({
      by: ['proveedorId'],
      _sum: { monto: true },
      _count: { id: true },
      where: egresoWhere,
      orderBy: { _sum: { monto: 'desc' } },
    }),
    prisma.rubro.findMany({
      where: { activo: true },
      select: { id: true, nombre: true, color: true },
      orderBy: { orden: 'asc' },
    }),
  ]);

  const rubroMap = new Map(rubros.map((rubro) => [rubro.id, rubro]));

  const aportesPorRubro = aportesPorRubroRaw.map((r) => ({
    rubroId: r.rubroId,
    rubro: rubroMap.get(r.rubroId)?.nombre ?? 'Sin rubro',
    color: rubroMap.get(r.rubroId)?.color ?? '#64748b',
    total: r._sum.monto?.toNumber() || 0,
    cantidad: r._count.id,
  }));

  const egresosPorRubro = egresosPorRubroRaw.map((r) => ({
    rubroId: r.rubroId,
    rubro: rubroMap.get(r.rubroId)?.nombre ?? 'Sin rubro',
    color: rubroMap.get(r.rubroId)?.color ?? '#64748b',
    total: r._sum.monto?.toNumber() || 0,
    cantidad: r._count.id,
  }));

  const donantes = await prisma.donante.findMany({
    where: { id: { in: aportesPorDonanteRaw.map((d) => d.donanteId) } },
    select: { id: true, nombre: true, nombreNegocio: true, tipo: true },
  });

  const aportesPorDonante = aportesPorDonanteRaw.map((d) => {
    const donante = donantes.find((item) => item.id === d.donanteId);
    return {
      donanteId: d.donanteId,
      donante: donante?.nombreNegocio || donante?.nombre || 'Anónimo',
      tipo: donante?.tipo ?? 'PERSONA',
      total: d._sum.monto?.toNumber() || 0,
      cantidad: d._count.id,
    };
  });

  const proveedorIds = egresosPorProveedorRaw
    .map((p) => p.proveedorId)
    .filter((id): id is string => Boolean(id));

  const proveedores = await prisma.proveedor.findMany({
    where: { id: { in: proveedorIds } },
    select: { id: true, nombre: true },
  });

  const egresosPorProveedor = egresosPorProveedorRaw.map((p) => {
    const proveedor = proveedores.find((item) => item.id === p.proveedorId);
    return {
      proveedorId: p.proveedorId,
      proveedor: proveedor?.nombre || 'Sin proveedor',
      total: p._sum.monto?.toNumber() || 0,
      cantidad: p._count.id,
    };
  });

  const aportesPorEstado = await prisma.aporte.groupBy({
    by: ['estado'],
    _count: { id: true },
    where: {
      fecha: {
        gte: desdeDate,
        lte: hastaDate,
      },
    },
  });

  const egresosPorEstado = await prisma.egreso.groupBy({
    by: ['estado'],
    _count: { id: true },
    where: {
      fecha: {
        gte: desdeDate,
        lte: hastaDate,
      },
    },
  });

  const balanceMap = new Map<string, { ingresos: number; egresos: number }>();
  aportesPorPeriodo.forEach((row) => {
    balanceMap.set(row.mes, { ingresos: row.total || 0, egresos: 0 });
  });
  egresosPorPeriodo.forEach((row) => {
    const actual = balanceMap.get(row.mes) ?? { ingresos: 0, egresos: 0 };
    balanceMap.set(row.mes, { ...actual, egresos: row.total || 0 });
  });

  const meses = Array.from(balanceMap.keys()).sort();
  let acumulado = 0;
  const balanceHistorico = meses.map((mes) => {
    const info = balanceMap.get(mes) ?? { ingresos: 0, egresos: 0 };
    acumulado += info.ingresos - info.egresos;
    return {
      mes,
      ingresos: info.ingresos,
      egresos: info.egresos,
      balance: acumulado,
    };
  });

  return {
    filtros: {
      desde: toInputDate(desdeDate),
      hasta: toInputDate(hastaDate),
    },
    aportesPorPeriodo: aportesPorPeriodo.map((row) => ({
      mes: row.mes,
      total: row.total,
      cantidad: Number(row.cantidad),
    })),
    egresosPorPeriodo: egresosPorPeriodo.map((row) => ({
      mes: row.mes,
      total: row.total,
      cantidad: Number(row.cantidad),
    })),
    aportesPorRubro,
    egresosPorRubro,
    aportesPorDonante,
    egresosPorProveedor,
    balanceHistorico,
    estados: {
      aportes: aportesPorEstado.map((row) => ({
        estado: row.estado,
        cantidad: row._count.id,
      })),
      egresos: egresosPorEstado.map((row) => ({
        estado: row.estado,
        cantidad: row._count.id,
      })),
    },
  };
}

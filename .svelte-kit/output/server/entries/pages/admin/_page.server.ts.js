import { p as prisma } from "../../../chunks/db.js";
const load = async () => {
  const [
    totalIngresos,
    totalEgresos,
    totalDonantes,
    totalAportes,
    aportesPendientes,
    egresosPendientes
  ] = await Promise.all([
    prisma.aporte.aggregate({
      _sum: { monto: true },
      where: { estado: "VERIFICADO" }
    }),
    prisma.egreso.aggregate({
      _sum: { monto: true },
      where: { estado: "VERIFICADO" }
    }),
    prisma.donante.count({ where: { activo: true } }),
    prisma.aporte.count({ where: { estado: "VERIFICADO" } }),
    prisma.aporte.count({ where: { estado: "PENDIENTE" } }),
    prisma.egreso.count({ where: { estado: "PENDIENTE" } })
  ]);
  const ultimosAportes = await prisma.aporte.findMany({
    include: {
      donante: { select: { nombre: true, nombreNegocio: true } },
      rubro: { select: { nombre: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 5
  });
  const ultimosEgresos = await prisma.egreso.findMany({
    include: {
      rubro: { select: { nombre: true, color: true } },
      proveedor: { select: { nombre: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 5
  });
  const ultimosLogs = await prisma.auditLog.findMany({
    include: {
      user: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" },
    take: 10
  });
  return {
    stats: {
      totalIngresos: totalIngresos._sum.monto?.toNumber() || 0,
      totalEgresos: totalEgresos._sum.monto?.toNumber() || 0,
      balance: (totalIngresos._sum.monto?.toNumber() || 0) - (totalEgresos._sum.monto?.toNumber() || 0),
      totalDonantes,
      totalAportes,
      aportesPendientes,
      egresosPendientes
    },
    ultimosAportes: ultimosAportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      donante: a.donante.nombreNegocio || a.donante.nombre,
      rubro: a.rubro.nombre,
      estado: a.estado
    })),
    ultimosEgresos: ultimosEgresos.map((e) => ({
      id: e.id,
      fecha: e.fecha.toISOString(),
      monto: e.monto.toNumber(),
      concepto: e.concepto,
      estado: e.estado,
      rubro: e.rubro?.nombre ?? null,
      rubroColor: e.rubro?.color ?? null,
      proveedor: e.proveedor?.nombre ?? null
    })),
    ultimosLogs: ultimosLogs.map((l) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      entityId: l.entityId,
      user: l.user?.name || "Sistema",
      createdAt: l.createdAt.toISOString()
    }))
  };
};
export {
  load
};

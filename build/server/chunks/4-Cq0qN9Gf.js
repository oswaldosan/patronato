import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 4;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CwIjoeNW.js')).default;
const server_id = "src/routes/admin/+page.server.ts";
const imports = ["_app/immutable/nodes/4.BxaLu_Pp.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/C5uhlMZ_.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=4-Cq0qN9Gf.js.map

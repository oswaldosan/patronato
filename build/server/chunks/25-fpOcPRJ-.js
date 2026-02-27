import { p as prisma } from './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const load = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const skip = (page - 1) * limit;
  const tipo = url.searchParams.get("tipo") || "todos";
  const rubroId = url.searchParams.get("rubro") || "";
  const metodo = url.searchParams.get("metodo") || "";
  const desde = url.searchParams.get("desde") || "";
  const hasta = url.searchParams.get("hasta") || "";
  const aporteWhere = {
    estado: "VERIFICADO"
  };
  if (rubroId) {
    aporteWhere.rubroId = rubroId;
  }
  if (metodo) {
    aporteWhere.metodo = metodo;
  }
  if (desde || hasta) {
    aporteWhere.fecha = {
      ...desde ? { gte: new Date(desde) } : {},
      ...hasta ? { lte: /* @__PURE__ */ new Date(hasta + "T23:59:59") } : {}
    };
  }
  const egresoWhere = {
    estado: "VERIFICADO"
  };
  if (rubroId) {
    egresoWhere.rubroId = rubroId;
  }
  if (desde || hasta) {
    egresoWhere.fecha = {
      ...desde ? { gte: new Date(desde) } : {},
      ...hasta ? { lte: /* @__PURE__ */ new Date(hasta + "T23:59:59") } : {}
    };
  }
  let aportes = [];
  let egresos = [];
  if (tipo === "todos" || tipo === "ingresos") {
    const aportesData = await prisma.aporte.findMany({
      where: aporteWhere,
      include: {
        donante: { select: { nombre: true, nombreNegocio: true } },
        rubro: { select: { nombre: true, color: true } }
      },
      orderBy: { fecha: "desc" },
      take: tipo === "todos" ? Math.ceil(limit / 2) : limit,
      skip: tipo === "todos" ? 0 : skip
    });
    aportes = aportesData.map((a) => ({
      id: a.id,
      tipo: "ingreso",
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      concepto: a.donante.nombreNegocio || a.donante.nombre,
      detalle: a.comentario || "",
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
      metodo: a.metodo
    }));
  }
  if (tipo === "todos" || tipo === "egresos") {
    const egresosData = await prisma.egreso.findMany({
      where: egresoWhere,
      include: {
        rubro: { select: { nombre: true, color: true } },
        proveedor: { select: { nombre: true } }
      },
      orderBy: { fecha: "desc" },
      take: tipo === "todos" ? Math.ceil(limit / 2) : limit,
      skip: tipo === "todos" ? 0 : skip
    });
    egresos = egresosData.map((e) => ({
      id: e.id,
      tipo: "egreso",
      fecha: e.fecha.toISOString(),
      monto: e.monto.toNumber(),
      concepto: e.concepto,
      detalle: e.proveedor?.nombre ?? null,
      rubro: e.rubro?.nombre ?? null,
      rubroColor: e.rubro?.color ?? null,
      metodo: null
    }));
  }
  const movimientos = [...aportes, ...egresos].sort(
    (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
  );
  const rubros = await prisma.rubro.findMany({
    where: { activo: true },
    orderBy: { nombre: "asc" },
    select: { id: true, nombre: true }
  });
  const totalIngresos = await prisma.aporte.aggregate({
    _sum: { monto: true },
    where: aporteWhere
  });
  const totalEgresos = await prisma.egreso.aggregate({
    _sum: { monto: true },
    where: egresoWhere
  });
  return {
    movimientos,
    rubros,
    filtros: { tipo, rubroId, metodo, desde, hasta },
    totales: {
      ingresos: totalIngresos._sum.monto?.toNumber() || 0,
      egresos: totalEgresos._sum.monto?.toNumber() || 0
    },
    pagination: {
      page,
      limit,
      hasMore: movimientos.length === limit
    }
  };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 25;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BagVmWLN.js')).default;
const server_id = "src/routes/movimientos/+page.server.ts";
const imports = ["_app/immutable/nodes/25.Dz-8EfjW.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/BK_--6wx.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/88GCis-0.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=25-fpOcPRJ-.js.map

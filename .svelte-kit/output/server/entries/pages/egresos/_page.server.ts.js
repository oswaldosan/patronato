import { p as prisma } from "../../../chunks/db.js";
const load = async ({ url }) => {
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const skip = (page - 1) * limit;
  const rubroId = url.searchParams.get("rubro") || "";
  const proveedorId = url.searchParams.get("proveedor") || "";
  const desde = url.searchParams.get("desde") || "";
  const hasta = url.searchParams.get("hasta") || "";
  const where = {
    estado: "VERIFICADO"
  };
  if (rubroId) {
    where.rubroId = rubroId;
  }
  if (proveedorId) {
    where.proveedorId = proveedorId;
  }
  if (desde || hasta) {
    where.fecha = {
      ...desde ? { gte: new Date(desde) } : {},
      ...hasta ? { lte: /* @__PURE__ */ new Date(hasta + "T23:59:59") } : {}
    };
  }
  const [egresosData, totalCount] = await Promise.all([
    prisma.egreso.findMany({
      where,
      include: {
        rubro: { select: { id: true, nombre: true, color: true } },
        proveedor: { select: { id: true, nombre: true } }
      },
      orderBy: { fecha: "desc" },
      take: limit,
      skip
    }),
    prisma.egreso.count({ where })
  ]);
  const egresos = egresosData.map((e) => ({
    id: e.id,
    fecha: e.fecha.toISOString(),
    monto: e.monto.toNumber(),
    concepto: e.concepto,
    rubro: e.rubro?.nombre ?? null,
    rubroColor: e.rubro?.color ?? null,
    proveedor: e.proveedor?.nombre ?? null,
    notas: e.notas
  }));
  const [rubros, proveedores] = await Promise.all([
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true }
    }),
    prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true }
    })
  ]);
  const [totalGeneral, totalPorRubro] = await Promise.all([
    prisma.egreso.aggregate({
      _sum: { monto: true },
      _count: true,
      where: { estado: "VERIFICADO" }
    }),
    prisma.egreso.groupBy({
      by: ["rubroId"],
      _sum: { monto: true },
      where: { estado: "VERIFICADO" }
    })
  ]);
  const rubrosConTotales = await Promise.all(
    totalPorRubro.map(async (item) => {
      const rubro = await prisma.rubro.findUnique({
        where: { id: item.rubroId },
        select: { nombre: true, color: true }
      });
      return {
        nombre: rubro?.nombre ?? "Sin categoría",
        color: rubro?.color ?? "#94a3b8",
        total: item._sum.monto?.toNumber() ?? 0
      };
    })
  );
  rubrosConTotales.sort((a, b) => b.total - a.total);
  return {
    egresos,
    rubros,
    proveedores,
    filtros: { rubroId, proveedorId, desde, hasta },
    stats: {
      totalGastado: totalGeneral._sum.monto?.toNumber() ?? 0,
      totalEgresos: totalGeneral._count,
      porRubro: rubrosConTotales
    },
    pagination: {
      page,
      limit,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit)
    }
  };
};
export {
  load
};

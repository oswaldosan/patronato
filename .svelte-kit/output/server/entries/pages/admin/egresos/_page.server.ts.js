import { p as prisma } from "../../../../chunks/db.js";
const load = async ({ url }) => {
  const search = url.searchParams.get("q") || "";
  const estado = url.searchParams.get("estado") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 20;
  const where = {};
  if (search) {
    where.OR = [
      { concepto: { contains: search, mode: "insensitive" } },
      { proveedor: { nombre: { contains: search, mode: "insensitive" } } }
    ];
  }
  if (estado) {
    where.estado = estado;
  }
  const [egresos, total] = await Promise.all([
    prisma.egreso.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        rubro: { select: { nombre: true, color: true } },
        proveedor: { select: { nombre: true } }
      }
    }),
    prisma.egreso.count({ where })
  ]);
  return {
    egresos: egresos.map((e) => ({
      id: e.id,
      fecha: e.fecha.toISOString(),
      monto: e.monto.toNumber(),
      concepto: e.concepto,
      proveedor: e.proveedor?.nombre ?? null,
      rubro: e.rubro?.nombre ?? null,
      rubroColor: e.rubro?.color ?? null,
      estado: e.estado,
      createdAt: e.createdAt.toISOString()
    })),
    filtros: { search, estado },
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  };
};
export {
  load
};

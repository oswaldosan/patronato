import { p as prisma } from "../../../../chunks/db.js";
const load = async ({ url }) => {
  const entity = url.searchParams.get("entity") || "";
  const action = url.searchParams.get("action") || "";
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 50;
  const where = {};
  if (entity) {
    where.entity = entity;
  }
  if (action) {
    where.action = action;
  }
  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.auditLog.count({ where })
  ]);
  const entities = await prisma.auditLog.groupBy({
    by: ["entity"]
  });
  return {
    logs: logs.map((l) => ({
      id: l.id,
      action: l.action,
      entity: l.entity,
      entityId: l.entityId,
      user: l.user?.name || "Sistema",
      userEmail: l.user?.email,
      oldData: l.oldData,
      newData: l.newData,
      ip: l.ip,
      createdAt: l.createdAt.toISOString()
    })),
    entities: entities.map((e) => e.entity),
    filtros: { entity, action },
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

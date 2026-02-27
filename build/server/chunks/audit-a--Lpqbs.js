import { p as prisma } from './db-6tYg_p_L.js';

async function createAuditLog(params) {
  return prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      oldData: params.oldData ? JSON.parse(JSON.stringify(params.oldData)) : null,
      newData: params.newData ? JSON.parse(JSON.stringify(params.newData)) : null,
      ip: params.ip
    }
  });
}

export { createAuditLog as c };
//# sourceMappingURL=audit-a--Lpqbs.js.map

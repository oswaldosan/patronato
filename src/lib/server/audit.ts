import { prisma } from './db';

export type AuditAction = 'CREATE' | 'UPDATE' | 'DELETE';

export interface AuditParams {
  userId?: string;
  action: AuditAction;
  entity: string;
  entityId: string;
  oldData?: Record<string, unknown>;
  newData?: Record<string, unknown>;
  ip?: string;
}

export async function createAuditLog(params: AuditParams) {
  return prisma.auditLog.create({
    data: {
      userId: params.userId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      oldData: params.oldData ? JSON.parse(JSON.stringify(params.oldData)) : null,
      newData: params.newData ? JSON.parse(JSON.stringify(params.newData)) : null,
      ip: params.ip,
    },
  });
}

export async function getAuditLogs(options?: {
  entity?: string;
  entityId?: string;
  limit?: number;
  offset?: number;
}) {
  const { entity, entityId, limit = 50, offset = 0 } = options || {};

  return prisma.auditLog.findMany({
    where: {
      ...(entity && { entity }),
      ...(entityId && { entityId }),
    },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
  });
}

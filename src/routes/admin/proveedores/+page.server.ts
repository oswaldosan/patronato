import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const proveedorSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres').max(200),
  contacto: z.string().max(300).optional().nullable(),
});

export const load: PageServerLoad = async () => {
  const proveedores = await prisma.proveedor.findMany({
    include: {
      _count: {
        select: { egresos: true },
      },
      egresos: {
        where: { estado: 'VERIFICADO' },
        select: { monto: true },
      },
    },
    orderBy: { nombre: 'asc' },
  });

  return {
    proveedores: proveedores.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      contacto: p.contacto,
      activo: p.activo,
      totalEgresos: p._count.egresos,
      totalGastado: p.egresos.reduce((sum, e) => sum + e.monto.toNumber(), 0),
    })),
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();

    const data = {
      nombre: (formData.get('nombre') as string)?.trim(),
      contacto: (formData.get('contacto') as string)?.trim() || null,
    };

    const result = proveedorSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'create' });
    }

    try {
      const proveedor = await prisma.proveedor.create({
        data: result.data,
      });

      await createAuditLog({
        action: 'CREATE',
        entity: 'Proveedor',
        entityId: proveedor.id,
        newData: result.data,
      });

      return { success: true, action: 'create' };
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
        return fail(400, { error: 'Ya existe un proveedor con ese nombre', action: 'create' });
      }
      return fail(500, { error: 'Error al crear el proveedor', action: 'create' });
    }
  },

  update: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const data = {
      nombre: (formData.get('nombre') as string)?.trim(),
      contacto: (formData.get('contacto') as string)?.trim() || null,
      activo: formData.get('activo') === 'on',
    };

    const result = proveedorSchema.partial().safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'update' });
    }

    try {
      await prisma.proveedor.update({
        where: { id },
        data: { ...result.data, activo: data.activo },
      });

      await createAuditLog({
        action: 'UPDATE',
        entity: 'Proveedor',
        entityId: id,
        newData: data,
      });

      return { success: true, action: 'update' };
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
        return fail(400, { error: 'Ya existe un proveedor con ese nombre', action: 'update' });
      }
      return fail(500, { error: 'Error al actualizar el proveedor', action: 'update' });
    }
  },

  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const egresosCount = await prisma.egreso.count({
      where: { proveedorId: id },
    });

    if (egresosCount > 0) {
      return fail(400, {
        error: 'No se puede eliminar un proveedor con gastos asociados. Desactívalo en su lugar.',
        action: 'delete',
      });
    }

    try {
      await prisma.proveedor.delete({
        where: { id },
      });

      await createAuditLog({
        action: 'DELETE',
        entity: 'Proveedor',
        entityId: id,
      });

      return { success: true, action: 'delete' };
    } catch (e) {
      return fail(500, { error: 'Error al eliminar el proveedor', action: 'delete' });
    }
  },
};

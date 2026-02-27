// @ts-nocheck
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { egresoUpdateSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const egreso = await prisma.egreso.findUnique({
    where: { id: params.id },
    include: {
      rubro: { select: { id: true, nombre: true, color: true } },
      proveedor: { select: { id: true, nombre: true } },
    },
  });
  
  if (!egreso) {
    throw error(404, 'Egreso no encontrado');
  }

  const [rubros, proveedores] = await Promise.all([
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    }),
    prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    }),
  ]);
  
  return {
    egreso: {
      id: egreso.id,
      fecha: egreso.fecha.toISOString().split('T')[0],
      monto: egreso.monto.toNumber(),
      concepto: egreso.concepto,
      rubroId: egreso.rubroId,
      rubroNombre: egreso.rubro?.nombre ?? null,
      rubroColor: egreso.rubro?.color ?? null,
      proveedorId: egreso.proveedor?.id ?? null,
      proveedorNombre: egreso.proveedor?.nombre ?? null,
      referencia: egreso.referencia,
      notas: egreso.notas,
      estado: egreso.estado,
      createdAt: egreso.createdAt.toISOString(),
      updatedAt: egreso.updatedAt.toISOString(),
    },
    rubros,
    proveedores,
  };
};

export const actions = {
  update: async ({ request, params }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    
    const data = {
      fecha: formData.get('fecha') as string,
      monto: formData.get('monto') as string,
      concepto: formData.get('concepto') as string,
      rubroId: formData.get('rubroId') as string,
      proveedorId: (formData.get('proveedorId') as string) || null,
      referencia: formData.get('referencia') as string || null,
      notas: formData.get('notas') as string || null,
      estado: formData.get('estado') as string,
    };
    
    const result = egresoUpdateSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }
    
    const oldData = await prisma.egreso.findUnique({
      where: { id: params.id },
    });
    
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: result.data,
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Egreso',
        entityId: params.id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data,
      });
      
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Error al actualizar el egreso' });
    }
  },
  
  verify: async ({ params }: import('./$types').RequestEvent) => {
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: { estado: 'VERIFICADO' },
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Egreso',
        entityId: params.id,
        newData: { estado: 'VERIFICADO' },
      });
      
      return { success: true, verified: true };
    } catch (e) {
      return fail(500, { error: 'Error al verificar el egreso' });
    }
  },
  
  cancel: async ({ params }: import('./$types').RequestEvent) => {
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: { estado: 'ANULADO' },
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Egreso',
        entityId: params.id,
        newData: { estado: 'ANULADO' },
      });
      
      return { success: true, cancelled: true };
    } catch (e) {
      return fail(500, { error: 'Error al anular el egreso' });
    }
  },
  
  delete: async ({ params, locals }: import('./$types').RequestEvent) => {
    try {
      await prisma.egreso.delete({
        where: { id: params.id },
      });
    } catch (e) {
      console.error('Error eliminando egreso:', e);
      return fail(500, { error: 'Error al eliminar el egreso' });
    }
    
    // Audit log en background
    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'Egreso',
      entityId: params.id,
    }).catch((err) => console.error('Error en audit log:', err));
    
    redirect(302, '/admin/egresos');
  },
};
;null as any as Actions;
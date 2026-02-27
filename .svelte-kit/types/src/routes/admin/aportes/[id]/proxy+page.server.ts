// @ts-nocheck
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { aporteUpdateSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const [aporte, donantes, rubros] = await Promise.all([
    prisma.aporte.findUnique({
      where: { id: params.id },
      include: {
        donante: { select: { id: true, nombre: true, nombreNegocio: true } },
        rubro: { select: { id: true, nombre: true, color: true } },
      },
    }),
    prisma.donante.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true, nombreNegocio: true },
    }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
      select: { id: true, nombre: true },
    }),
  ]);
  
  if (!aporte) {
    throw error(404, 'Aporte no encontrado');
  }
  
  return {
    aporte: {
      id: aporte.id,
      donanteId: aporte.donanteId,
      rubroId: aporte.rubroId,
      fecha: aporte.fecha.toISOString().split('T')[0],
      monto: aporte.monto.toNumber(),
      metodo: aporte.metodo,
      referencia: aporte.referencia,
      comentario: aporte.comentario,
      estado: aporte.estado,
      donante: aporte.donante,
      rubro: aporte.rubro,
      createdAt: aporte.createdAt.toISOString(),
      updatedAt: aporte.updatedAt.toISOString(),
    },
    donantes,
    rubros,
  };
};

export const actions = {
  update: async ({ request, params }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    
    const data = {
      donanteId: formData.get('donanteId') as string,
      rubroId: formData.get('rubroId') as string,
      fecha: formData.get('fecha') as string,
      monto: formData.get('monto') as string,
      metodo: formData.get('metodo') as string,
      referencia: formData.get('referencia') as string || null,
      comentario: formData.get('comentario') as string || null,
      estado: formData.get('estado') as string,
    };
    
    const result = aporteUpdateSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }
    
    const oldData = await prisma.aporte.findUnique({
      where: { id: params.id },
    });
    
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: result.data,
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Aporte',
        entityId: params.id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data,
      });
      
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'Error al actualizar el aporte' });
    }
  },
  
  verify: async ({ params }: import('./$types').RequestEvent) => {
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: { estado: 'VERIFICADO' },
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Aporte',
        entityId: params.id,
        newData: { estado: 'VERIFICADO' },
      });
      
      return { success: true, verified: true };
    } catch (e) {
      return fail(500, { error: 'Error al verificar el aporte' });
    }
  },
  
  cancel: async ({ params }: import('./$types').RequestEvent) => {
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: { estado: 'ANULADO' },
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Aporte',
        entityId: params.id,
        newData: { estado: 'ANULADO' },
      });
      
      return { success: true, cancelled: true };
    } catch (e) {
      return fail(500, { error: 'Error al anular el aporte' });
    }
  },
  
  delete: async ({ params, locals }: import('./$types').RequestEvent) => {
    try {
      await prisma.aporte.delete({
        where: { id: params.id },
      });
    } catch (e) {
      console.error('Error eliminando aporte:', e);
      return fail(500, { error: 'Error al eliminar el aporte' });
    }
    
    // Audit log en background
    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'Aporte',
      entityId: params.id,
    }).catch((err) => console.error('Error en audit log:', err));
    
    redirect(302, '/admin/aportes');
  },
};
;null as any as Actions;
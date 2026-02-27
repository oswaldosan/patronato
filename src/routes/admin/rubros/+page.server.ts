import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { rubroSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const rubros = await prisma.rubro.findMany({
    include: {
      _count: {
        select: { aportes: true },
      },
      aportes: {
        where: { estado: 'VERIFICADO' },
        select: { monto: true },
      },
    },
    orderBy: { orden: 'asc' },
  });
  
  return {
    rubros: rubros.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion,
      color: r.color,
      icono: r.icono,
      orden: r.orden,
      activo: r.activo,
      totalAportes: r._count.aportes,
      totalRecaudado: r.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0),
    })),
  };
};

export const actions: Actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    
    const data = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string || null,
      color: formData.get('color') as string || '#22c55e',
      icono: formData.get('icono') as string || null,
      orden: parseInt(formData.get('orden') as string) || 0,
    };
    
    const result = rubroSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'create' });
    }
    
    try {
      const rubro = await prisma.rubro.create({
        data: result.data,
      });
      
      await createAuditLog({
        action: 'CREATE',
        entity: 'Rubro',
        entityId: rubro.id,
        newData: result.data,
      });
      
      return { success: true, action: 'create' };
    } catch (e: unknown) {
      if (e && typeof e === 'object' && 'code' in e && e.code === 'P2002') {
        return fail(400, { error: 'Ya existe un rubro con ese nombre', action: 'create' });
      }
      return fail(500, { error: 'Error al crear el rubro', action: 'create' });
    }
  },
  
  update: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    
    const data = {
      nombre: formData.get('nombre') as string,
      descripcion: formData.get('descripcion') as string || null,
      color: formData.get('color') as string || '#22c55e',
      icono: formData.get('icono') as string || null,
      orden: parseInt(formData.get('orden') as string) || 0,
      activo: formData.get('activo') === 'on',
    };
    
    const result = rubroSchema.partial().safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'update' });
    }
    
    try {
      await prisma.rubro.update({
        where: { id },
        data: { ...result.data, activo: data.activo },
      });
      
      await createAuditLog({
        action: 'UPDATE',
        entity: 'Rubro',
        entityId: id,
        newData: data,
      });
      
      return { success: true, action: 'update' };
    } catch (e) {
      return fail(500, { error: 'Error al actualizar el rubro', action: 'update' });
    }
  },
  
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    
    // Verificar si tiene aportes
    const aportesCount = await prisma.aporte.count({
      where: { rubroId: id },
    });
    
    if (aportesCount > 0) {
      return fail(400, { 
        error: 'No se puede eliminar un rubro con aportes. Desactívalo en su lugar.',
        action: 'delete',
      });
    }
    
    try {
      await prisma.rubro.delete({
        where: { id },
      });
      
      await createAuditLog({
        action: 'DELETE',
        entity: 'Rubro',
        entityId: id,
      });
      
      return { success: true, action: 'delete' };
    } catch (e) {
      return fail(500, { error: 'Error al eliminar el rubro', action: 'delete' });
    }
  },
};

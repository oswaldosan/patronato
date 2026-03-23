// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ locals }: Parameters<PageServerLoad>[0]) => {
  // Solo ADMIN puede acceder a configuración
  if (locals.user?.role !== 'ADMIN') {
    throw redirect(302, '/admin');
  }
  
  const [metaConfig, nombreProyecto] = await Promise.all([
    prisma.config.findUnique({ where: { key: 'META_PROYECTO' } }),
    prisma.config.findUnique({ where: { key: 'NOMBRE_PROYECTO' } }),
  ]);
  
  return {
    config: {
      metaProyecto: metaConfig?.value ? parseFloat(metaConfig.value) : 500000,
      nombreProyecto: nombreProyecto?.value || 'Patronato Pro Mejoramiento de Monterrey',
    },
  };
};

export const actions = {
  updateMeta: async ({ request, locals }: import('./$types').RequestEvent) => {
    if (locals.user?.role !== 'ADMIN') {
      return fail(403, { error: 'Sin permisos' });
    }
    
    const formData = await request.formData();
    const metaStr = formData.get('metaProyecto') as string;
    
    const meta = parseFloat(metaStr);
    if (isNaN(meta) || meta <= 0) {
      return fail(400, { error: 'Ingresa un monto válido mayor a 0' });
    }
    
    if (meta > 999999999) {
      return fail(400, { error: 'El monto es demasiado alto' });
    }
    
    try {
      const existing = await prisma.config.findUnique({
        where: { key: 'META_PROYECTO' },
      });
      
      const oldValue = existing?.value || null;
      
      await prisma.config.upsert({
        where: { key: 'META_PROYECTO' },
        update: { value: meta.toString() },
        create: { key: 'META_PROYECTO', value: meta.toString() },
      });
      
      // Audit log
      createAuditLog({
        userId: locals.user.id,
        action: 'UPDATE',
        entity: 'Config',
        entityId: 'META_PROYECTO',
        oldData: oldValue ? { metaProyecto: oldValue } : undefined,
        newData: { metaProyecto: meta },
      }).catch(console.error);
      
      return { success: true, message: 'Meta actualizada correctamente' };
    } catch (e) {
      console.error('Error updating meta:', e);
      return fail(500, { error: 'Error al actualizar la configuración' });
    }
  },
  
  updateNombre: async ({ request, locals }: import('./$types').RequestEvent) => {
    if (locals.user?.role !== 'ADMIN') {
      return fail(403, { error: 'Sin permisos' });
    }
    
    const formData = await request.formData();
    const nombre = (formData.get('nombreProyecto') as string || '').trim();
    
    if (nombre.length < 3) {
      return fail(400, { error: 'El nombre debe tener al menos 3 caracteres' });
    }
    
    if (nombre.length > 100) {
      return fail(400, { error: 'El nombre es demasiado largo' });
    }
    
    try {
      const existing = await prisma.config.findUnique({
        where: { key: 'NOMBRE_PROYECTO' },
      });
      
      const oldValue = existing?.value || null;
      
      await prisma.config.upsert({
        where: { key: 'NOMBRE_PROYECTO' },
        update: { value: nombre },
        create: { key: 'NOMBRE_PROYECTO', value: nombre },
      });
      
      // Audit log
      createAuditLog({
        userId: locals.user.id,
        action: 'UPDATE',
        entity: 'Config',
        entityId: 'NOMBRE_PROYECTO',
        oldData: oldValue ? { nombreProyecto: oldValue } : undefined,
        newData: { nombreProyecto: nombre },
      }).catch(console.error);
      
      return { success: true, message: 'Nombre actualizado correctamente' };
    } catch (e) {
      console.error('Error updating nombre:', e);
      return fail(500, { error: 'Error al actualizar la configuración' });
    }
  },
};
;null as any as Actions;
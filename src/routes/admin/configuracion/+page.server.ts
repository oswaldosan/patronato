import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  // Solo ADMIN puede acceder a configuración
  if (locals.user?.role !== 'ADMIN') {
    throw redirect(302, '/admin');
  }
  
  const [metaConfig, nombreProyecto, inicioConfig] = await Promise.all([
    prisma.config.findUnique({ where: { key: 'META_PROYECTO' } }),
    prisma.config.findUnique({ where: { key: 'NOMBRE_PROYECTO' } }),
    prisma.config.findUnique({ where: { key: 'PROYECTO_INICIO' } }),
  ]);
  
  return {
    config: {
      metaProyecto: metaConfig?.value ? parseFloat(metaConfig.value) : 500000,
      nombreProyecto: nombreProyecto?.value || 'Patronato Pro Mejoramiento de Monterrey',
      proyectoInicio: inicioConfig?.value || null,
    },
  };
};

export const actions: Actions = {
  updateMeta: async ({ request, locals }) => {
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
  
  nuevoProyecto: async ({ request, locals }) => {
    if (locals.user?.role !== 'ADMIN') {
      return fail(403, { error: 'Sin permisos' });
    }

    const formData = await request.formData();
    const nombre = (formData.get('nombreProyecto') as string || '').trim();
    const metaStr = formData.get('metaProyecto') as string;

    if (nombre.length < 3) {
      return fail(400, { error: 'El nombre del nuevo proyecto debe tener al menos 3 caracteres' });
    }

    const meta = parseFloat(metaStr);
    if (isNaN(meta) || meta <= 0) {
      return fail(400, { error: 'Ingresa un monto válido mayor a 0' });
    }

    try {
      const oldNombre = await prisma.config.findUnique({ where: { key: 'NOMBRE_PROYECTO' } });
      const oldMeta = await prisma.config.findUnique({ where: { key: 'META_PROYECTO' } });

      const ahora = new Date().toISOString();

      await Promise.all([
        prisma.config.upsert({
          where: { key: 'NOMBRE_PROYECTO' },
          update: { value: nombre },
          create: { key: 'NOMBRE_PROYECTO', value: nombre },
        }),
        prisma.config.upsert({
          where: { key: 'META_PROYECTO' },
          update: { value: meta.toString() },
          create: { key: 'META_PROYECTO', value: meta.toString() },
        }),
        prisma.config.upsert({
          where: { key: 'PROYECTO_INICIO' },
          update: { value: ahora },
          create: { key: 'PROYECTO_INICIO', value: ahora },
        }),
      ]);

      createAuditLog({
        userId: locals.user.id,
        action: 'CREATE',
        entity: 'Config',
        entityId: 'NUEVO_PROYECTO',
        oldData: {
          nombreProyecto: oldNombre?.value,
          metaProyecto: oldMeta?.value,
        },
        newData: {
          nombreProyecto: nombre,
          metaProyecto: meta,
          proyectoInicio: ahora,
        },
      }).catch(console.error);

      return { success: true, message: `Nuevo proyecto "${nombre}" iniciado. El progreso se ha reseteado.` };
    } catch (e) {
      console.error('Error creando nuevo proyecto:', e);
      return fail(500, { error: 'Error al crear el nuevo proyecto' });
    }
  },

  updateNombre: async ({ request, locals }) => {
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

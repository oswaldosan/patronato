// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { aporteSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load = async ({ url }: Parameters<PageServerLoad>[0]) => {
  const donanteId = url.searchParams.get('donante');
  
  const [donantes, rubros] = await Promise.all([
    prisma.donante.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true, nombreNegocio: true, tipo: true },
    }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { orden: 'asc' },
      select: { id: true, nombre: true, color: true },
    }),
  ]);
  
  return {
    donantes,
    rubros,
    preselectedDonante: donanteId,
  };
};

export const actions = {
  default: async ({ request, locals }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    
    const data = {
      donanteId: formData.get('donanteId') as string,
      rubroId: formData.get('rubroId') as string,
      fecha: formData.get('fecha') as string,
      monto: formData.get('monto') as string,
      metodo: formData.get('metodo') as string,
      referencia: formData.get('referencia') as string || null,
      comentario: formData.get('comentario') as string || null,
      estado: formData.get('estado') as string || 'PENDIENTE',
    };
    
    const result = aporteSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, {
        error: message,
        data,
      });
    }
    
    let aporte;
    try {
      aporte = await prisma.aporte.create({
        data: {
          ...result.data,
          monto: result.data.monto,
        },
      });
    } catch (e) {
      console.error('Error creando aporte:', e);
      return fail(500, {
        error: 'Error al crear el aporte',
        data,
      });
    }
    
    // Audit log en background
    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'Aporte',
      entityId: aporte.id,
      newData: data,
    }).catch((err) => console.error('Error en audit log:', err));
    
    redirect(302, `/admin/aportes/${aporte.id}`);
  },
};
;null as any as Actions;
// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { donanteSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
  return {};
};

export const actions = {
  default: async ({ request, locals }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    
    const data = {
      nombre: formData.get('nombre') as string,
      tipo: formData.get('tipo') as string,
      identificacion: formData.get('identificacion') as string,
      nombreNegocio: formData.get('nombreNegocio') as string || null,
      telefono: formData.get('telefono') as string || null,
      email: formData.get('email') as string || null,
      direccion: formData.get('direccion') as string || null,
      notas: formData.get('notas') as string || null,
    };
    
    const result = donanteSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, {
        error: message,
        data,
      });
    }
    
    // Verificar si la identificación ya existe
    const existente = await prisma.donante.findUnique({
      where: { identificacion: result.data.identificacion },
      select: { id: true },
    });

    if (existente) {
      return fail(400, {
        error: 'La identidad / RTN ya está registrada en otro donante',
        data,
      });
    }

    let donante;
    try {
      donante = await prisma.donante.create({
        data: result.data,
      });
    } catch (e) {
      console.error('Error creando donante', e);
      return fail(500, {
        error: 'Error al crear el donante',
        data,
      });
    }
    
    // Audit log en background (no bloquea el redirect)
    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'Donante',
      entityId: donante.id,
      newData: result.data,
    }).catch((err) => console.error('Error en audit log:', err));
    
    redirect(302, `/admin/donantes/${donante.id}`);
  },
};
;null as any as PageServerLoad;;null as any as Actions;
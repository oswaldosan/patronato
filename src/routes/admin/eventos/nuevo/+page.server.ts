import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { eventoSchema } from '$lib/validations';
import { saveUploadedFile } from '$lib/server/uploads';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const data = {
      nombre: (formData.get('nombre') as string)?.trim(),
      descripcion: (formData.get('descripcion') as string)?.trim() || null,
      fecha: formData.get('fecha') as string,
      lugar: (formData.get('lugar') as string)?.trim() || null,
    };

    const result = eventoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, data });
    }

    let foto1: string | null = null;
    const file = formData.get('foto1') as File | null;
    if (file && file.size > 0) {
      try {
        foto1 = await saveUploadedFile(file, 'eventos');
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Error al subir imagen';
        return fail(400, { error: msg, data });
      }
    }

    let evento;
    try {
      evento = await prisma.evento.create({
        data: {
          nombre: result.data.nombre,
          descripcion: result.data.descripcion ?? null,
          fecha: result.data.fecha,
          lugar: result.data.lugar ?? null,
          foto1,
          publicado: false,
        },
      });
    } catch (e) {
      console.error('Error creando evento:', e);
      return fail(500, { error: 'Error al crear el evento', data });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'Evento',
      entityId: evento.id,
      newData: data as unknown as Record<string, unknown>,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, `/admin/eventos/${evento.id}`);
  },
};

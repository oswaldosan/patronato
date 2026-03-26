import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { proyectoSchema } from '$lib/validations';
import { saveUploadedFile } from '$lib/server/uploads';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const metaRaw = formData.get('meta') as string;
    const data = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      fecha: formData.get('fecha') as string,
      gastoTotal: formData.get('gastoTotal') as string,
      meta: metaRaw ? metaRaw : null,
    };

    const result = proyectoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, data });
    }

    const fotos: string[] = [];
    for (let i = 1; i <= 3; i++) {
      const file = formData.get(`foto${i}`) as File | null;
      if (file && file.size > 0) {
        try {
          const url = await saveUploadedFile(file, 'proyectos');
          fotos.push(url);
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Error al subir imagen';
          return fail(400, { error: msg, data });
        }
      }
    }

    let proyecto;
    try {
      proyecto = await prisma.proyecto.create({
        data: {
          titulo: result.data.titulo,
          descripcion: result.data.descripcion,
          fecha: result.data.fecha,
          gastoTotal: result.data.gastoTotal,
          meta: result.data.meta ?? null,
          foto1: fotos[0] || null,
          foto2: fotos[1] || null,
          foto3: fotos[2] || null,
        },
      });
    } catch (e) {
      console.error('Error creando proyecto:', e);
      return fail(500, { error: 'Error al crear el proyecto', data });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'Proyecto',
      entityId: proyecto.id,
      newData: data as unknown as Record<string, unknown>,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, `/admin/proyectos/${proyecto.id}`);
  },
};

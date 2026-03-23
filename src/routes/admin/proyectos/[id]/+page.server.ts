import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { proyectoUpdateSchema } from '$lib/validations';
import { saveUploadedFile, deleteUploadedFile } from '$lib/server/uploads';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const proyecto = await prisma.proyecto.findUnique({
    where: { id: params.id },
  });

  if (!proyecto) {
    throw error(404, 'Proyecto no encontrado');
  }

  return {
    proyecto: {
      id: proyecto.id,
      titulo: proyecto.titulo,
      descripcion: proyecto.descripcion,
      fecha: proyecto.fecha.toISOString().split('T')[0],
      gastoTotal: proyecto.gastoTotal.toNumber(),
      foto1: proyecto.foto1,
      foto2: proyecto.foto2,
      foto3: proyecto.foto3,
      publicado: proyecto.publicado,
      createdAt: proyecto.createdAt.toISOString(),
      updatedAt: proyecto.updatedAt.toISOString(),
    },
  };
};

export const actions: Actions = {
  update: async ({ request, params, locals }) => {
    const formData = await request.formData();

    const data = {
      titulo: formData.get('titulo') as string,
      descripcion: formData.get('descripcion') as string,
      fecha: formData.get('fecha') as string,
      gastoTotal: formData.get('gastoTotal') as string,
    };

    const result = proyectoUpdateSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }

    const oldData = await prisma.proyecto.findUnique({
      where: { id: params.id },
    });

    const fotoUpdates: Record<string, string | null> = {};
    for (let i = 1; i <= 3; i++) {
      const file = formData.get(`foto${i}`) as File | null;
      if (file && file.size > 0) {
        try {
          const oldFoto = oldData?.[`foto${i}` as keyof typeof oldData] as string | null;
          if (oldFoto) {
            await deleteUploadedFile(oldFoto);
          }
          fotoUpdates[`foto${i}`] = await saveUploadedFile(file, 'proyectos');
        } catch (e) {
          const msg = e instanceof Error ? e.message : 'Error al subir imagen';
          return fail(400, { error: msg });
        }
      }

      const removeFoto = formData.get(`removeFoto${i}`);
      if (removeFoto === '1' && !fotoUpdates[`foto${i}`]) {
        const oldFoto = oldData?.[`foto${i}` as keyof typeof oldData] as string | null;
        if (oldFoto) {
          await deleteUploadedFile(oldFoto);
        }
        fotoUpdates[`foto${i}`] = null;
      }
    }

    try {
      await prisma.proyecto.update({
        where: { id: params.id },
        data: {
          ...result.data,
          ...fotoUpdates,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Proyecto',
        entityId: params.id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true };
    } catch (e) {
      console.error('Error actualizando proyecto:', e);
      return fail(500, { error: 'Error al actualizar el proyecto' });
    }
  },

  publish: async ({ params, locals }) => {
    try {
      await prisma.proyecto.update({
        where: { id: params.id },
        data: { publicado: true },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Proyecto',
        entityId: params.id,
        newData: { publicado: true },
      });

      return { success: true, published: true };
    } catch {
      return fail(500, { error: 'Error al publicar el proyecto' });
    }
  },

  unpublish: async ({ params, locals }) => {
    try {
      await prisma.proyecto.update({
        where: { id: params.id },
        data: { publicado: false },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Proyecto',
        entityId: params.id,
        newData: { publicado: false },
      });

      return { success: true, unpublished: true };
    } catch {
      return fail(500, { error: 'Error al despublicar el proyecto' });
    }
  },

  delete: async ({ params, locals }) => {
    const proyecto = await prisma.proyecto.findUnique({
      where: { id: params.id },
    });

    if (proyecto) {
      for (const foto of [proyecto.foto1, proyecto.foto2, proyecto.foto3]) {
        if (foto) await deleteUploadedFile(foto);
      }
    }

    try {
      await prisma.proyecto.delete({
        where: { id: params.id },
      });
    } catch (e) {
      console.error('Error eliminando proyecto:', e);
      return fail(500, { error: 'Error al eliminar el proyecto' });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'Proyecto',
      entityId: params.id,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, '/admin/proyectos');
  },
};

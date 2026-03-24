import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { donacionMaterialUpdateSchema } from '$lib/validations';
import { saveUploadedFile, deleteUploadedFile } from '$lib/server/uploads';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const [donacion, donantes] = await Promise.all([
    prisma.donacionMaterial.findUnique({
      where: { id: params.id },
      include: {
        donante: { select: { id: true, nombre: true, nombreNegocio: true } },
      },
    }),
    prisma.donante.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true, nombreNegocio: true },
    }),
  ]);

  if (!donacion) {
    throw error(404, 'Donación de material no encontrada');
  }

  return {
    donacion: {
      id: donacion.id,
      donanteId: donacion.donanteId,
      descripcion: donacion.descripcion,
      cantidad: donacion.cantidad,
      valorEstimado: donacion.valorEstimado.toNumber(),
      fecha: donacion.fecha.toISOString().split('T')[0],
      estado: donacion.estado,
      notas: donacion.notas,
      evidencia: donacion.evidencia,
      donante: donacion.donante,
      createdAt: donacion.createdAt.toISOString(),
      updatedAt: donacion.updatedAt.toISOString(),
    },
    donantes,
  };
};

export const actions: Actions = {
  update: async ({ request, params }) => {
    const formData = await request.formData();

    const existing = await prisma.donacionMaterial.findUnique({
      where: { id: params.id },
    });
    if (!existing) return fail(404, { error: 'Donación no encontrada' });

    const evidenciaFile = formData.get('evidenciaFile') as File | null;
    let evidenciaUrl: string | null | undefined = undefined;

    if (evidenciaFile && evidenciaFile.size > 0) {
      try {
        evidenciaUrl = await saveUploadedFile(evidenciaFile, 'donaciones-materiales');
        if (existing.evidencia) {
          await deleteUploadedFile(existing.evidencia);
        }
      } catch (e) {
        return fail(400, { error: e instanceof Error ? e.message : 'Error al subir la imagen' });
      }
    }

    const data: Record<string, unknown> = {
      donanteId: formData.get('donanteId') as string,
      descripcion: formData.get('descripcion') as string,
      cantidad: (formData.get('cantidad') as string) || null,
      valorEstimado: formData.get('valorEstimado') as string,
      fecha: formData.get('fecha') as string,
      notas: (formData.get('notas') as string) || null,
      estado: formData.get('estado') as string,
    };

    if (evidenciaUrl !== undefined) {
      data.evidencia = evidenciaUrl;
    }

    const result = donacionMaterialUpdateSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }

    try {
      await prisma.donacionMaterial.update({
        where: { id: params.id },
        data: result.data,
      });

      await createAuditLog({
        action: 'UPDATE',
        entity: 'DonacionMaterial',
        entityId: params.id,
        oldData: existing as unknown as Record<string, unknown>,
        newData: data,
      });

      return { success: true };
    } catch {
      return fail(500, { error: 'Error al actualizar la donación' });
    }
  },

  verify: async ({ params }) => {
    try {
      await prisma.donacionMaterial.update({
        where: { id: params.id },
        data: { estado: 'VERIFICADO' },
      });

      await createAuditLog({
        action: 'UPDATE',
        entity: 'DonacionMaterial',
        entityId: params.id,
        newData: { estado: 'VERIFICADO' },
      });

      return { success: true, verified: true };
    } catch {
      return fail(500, { error: 'Error al verificar la donación' });
    }
  },

  cancel: async ({ params }) => {
    try {
      await prisma.donacionMaterial.update({
        where: { id: params.id },
        data: { estado: 'ANULADO' },
      });

      await createAuditLog({
        action: 'UPDATE',
        entity: 'DonacionMaterial',
        entityId: params.id,
        newData: { estado: 'ANULADO' },
      });

      return { success: true, cancelled: true };
    } catch {
      return fail(500, { error: 'Error al anular la donación' });
    }
  },

  delete: async ({ params, locals }) => {
    const existing = await prisma.donacionMaterial.findUnique({
      where: { id: params.id },
    });

    if (existing?.evidencia) {
      await deleteUploadedFile(existing.evidencia);
    }

    try {
      await prisma.donacionMaterial.delete({
        where: { id: params.id },
      });
    } catch (e) {
      console.error('Error eliminando donación de material:', e);
      return fail(500, { error: 'Error al eliminar la donación' });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'DonacionMaterial',
      entityId: params.id,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, '/admin/donaciones-materiales');
  },
};

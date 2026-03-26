import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const solicitud = await prisma.solicitudDonacion.findUnique({
    where: { id: params.id },
  });

  if (!solicitud) {
    throw error(404, 'Solicitud no encontrada');
  }

  return {
    solicitud: {
      id: solicitud.id,
      nombre: solicitud.nombre,
      identidad: solicitud.identidad,
      telefono: solicitud.telefono,
      monto: solicitud.monto?.toNumber() ?? null,
      comprobante: solicitud.comprobante,
      mensaje: solicitud.mensaje,
      estado: solicitud.estado,
      notasAdmin: solicitud.notasAdmin,
      createdAt: solicitud.createdAt.toISOString(),
      updatedAt: solicitud.updatedAt.toISOString(),
    },
  };
};

export const actions: Actions = {
  approve: async ({ params, request, locals }) => {
    const formData = await request.formData();
    const notas = (formData.get('notasAdmin') as string || '').trim() || null;

    try {
      await prisma.solicitudDonacion.update({
        where: { id: params.id },
        data: { estado: 'APROBADO', notasAdmin: notas },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'SolicitudDonacion',
        entityId: params.id,
        newData: { estado: 'APROBADO', notasAdmin: notas },
      });

      return { success: true, approved: true };
    } catch {
      return fail(500, { error: 'Error al aprobar la solicitud' });
    }
  },

  reject: async ({ params, request, locals }) => {
    const formData = await request.formData();
    const notas = (formData.get('notasAdmin') as string || '').trim() || null;

    try {
      await prisma.solicitudDonacion.update({
        where: { id: params.id },
        data: { estado: 'RECHAZADO', notasAdmin: notas },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'SolicitudDonacion',
        entityId: params.id,
        newData: { estado: 'RECHAZADO', notasAdmin: notas },
      });

      return { success: true, rejected: true };
    } catch {
      return fail(500, { error: 'Error al rechazar la solicitud' });
    }
  },

  delete: async ({ params, locals }) => {
    try {
      await prisma.solicitudDonacion.delete({
        where: { id: params.id },
      });
    } catch {
      return fail(500, { error: 'Error al eliminar la solicitud' });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'SolicitudDonacion',
      entityId: params.id,
    }).catch(console.error);

    redirect(302, '/admin/solicitudes');
  },
};

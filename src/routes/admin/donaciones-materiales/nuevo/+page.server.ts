import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { donacionMaterialSchema } from '$lib/validations';
import { saveUploadedFile } from '$lib/server/uploads';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
  const donanteId = url.searchParams.get('donante');

  const donantes = await prisma.donante.findMany({
    where: { activo: true },
    orderBy: { nombre: 'asc' },
    select: { id: true, nombre: true, nombreNegocio: true, tipo: true },
  });

  return {
    donantes,
    preselectedDonante: donanteId,
  };
};

export const actions: Actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();

    const evidenciaFile = formData.get('evidenciaFile') as File | null;
    let evidenciaUrl: string | null = null;

    if (evidenciaFile && evidenciaFile.size > 0) {
      try {
        evidenciaUrl = await saveUploadedFile(evidenciaFile, 'donaciones-materiales');
      } catch (e) {
        return fail(400, {
          error: e instanceof Error ? e.message : 'Error al subir la imagen',
          data: Object.fromEntries(formData),
        });
      }
    }

    const data = {
      donanteId: formData.get('donanteId') as string,
      descripcion: formData.get('descripcion') as string,
      cantidad: (formData.get('cantidad') as string) || null,
      valorEstimado: formData.get('valorEstimado') as string,
      fecha: formData.get('fecha') as string,
      notas: (formData.get('notas') as string) || null,
      evidencia: evidenciaUrl,
      estado: (formData.get('estado') as string) || 'PENDIENTE',
    };

    const result = donacionMaterialSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, data });
    }

    let donacion;
    try {
      donacion = await prisma.donacionMaterial.create({
        data: result.data,
      });
    } catch (e) {
      console.error('Error creando donación de material:', e);
      return fail(500, { error: 'Error al crear la donación de material', data });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'DonacionMaterial',
      entityId: donacion.id,
      newData: data as unknown as Record<string, unknown>,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, `/admin/donaciones-materiales/${donacion.id}`);
  },
};

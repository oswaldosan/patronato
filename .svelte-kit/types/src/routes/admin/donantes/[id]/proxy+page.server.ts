// @ts-nocheck
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { donanteUpdateSchema } from '$lib/validations';
import type { Aporte, Donante } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

type DonanteWithAportes = Donante & {
  aportes: Array<
    (Aporte & {
      rubro: { nombre: string; color: string };
    })
  >;
};

export const load = async ({ params }: Parameters<PageServerLoad>[0]) => {
  const donante = await prisma.donante.findUnique({
    where: { id: params.id },
    include: {
      aportes: {
        include: {
          rubro: { select: { nombre: true, color: true } },
        },
        orderBy: { fecha: 'desc' },
      },
    },
  }) as DonanteWithAportes | null;
  
  if (!donante) {
    throw error(404, 'Donante no encontrado');
  }
  
  return {
    donante: {
      id: donante.id,
      nombre: donante.nombre,
      tipo: donante.tipo,
      identificacion: donante.identificacion,
      nombreNegocio: donante.nombreNegocio,
      telefono: donante.telefono,
      email: donante.email,
      direccion: donante.direccion,
      notas: donante.notas,
      activo: donante.activo,
      createdAt: donante.createdAt.toISOString(),
    },
    aportes: donante.aportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      metodo: a.metodo,
      estado: a.estado,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
    })),
    totalDonado: donante.aportes
      .filter((a) => a.estado === 'VERIFICADO')
      .reduce((sum, a) => sum + a.monto.toNumber(), 0),
  };
};

export const actions = {
  update: async ({ request, params, locals }: import('./$types').RequestEvent) => {
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
      activo: formData.get('activo') === 'on',
    };
    
    const result = donanteUpdateSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }

    // Verificar si la identificación ya existe en OTRO donante
    const existente = await prisma.donante.findUnique({
      where: { identificacion: result.data.identificacion },
      select: { id: true },
    });

    if (existente && existente.id !== params.id) {
      return fail(400, { error: 'La identidad / RTN ya está registrada en otro donante' });
    }
    
    const oldData = await prisma.donante.findUnique({
      where: { id: params.id },
    });
    
    try {
      await prisma.donante.update({
        where: { id: params.id },
        data: { ...result.data, activo: data.activo },
      });
      
      // Audit log en background
      createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Donante',
        entityId: params.id,
        oldData: oldData as Record<string, unknown>,
        newData: data,
      }).catch((err) => console.error('Error en audit log:', err));
      
      return { success: true };
    } catch (e) {
      console.error('Error al actualizar donante', e);
      return fail(500, { error: 'Error al actualizar el donante' });
    }
  },
  
  delete: async ({ params, locals }: import('./$types').RequestEvent) => {
    // Verificar si tiene aportes
    const aportesCount = await prisma.aporte.count({
      where: { donanteId: params.id },
    });
    
    if (aportesCount > 0) {
      return fail(400, { 
        error: 'No se puede eliminar un donante con aportes. Desactívalo en su lugar.' 
      });
    }
    
    try {
      await prisma.donante.delete({
        where: { id: params.id },
      });
      
      // Audit log en background (no bloquea el redirect)
      createAuditLog({
        userId: locals.user?.id,
        action: 'DELETE',
        entity: 'Donante',
        entityId: params.id,
      }).catch((err) => console.error('Error en audit log:', err));
      
    } catch (e) {
      console.error('Error al eliminar donante', e);
      return fail(500, { error: 'Error al eliminar el donante' });
    }

    // Redirect FUERA del try-catch para que no sea capturado
    return redirect(302, '/admin/donantes');
  },
};
;null as any as Actions;
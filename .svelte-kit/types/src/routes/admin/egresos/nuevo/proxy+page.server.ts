// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { egresoSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load = async () => {
  const [rubros, proveedores] = await Promise.all([
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    }),
    prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: 'asc' },
      select: { id: true, nombre: true },
    }),
  ]);

  return { rubros, proveedores };
};

export const actions = {
  default: async ({ request, locals }: import('./$types').RequestEvent) => {
    const formData = await request.formData();
    
    const data = {
      fecha: formData.get('fecha') as string,
      monto: formData.get('monto') as string,
      concepto: formData.get('concepto') as string,
      rubroId: formData.get('rubroId') as string,
      proveedorId: (formData.get('proveedorId') as string) || null,
      referencia: formData.get('referencia') as string || null,
      notas: formData.get('notas') as string || null,
      estado: formData.get('estado') as string || 'PENDIENTE',
    };
    
    const result = egresoSchema.safeParse(data);
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, {
        error: message,
        data,
      });
    }
    
    let egreso;
    try {
      egreso = await prisma.egreso.create({
        data: result.data,
      });
    } catch (e) {
      console.error('Error creando egreso:', e);
      return fail(500, {
        error: 'Error al crear el egreso',
        data,
      });
    }
    
    // Audit log en background
    createAuditLog({
      userId: locals.user?.id,
      action: 'CREATE',
      entity: 'Egreso',
      entityId: egreso.id,
      newData: data,
    }).catch((err) => console.error('Error en audit log:', err));
    
    redirect(302, `/admin/egresos/${egreso.id}`);
  },
};
;null as any as PageServerLoad;;null as any as Actions;
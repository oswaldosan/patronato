import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { createAuditLog } from '$lib/server/audit';
import { eventoUpdateSchema, ingresoEventoSchema, gastoEventoSchema } from '$lib/validations';
import { saveUploadedFile, deleteUploadedFile } from '$lib/server/uploads';
import { parseExcelFile } from '$lib/server/excel';
import { Prisma } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const [evento, proveedores] = await Promise.all([
    prisma.evento.findUnique({
      where: { id: params.id },
      include: {
        ingresos: { orderBy: { fecha: 'desc' } },
        gastos: {
          include: { proveedor: { select: { nombre: true } } },
          orderBy: { fecha: 'desc' },
        },
      },
    }),
    prisma.proveedor.findMany({
      where: { activo: true },
      select: { id: true, nombre: true },
      orderBy: { nombre: 'asc' },
    }),
  ]);

  if (!evento) {
    throw error(404, 'Evento no encontrado');
  }

  const totalIngresos = evento.ingresos.reduce((sum, i) => sum + i.monto.toNumber(), 0);
  const totalGastos = evento.gastos.reduce((sum, g) => sum + g.monto.toNumber(), 0);

  return {
    evento: {
      id: evento.id,
      nombre: evento.nombre,
      descripcion: evento.descripcion,
      fecha: evento.fecha.toISOString().split('T')[0],
      lugar: evento.lugar,
      foto1: evento.foto1,
      excelNombre: evento.excelNombre,
      excelActualizado: evento.excelActualizado?.toISOString() ?? null,
      publicado: evento.publicado,
      activo: evento.activo,
      createdAt: evento.createdAt.toISOString(),
      updatedAt: evento.updatedAt.toISOString(),
    },
    ingresos: evento.ingresos.map((i) => ({
      id: i.id,
      concepto: i.concepto,
      monto: i.monto.toNumber(),
      metodoPago: i.metodoPago,
      fecha: i.fecha.toISOString().split('T')[0],
      notas: i.notas,
    })),
    gastos: evento.gastos.map((g) => ({
      id: g.id,
      concepto: g.concepto,
      monto: g.monto.toNumber(),
      proveedorId: g.proveedorId,
      proveedorNombre: g.proveedor?.nombre ?? null,
      fecha: g.fecha.toISOString().split('T')[0],
      notas: g.notas,
    })),
    proveedores,
    financiero: {
      totalIngresos,
      totalGastos,
      balance: totalIngresos - totalGastos,
    },
  };
};

function parseIngresoForm(formData: FormData) {
  return {
    concepto: (formData.get('concepto') as string)?.trim(),
    monto: formData.get('monto') as string,
    metodoPago: formData.get('metodoPago') as string,
    fecha: formData.get('fecha') as string,
    notas: (formData.get('notas') as string)?.trim() || null,
  };
}

function parseGastoForm(formData: FormData) {
  return {
    concepto: (formData.get('concepto') as string)?.trim(),
    monto: formData.get('monto') as string,
    proveedorId: (formData.get('proveedorId') as string) || null,
    fecha: formData.get('fecha') as string,
    notas: (formData.get('notas') as string)?.trim() || null,
  };
}

export const actions: Actions = {
  update: async ({ request, params, locals }) => {
    const formData = await request.formData();

    const data = {
      nombre: (formData.get('nombre') as string)?.trim(),
      descripcion: (formData.get('descripcion') as string)?.trim() || null,
      fecha: formData.get('fecha') as string,
      lugar: (formData.get('lugar') as string)?.trim() || null,
    };

    const result = eventoUpdateSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message });
    }

    const oldData = await prisma.evento.findUnique({
      where: { id: params.id },
    });

    const fotoUpdates: Record<string, string | null> = {};
    const file = formData.get('foto1') as File | null;
    if (file && file.size > 0) {
      try {
        if (oldData?.foto1) {
          await deleteUploadedFile(oldData.foto1);
        }
        fotoUpdates.foto1 = await saveUploadedFile(file, 'eventos');
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Error al subir imagen';
        return fail(400, { error: msg });
      }
    }

    if (formData.get('removeFoto1') === '1' && !fotoUpdates.foto1) {
      if (oldData?.foto1) {
        await deleteUploadedFile(oldData.foto1);
      }
      fotoUpdates.foto1 = null;
    }

    try {
      await prisma.evento.update({
        where: { id: params.id },
        data: {
          ...result.data,
          ...fotoUpdates,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Evento',
        entityId: params.id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true };
    } catch (e) {
      console.error('Error actualizando evento:', e);
      return fail(500, { error: 'Error al actualizar el evento' });
    }
  },

  publish: async ({ params, locals }) => {
    try {
      await prisma.evento.update({
        where: { id: params.id },
        data: { publicado: true },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Evento',
        entityId: params.id,
        newData: { publicado: true },
      });

      return { success: true, published: true };
    } catch {
      return fail(500, { error: 'Error al publicar el evento' });
    }
  },

  unpublish: async ({ params, locals }) => {
    try {
      await prisma.evento.update({
        where: { id: params.id },
        data: { publicado: false },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Evento',
        entityId: params.id,
        newData: { publicado: false },
      });

      return { success: true, unpublished: true };
    } catch {
      return fail(500, { error: 'Error al despublicar el evento' });
    }
  },

  delete: async ({ params, locals }) => {
    const evento = await prisma.evento.findUnique({
      where: { id: params.id },
    });

    if (!evento) {
      return fail(404, { error: 'Evento no encontrado' });
    }

    if (evento.foto1) {
      await deleteUploadedFile(evento.foto1);
    }

    try {
      await prisma.$transaction([
        prisma.ingresoEvento.deleteMany({ where: { eventoId: params.id } }),
        prisma.gastoEvento.deleteMany({ where: { eventoId: params.id } }),
        prisma.evento.delete({ where: { id: params.id } }),
      ]);
    } catch (e) {
      console.error('Error eliminando evento:', e);
      return fail(500, { error: 'Error al eliminar el evento' });
    }

    createAuditLog({
      userId: locals.user?.id,
      action: 'DELETE',
      entity: 'Evento',
      entityId: params.id,
      oldData: evento as unknown as Record<string, unknown>,
    }).catch((err) => console.error('Error en audit log:', err));

    redirect(302, '/admin/eventos');
  },

  subirExcel: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const file = formData.get('excel') as File | null;

    if (!file || file.size === 0) {
      return fail(400, { error: 'Selecciona un archivo Excel', action: 'subirExcel' });
    }

    let parsed;
    try {
      parsed = await parseExcelFile(file);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Error al procesar el archivo Excel';
      return fail(400, { error: msg, action: 'subirExcel' });
    }

    try {
      await prisma.evento.update({
        where: { id: params.id },
        data: {
          excelNombre: file.name,
          excelData: parsed as unknown as Prisma.InputJsonValue,
          excelActualizado: new Date(),
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Evento',
        entityId: params.id,
        newData: { excelNombre: file.name, hojas: parsed.sheets.length },
      });

      return { success: true, action: 'subirExcel' };
    } catch (e) {
      console.error('Error subiendo excel de evento:', e);
      return fail(500, { error: 'Error al guardar el archivo Excel', action: 'subirExcel' });
    }
  },

  eliminarExcel: async ({ params, locals }) => {
    const oldData = await prisma.evento.findUnique({
      where: { id: params.id },
      select: { excelNombre: true },
    });

    if (!oldData?.excelNombre) {
      return fail(404, { error: 'El evento no tiene Excel cargado', action: 'eliminarExcel' });
    }

    try {
      await prisma.evento.update({
        where: { id: params.id },
        data: {
          excelNombre: null,
          excelData: Prisma.DbNull,
          excelActualizado: null,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'Evento',
        entityId: params.id,
        oldData: { excelNombre: oldData.excelNombre },
        newData: { excelNombre: null },
      });

      return { success: true, action: 'eliminarExcel' };
    } catch (e) {
      console.error('Error eliminando excel de evento:', e);
      return fail(500, { error: 'Error al eliminar el archivo Excel', action: 'eliminarExcel' });
    }
  },

  createIngreso: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const data = parseIngresoForm(formData);

    const result = ingresoEventoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'createIngreso' });
    }

    try {
      const ingreso = await prisma.ingresoEvento.create({
        data: {
          eventoId: params.id,
          concepto: result.data.concepto,
          monto: result.data.monto,
          metodoPago: result.data.metodoPago,
          fecha: result.data.fecha,
          notas: result.data.notas ?? null,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'CREATE',
        entity: 'IngresoEvento',
        entityId: ingreso.id,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'createIngreso' };
    } catch (e) {
      console.error('Error creando ingreso de evento:', e);
      return fail(500, { error: 'Error al registrar el ingreso', action: 'createIngreso' });
    }
  },

  updateIngreso: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const data = parseIngresoForm(formData);

    const result = ingresoEventoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'updateIngreso' });
    }

    const oldData = await prisma.ingresoEvento.findFirst({
      where: { id, eventoId: params.id },
    });

    if (!oldData) {
      return fail(404, { error: 'Ingreso no encontrado', action: 'updateIngreso' });
    }

    try {
      await prisma.ingresoEvento.update({
        where: { id },
        data: {
          concepto: result.data.concepto,
          monto: result.data.monto,
          metodoPago: result.data.metodoPago,
          fecha: result.data.fecha,
          notas: result.data.notas ?? null,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'IngresoEvento',
        entityId: id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'updateIngreso' };
    } catch (e) {
      console.error('Error actualizando ingreso de evento:', e);
      return fail(500, { error: 'Error al actualizar el ingreso', action: 'updateIngreso' });
    }
  },

  deleteIngreso: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const oldData = await prisma.ingresoEvento.findFirst({
      where: { id, eventoId: params.id },
    });

    if (!oldData) {
      return fail(404, { error: 'Ingreso no encontrado', action: 'deleteIngreso' });
    }

    try {
      await prisma.ingresoEvento.delete({ where: { id } });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'DELETE',
        entity: 'IngresoEvento',
        entityId: id,
        oldData: oldData as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'deleteIngreso' };
    } catch (e) {
      console.error('Error eliminando ingreso de evento:', e);
      return fail(500, { error: 'Error al eliminar el ingreso', action: 'deleteIngreso' });
    }
  },

  createGasto: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const data = parseGastoForm(formData);

    const result = gastoEventoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'createGasto' });
    }

    try {
      const gasto = await prisma.gastoEvento.create({
        data: {
          eventoId: params.id,
          concepto: result.data.concepto,
          monto: result.data.monto,
          proveedorId: result.data.proveedorId ?? null,
          fecha: result.data.fecha,
          notas: result.data.notas ?? null,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'CREATE',
        entity: 'GastoEvento',
        entityId: gasto.id,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'createGasto' };
    } catch (e) {
      console.error('Error creando gasto de evento:', e);
      return fail(500, { error: 'Error al registrar el gasto', action: 'createGasto' });
    }
  },

  updateGasto: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;
    const data = parseGastoForm(formData);

    const result = gastoEventoSchema.safeParse(data);

    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, { error: message, action: 'updateGasto' });
    }

    const oldData = await prisma.gastoEvento.findFirst({
      where: { id, eventoId: params.id },
    });

    if (!oldData) {
      return fail(404, { error: 'Gasto no encontrado', action: 'updateGasto' });
    }

    try {
      await prisma.gastoEvento.update({
        where: { id },
        data: {
          concepto: result.data.concepto,
          monto: result.data.monto,
          proveedorId: result.data.proveedorId ?? null,
          fecha: result.data.fecha,
          notas: result.data.notas ?? null,
        },
      });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'UPDATE',
        entity: 'GastoEvento',
        entityId: id,
        oldData: oldData as unknown as Record<string, unknown>,
        newData: data as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'updateGasto' };
    } catch (e) {
      console.error('Error actualizando gasto de evento:', e);
      return fail(500, { error: 'Error al actualizar el gasto', action: 'updateGasto' });
    }
  },

  deleteGasto: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const id = formData.get('id') as string;

    const oldData = await prisma.gastoEvento.findFirst({
      where: { id, eventoId: params.id },
    });

    if (!oldData) {
      return fail(404, { error: 'Gasto no encontrado', action: 'deleteGasto' });
    }

    try {
      await prisma.gastoEvento.delete({ where: { id } });

      await createAuditLog({
        userId: locals.user?.id,
        action: 'DELETE',
        entity: 'GastoEvento',
        entityId: id,
        oldData: oldData as unknown as Record<string, unknown>,
      });

      return { success: true, action: 'deleteGasto' };
    } catch (e) {
      console.error('Error eliminando gasto de evento:', e);
      return fail(500, { error: 'Error al eliminar el gasto', action: 'deleteGasto' });
    }
  },
};

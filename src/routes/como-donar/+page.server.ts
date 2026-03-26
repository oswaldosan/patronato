import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/db';
import { saveUploadedFile } from '$lib/server/uploads';
import type { Actions } from './$types';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();

    const nombre = (formData.get('nombre') as string || '').trim();
    const identidad = (formData.get('identidad') as string || '').trim();
    const telefono = (formData.get('telefono') as string || '').trim();
    const montoStr = formData.get('monto') as string;
    const mensaje = (formData.get('mensaje') as string || '').trim() || null;
    const file = formData.get('comprobante') as File | null;

    if (nombre.length < 2) {
      return fail(400, { error: 'Ingresa tu nombre completo', data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
    }

    if (identidad.length < 5) {
      return fail(400, { error: 'Ingresa un número de identidad válido', data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
    }

    if (telefono.length < 8) {
      return fail(400, { error: 'Ingresa un número de teléfono válido', data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
    }

    const monto = montoStr ? parseFloat(montoStr) : null;
    if (monto !== null && (isNaN(monto) || monto <= 0)) {
      return fail(400, { error: 'Ingresa un monto válido', data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
    }

    let comprobantePath: string | null = null;
    if (file && file.size > 0) {
      try {
        comprobantePath = await saveUploadedFile(file, 'comprobantes');
      } catch (e) {
        const msg = e instanceof Error ? e.message : 'Error al subir el comprobante';
        return fail(400, { error: msg, data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
      }
    }

    try {
      await prisma.solicitudDonacion.create({
        data: {
          nombre,
          identidad,
          telefono,
          monto,
          comprobante: comprobantePath,
          mensaje,
        },
      });

      return { success: true };
    } catch (e) {
      console.error('Error creando solicitud:', e);
      return fail(500, { error: 'Error al enviar la solicitud. Intenta de nuevo.', data: { nombre, identidad, telefono, monto: montoStr, mensaje } });
    }
  },
};

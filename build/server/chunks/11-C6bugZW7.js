import { f as fail, r as redirect, e as error } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { d as donanteUpdateSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async ({ params }) => {
  const donante = await prisma.donante.findUnique({
    where: { id: params.id },
    include: {
      aportes: {
        include: {
          rubro: { select: { nombre: true, color: true } }
        },
        orderBy: { fecha: "desc" }
      }
    }
  });
  if (!donante) {
    throw error(404, "Donante no encontrado");
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
      createdAt: donante.createdAt.toISOString()
    },
    aportes: donante.aportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      metodo: a.metodo,
      estado: a.estado,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color
    })),
    totalDonado: donante.aportes.filter((a) => a.estado === "VERIFICADO").reduce((sum, a) => sum + a.monto.toNumber(), 0)
  };
};
const actions = {
  update: async ({ request, params, locals }) => {
    const formData = await request.formData();
    const data = {
      nombre: formData.get("nombre"),
      tipo: formData.get("tipo"),
      identificacion: formData.get("identificacion"),
      nombreNegocio: formData.get("nombreNegocio") || null,
      telefono: formData.get("telefono") || null,
      email: formData.get("email") || null,
      direccion: formData.get("direccion") || null,
      notas: formData.get("notas") || null,
      activo: formData.get("activo") === "on"
    };
    const result = donanteUpdateSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, { error: message });
    }
    const existente = await prisma.donante.findUnique({
      where: { identificacion: result.data.identificacion },
      select: { id: true }
    });
    if (existente && existente.id !== params.id) {
      return fail(400, { error: "La identidad / RTN ya está registrada en otro donante" });
    }
    const oldData = await prisma.donante.findUnique({
      where: { id: params.id }
    });
    try {
      await prisma.donante.update({
        where: { id: params.id },
        data: { ...result.data, activo: data.activo }
      });
      createAuditLog({
        userId: locals.user?.id,
        action: "UPDATE",
        entity: "Donante",
        entityId: params.id,
        oldData,
        newData: data
      }).catch((err) => console.error("Error en audit log:", err));
      return { success: true };
    } catch (e) {
      console.error("Error al actualizar donante", e);
      return fail(500, { error: "Error al actualizar el donante" });
    }
  },
  delete: async ({ params, locals }) => {
    const aportesCount = await prisma.aporte.count({
      where: { donanteId: params.id }
    });
    if (aportesCount > 0) {
      return fail(400, {
        error: "No se puede eliminar un donante con aportes. Desactívalo en su lugar."
      });
    }
    try {
      await prisma.donante.delete({
        where: { id: params.id }
      });
      createAuditLog({
        userId: locals.user?.id,
        action: "DELETE",
        entity: "Donante",
        entityId: params.id
      }).catch((err) => console.error("Error en audit log:", err));
    } catch (e) {
      console.error("Error al eliminar donante", e);
      return fail(500, { error: "Error al eliminar el donante" });
    }
    return redirect(302, "/admin/donantes");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 11;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B02FSxqU.js')).default;
const server_id = "src/routes/admin/donantes/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/11.B_OIzum_.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=11-C6bugZW7.js.map

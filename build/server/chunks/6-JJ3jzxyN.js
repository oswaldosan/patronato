import { f as fail, r as redirect, e as error } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { a as aporteUpdateSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async ({ params }) => {
  const [aporte, donantes, rubros] = await Promise.all([
    prisma.aporte.findUnique({
      where: { id: params.id },
      include: {
        donante: { select: { id: true, nombre: true, nombreNegocio: true } },
        rubro: { select: { id: true, nombre: true, color: true } }
      }
    }),
    prisma.donante.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true, nombreNegocio: true }
    }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { orden: "asc" },
      select: { id: true, nombre: true }
    })
  ]);
  if (!aporte) {
    throw error(404, "Aporte no encontrado");
  }
  return {
    aporte: {
      id: aporte.id,
      donanteId: aporte.donanteId,
      rubroId: aporte.rubroId,
      fecha: aporte.fecha.toISOString().split("T")[0],
      monto: aporte.monto.toNumber(),
      metodo: aporte.metodo,
      referencia: aporte.referencia,
      comentario: aporte.comentario,
      estado: aporte.estado,
      donante: aporte.donante,
      rubro: aporte.rubro,
      createdAt: aporte.createdAt.toISOString(),
      updatedAt: aporte.updatedAt.toISOString()
    },
    donantes,
    rubros
  };
};
const actions = {
  update: async ({ request, params }) => {
    const formData = await request.formData();
    const data = {
      donanteId: formData.get("donanteId"),
      rubroId: formData.get("rubroId"),
      fecha: formData.get("fecha"),
      monto: formData.get("monto"),
      metodo: formData.get("metodo"),
      referencia: formData.get("referencia") || null,
      comentario: formData.get("comentario") || null,
      estado: formData.get("estado")
    };
    const result = aporteUpdateSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, { error: message });
    }
    const oldData = await prisma.aporte.findUnique({
      where: { id: params.id }
    });
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: result.data
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Aporte",
        entityId: params.id,
        oldData,
        newData: data
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Error al actualizar el aporte" });
    }
  },
  verify: async ({ params }) => {
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: { estado: "VERIFICADO" }
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Aporte",
        entityId: params.id,
        newData: { estado: "VERIFICADO" }
      });
      return { success: true, verified: true };
    } catch (e) {
      return fail(500, { error: "Error al verificar el aporte" });
    }
  },
  cancel: async ({ params }) => {
    try {
      await prisma.aporte.update({
        where: { id: params.id },
        data: { estado: "ANULADO" }
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Aporte",
        entityId: params.id,
        newData: { estado: "ANULADO" }
      });
      return { success: true, cancelled: true };
    } catch (e) {
      return fail(500, { error: "Error al anular el aporte" });
    }
  },
  delete: async ({ params, locals }) => {
    try {
      await prisma.aporte.delete({
        where: { id: params.id }
      });
    } catch (e) {
      console.error("Error eliminando aporte:", e);
      return fail(500, { error: "Error al eliminar el aporte" });
    }
    createAuditLog({
      userId: locals.user?.id,
      action: "DELETE",
      entity: "Aporte",
      entityId: params.id
    }).catch((err) => console.error("Error en audit log:", err));
    redirect(302, "/admin/aportes");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 6;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CP8V9jMG.js')).default;
const server_id = "src/routes/admin/aportes/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/6.D22CHGwO.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/DwYBmEoc.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=6-JJ3jzxyN.js.map

import { f as fail } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { r as rubroSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async () => {
  const rubros = await prisma.rubro.findMany({
    include: {
      _count: {
        select: { aportes: true }
      },
      aportes: {
        where: { estado: "VERIFICADO" },
        select: { monto: true }
      }
    },
    orderBy: { orden: "asc" }
  });
  return {
    rubros: rubros.map((r) => ({
      id: r.id,
      nombre: r.nombre,
      descripcion: r.descripcion,
      color: r.color,
      icono: r.icono,
      orden: r.orden,
      activo: r.activo,
      totalAportes: r._count.aportes,
      totalRecaudado: r.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0)
    }))
  };
};
const actions = {
  create: async ({ request }) => {
    const formData = await request.formData();
    const data = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion") || null,
      color: formData.get("color") || "#22c55e",
      icono: formData.get("icono") || null,
      orden: parseInt(formData.get("orden")) || 0
    };
    const result = rubroSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, { error: message, action: "create" });
    }
    try {
      const rubro = await prisma.rubro.create({
        data: result.data
      });
      await createAuditLog({
        action: "CREATE",
        entity: "Rubro",
        entityId: rubro.id,
        newData: result.data
      });
      return { success: true, action: "create" };
    } catch (e) {
      if (e && typeof e === "object" && "code" in e && e.code === "P2002") {
        return fail(400, { error: "Ya existe un rubro con ese nombre", action: "create" });
      }
      return fail(500, { error: "Error al crear el rubro", action: "create" });
    }
  },
  update: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const data = {
      nombre: formData.get("nombre"),
      descripcion: formData.get("descripcion") || null,
      color: formData.get("color") || "#22c55e",
      icono: formData.get("icono") || null,
      orden: parseInt(formData.get("orden")) || 0,
      activo: formData.get("activo") === "on"
    };
    const result = rubroSchema.partial().safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, { error: message, action: "update" });
    }
    try {
      await prisma.rubro.update({
        where: { id },
        data: { ...result.data, activo: data.activo }
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Rubro",
        entityId: id,
        newData: data
      });
      return { success: true, action: "update" };
    } catch (e) {
      return fail(500, { error: "Error al actualizar el rubro", action: "update" });
    }
  },
  delete: async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    const aportesCount = await prisma.aporte.count({
      where: { rubroId: id }
    });
    if (aportesCount > 0) {
      return fail(400, {
        error: "No se puede eliminar un rubro con aportes. Desactívalo en su lugar.",
        action: "delete"
      });
    }
    try {
      await prisma.rubro.delete({
        where: { id }
      });
      await createAuditLog({
        action: "DELETE",
        entity: "Rubro",
        entityId: id
      });
      return { success: true, action: "delete" };
    } catch (e) {
      return fail(500, { error: "Error al eliminar el rubro", action: "delete" });
    }
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 19;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-mSdbA7OX.js')).default;
const server_id = "src/routes/admin/rubros/+page.server.ts";
const imports = ["_app/immutable/nodes/19.oGxEmb5M.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=19-BhQjmLWW.js.map

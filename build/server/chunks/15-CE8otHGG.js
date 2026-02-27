import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { f as egresoSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async () => {
  const [rubros, proveedores] = await Promise.all([
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true }
    }),
    prisma.proveedor.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true }
    })
  ]);
  return { rubros, proveedores };
};
const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      fecha: formData.get("fecha"),
      monto: formData.get("monto"),
      concepto: formData.get("concepto"),
      rubroId: formData.get("rubroId"),
      proveedorId: formData.get("proveedorId") || null,
      referencia: formData.get("referencia") || null,
      notas: formData.get("notas") || null,
      estado: formData.get("estado") || "PENDIENTE"
    };
    const result = egresoSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, {
        error: message,
        data
      });
    }
    let egreso;
    try {
      egreso = await prisma.egreso.create({
        data: result.data
      });
    } catch (e) {
      console.error("Error creando egreso:", e);
      return fail(500, {
        error: "Error al crear el egreso",
        data
      });
    }
    createAuditLog({
      userId: locals.user?.id,
      action: "CREATE",
      entity: "Egreso",
      entityId: egreso.id,
      newData: data
    }).catch((err) => console.error("Error en audit log:", err));
    redirect(302, `/admin/egresos/${egreso.id}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 15;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CiB7VcRM.js')).default;
const server_id = "src/routes/admin/egresos/nuevo/+page.server.ts";
const imports = ["_app/immutable/nodes/15.CafG25Qg.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/DwYBmEoc.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=15-CE8otHGG.js.map

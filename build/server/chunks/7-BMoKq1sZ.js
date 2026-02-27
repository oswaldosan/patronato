import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { b as aporteSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async ({ url }) => {
  const donanteId = url.searchParams.get("donante");
  const [donantes, rubros] = await Promise.all([
    prisma.donante.findMany({
      where: { activo: true },
      orderBy: { nombre: "asc" },
      select: { id: true, nombre: true, nombreNegocio: true, tipo: true }
    }),
    prisma.rubro.findMany({
      where: { activo: true },
      orderBy: { orden: "asc" },
      select: { id: true, nombre: true, color: true }
    })
  ]);
  return {
    donantes,
    rubros,
    preselectedDonante: donanteId
  };
};
const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      donanteId: formData.get("donanteId"),
      rubroId: formData.get("rubroId"),
      fecha: formData.get("fecha"),
      monto: formData.get("monto"),
      metodo: formData.get("metodo"),
      referencia: formData.get("referencia") || null,
      comentario: formData.get("comentario") || null,
      estado: formData.get("estado") || "PENDIENTE"
    };
    const result = aporteSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, {
        error: message,
        data
      });
    }
    let aporte;
    try {
      aporte = await prisma.aporte.create({
        data: {
          ...result.data,
          monto: result.data.monto
        }
      });
    } catch (e) {
      console.error("Error creando aporte:", e);
      return fail(500, {
        error: "Error al crear el aporte",
        data
      });
    }
    createAuditLog({
      userId: locals.user?.id,
      action: "CREATE",
      entity: "Aporte",
      entityId: aporte.id,
      newData: data
    }).catch((err) => console.error("Error en audit log:", err));
    redirect(302, `/admin/aportes/${aporte.id}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-D_DdLbij.js')).default;
const server_id = "src/routes/admin/aportes/nuevo/+page.server.ts";
const imports = ["_app/immutable/nodes/7.BH14eh6z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/XiZwx-Ce.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-BMoKq1sZ.js.map

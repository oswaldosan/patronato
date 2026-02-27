import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { p as prisma } from './db-6tYg_p_L.js';
import { c as createAuditLog } from './audit-a--Lpqbs.js';
import { c as donanteSchema } from './validations-DjlCDxJA.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async () => {
  return {};
};
const actions = {
  default: async ({ request, locals }) => {
    const formData = await request.formData();
    const data = {
      nombre: formData.get("nombre"),
      tipo: formData.get("tipo"),
      identificacion: formData.get("identificacion"),
      nombreNegocio: formData.get("nombreNegocio") || null,
      telefono: formData.get("telefono") || null,
      email: formData.get("email") || null,
      direccion: formData.get("direccion") || null,
      notas: formData.get("notas") || null
    };
    const result = donanteSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, {
        error: message,
        data
      });
    }
    const existente = await prisma.donante.findUnique({
      where: { identificacion: result.data.identificacion },
      select: { id: true }
    });
    if (existente) {
      return fail(400, {
        error: "La identidad / RTN ya está registrada en otro donante",
        data
      });
    }
    let donante;
    try {
      donante = await prisma.donante.create({
        data: result.data
      });
    } catch (e) {
      console.error("Error creando donante", e);
      return fail(500, {
        error: "Error al crear el donante",
        data
      });
    }
    createAuditLog({
      userId: locals.user?.id,
      action: "CREATE",
      entity: "Donante",
      entityId: donante.id,
      newData: result.data
    }).catch((err) => console.error("Error en audit log:", err));
    redirect(302, `/admin/donantes/${donante.id}`);
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 12;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BWcjqR9m.js')).default;
const server_id = "src/routes/admin/donantes/nuevo/+page.server.ts";
const imports = ["_app/immutable/nodes/12.BngViccA.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/XiZwx-Ce.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=12-HsDHZuMl.js.map

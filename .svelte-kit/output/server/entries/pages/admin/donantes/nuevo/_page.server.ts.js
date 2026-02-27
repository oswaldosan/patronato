import { fail, redirect } from "@sveltejs/kit";
import { p as prisma } from "../../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../../chunks/audit.js";
import { c as donanteSchema } from "../../../../../chunks/validations.js";
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
export {
  actions,
  load
};

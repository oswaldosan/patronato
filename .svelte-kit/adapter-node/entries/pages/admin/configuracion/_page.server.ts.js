import { fail, redirect } from "@sveltejs/kit";
import { p as prisma } from "../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../chunks/audit.js";
const load = async ({ locals }) => {
  if (locals.user?.role !== "ADMIN") {
    throw redirect(302, "/admin");
  }
  const metaConfig = await prisma.config.findFirst({
    where: { key: "META_PROYECTO" }
  });
  const nombreProyecto = await prisma.config.findFirst({
    where: { key: "NOMBRE_PROYECTO" }
  });
  return {
    config: {
      metaProyecto: metaConfig?.value ? parseFloat(metaConfig.value) : 5e5,
      nombreProyecto: nombreProyecto?.value || "Patronato de Monterrey – Comité de Desarrollo"
    }
  };
};
const actions = {
  updateMeta: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      return fail(403, { error: "Sin permisos" });
    }
    const formData = await request.formData();
    const metaStr = formData.get("metaProyecto");
    const meta = parseFloat(metaStr);
    if (isNaN(meta) || meta <= 0) {
      return fail(400, { error: "Ingresa un monto válido mayor a 0" });
    }
    if (meta > 999999999) {
      return fail(400, { error: "El monto es demasiado alto" });
    }
    try {
      const existing = await prisma.config.findFirst({
        where: { key: "META_PROYECTO" }
      });
      const oldValue = existing?.value || null;
      if (existing) {
        await prisma.config.update({
          where: { id: existing.id },
          data: { value: meta.toString() }
        });
      } else {
        await prisma.config.create({
          data: {
            key: "META_PROYECTO",
            value: meta.toString()
          }
        });
      }
      createAuditLog({
        userId: locals.user.id,
        action: "UPDATE",
        entity: "Config",
        entityId: "META_PROYECTO",
        oldData: oldValue ? { metaProyecto: oldValue } : void 0,
        newData: { metaProyecto: meta }
      }).catch(console.error);
      return { success: true, message: "Meta actualizada correctamente" };
    } catch (e) {
      console.error("Error updating meta:", e);
      return fail(500, { error: "Error al actualizar la configuración" });
    }
  },
  updateNombre: async ({ request, locals }) => {
    if (locals.user?.role !== "ADMIN") {
      return fail(403, { error: "Sin permisos" });
    }
    const formData = await request.formData();
    const nombre = (formData.get("nombreProyecto") || "").trim();
    if (nombre.length < 3) {
      return fail(400, { error: "El nombre debe tener al menos 3 caracteres" });
    }
    if (nombre.length > 100) {
      return fail(400, { error: "El nombre es demasiado largo" });
    }
    try {
      const existing = await prisma.config.findFirst({
        where: { key: "NOMBRE_PROYECTO" }
      });
      const oldValue = existing?.value || null;
      if (existing) {
        await prisma.config.update({
          where: { id: existing.id },
          data: { value: nombre }
        });
      } else {
        await prisma.config.create({
          data: {
            key: "NOMBRE_PROYECTO",
            value: nombre
          }
        });
      }
      createAuditLog({
        userId: locals.user.id,
        action: "UPDATE",
        entity: "Config",
        entityId: "NOMBRE_PROYECTO",
        oldData: oldValue ? { nombreProyecto: oldValue } : void 0,
        newData: { nombreProyecto: nombre }
      }).catch(console.error);
      return { success: true, message: "Nombre actualizado correctamente" };
    } catch (e) {
      console.error("Error updating nombre:", e);
      return fail(500, { error: "Error al actualizar la configuración" });
    }
  }
};
export {
  actions,
  load
};

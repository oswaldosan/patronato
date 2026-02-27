import { fail, redirect } from "@sveltejs/kit";
import { p as prisma } from "../../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../../chunks/audit.js";
import { f as egresoSchema } from "../../../../../chunks/validations.js";
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
export {
  actions,
  load
};

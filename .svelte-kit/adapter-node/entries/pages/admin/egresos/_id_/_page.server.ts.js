import { fail, redirect, error } from "@sveltejs/kit";
import { p as prisma } from "../../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../../chunks/audit.js";
import { e as egresoUpdateSchema } from "../../../../../chunks/validations.js";
const load = async ({ params }) => {
  const egreso = await prisma.egreso.findUnique({
    where: { id: params.id },
    include: {
      rubro: { select: { id: true, nombre: true, color: true } },
      proveedor: { select: { id: true, nombre: true } }
    }
  });
  if (!egreso) {
    throw error(404, "Egreso no encontrado");
  }
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
  return {
    egreso: {
      id: egreso.id,
      fecha: egreso.fecha.toISOString().split("T")[0],
      monto: egreso.monto.toNumber(),
      concepto: egreso.concepto,
      rubroId: egreso.rubroId,
      rubroNombre: egreso.rubro?.nombre ?? null,
      rubroColor: egreso.rubro?.color ?? null,
      proveedorId: egreso.proveedor?.id ?? null,
      proveedorNombre: egreso.proveedor?.nombre ?? null,
      referencia: egreso.referencia,
      notas: egreso.notas,
      estado: egreso.estado,
      createdAt: egreso.createdAt.toISOString(),
      updatedAt: egreso.updatedAt.toISOString()
    },
    rubros,
    proveedores
  };
};
const actions = {
  update: async ({ request, params }) => {
    const formData = await request.formData();
    const data = {
      fecha: formData.get("fecha"),
      monto: formData.get("monto"),
      concepto: formData.get("concepto"),
      rubroId: formData.get("rubroId"),
      proveedorId: formData.get("proveedorId") || null,
      referencia: formData.get("referencia") || null,
      notas: formData.get("notas") || null,
      estado: formData.get("estado")
    };
    const result = egresoUpdateSchema.safeParse(data);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, { error: message });
    }
    const oldData = await prisma.egreso.findUnique({
      where: { id: params.id }
    });
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: result.data
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Egreso",
        entityId: params.id,
        oldData,
        newData: data
      });
      return { success: true };
    } catch (e) {
      return fail(500, { error: "Error al actualizar el egreso" });
    }
  },
  verify: async ({ params }) => {
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: { estado: "VERIFICADO" }
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Egreso",
        entityId: params.id,
        newData: { estado: "VERIFICADO" }
      });
      return { success: true, verified: true };
    } catch (e) {
      return fail(500, { error: "Error al verificar el egreso" });
    }
  },
  cancel: async ({ params }) => {
    try {
      await prisma.egreso.update({
        where: { id: params.id },
        data: { estado: "ANULADO" }
      });
      await createAuditLog({
        action: "UPDATE",
        entity: "Egreso",
        entityId: params.id,
        newData: { estado: "ANULADO" }
      });
      return { success: true, cancelled: true };
    } catch (e) {
      return fail(500, { error: "Error al anular el egreso" });
    }
  },
  delete: async ({ params, locals }) => {
    try {
      await prisma.egreso.delete({
        where: { id: params.id }
      });
    } catch (e) {
      console.error("Error eliminando egreso:", e);
      return fail(500, { error: "Error al eliminar el egreso" });
    }
    createAuditLog({
      userId: locals.user?.id,
      action: "DELETE",
      entity: "Egreso",
      entityId: params.id
    }).catch((err) => console.error("Error en audit log:", err));
    redirect(302, "/admin/egresos");
  }
};
export {
  actions,
  load
};

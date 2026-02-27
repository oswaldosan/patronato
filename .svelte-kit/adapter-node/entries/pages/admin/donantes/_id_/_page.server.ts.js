import { fail, redirect, error } from "@sveltejs/kit";
import { p as prisma } from "../../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../../chunks/audit.js";
import { d as donanteUpdateSchema } from "../../../../../chunks/validations.js";
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
export {
  actions,
  load
};

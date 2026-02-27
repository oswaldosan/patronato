import { fail, redirect } from "@sveltejs/kit";
import { p as prisma } from "../../../../../chunks/db.js";
import { c as createAuditLog } from "../../../../../chunks/audit.js";
import { b as aporteSchema } from "../../../../../chunks/validations.js";
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
export {
  actions,
  load
};

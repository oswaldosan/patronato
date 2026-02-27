import { p as prisma } from "../../../../chunks/db.js";
import { error } from "@sveltejs/kit";
const load = async ({ params }) => {
  const donante = await prisma.donante.findUnique({
    where: { id: params.id },
    include: {
      aportes: {
        where: { estado: "VERIFICADO" },
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
  const totalDonado = donante.aportes.reduce((sum, a) => sum + a.monto.toNumber(), 0);
  const porRubro = {};
  for (const aporte of donante.aportes) {
    if (!porRubro[aporte.rubroId]) {
      porRubro[aporte.rubroId] = {
        nombre: aporte.rubro.nombre,
        color: aporte.rubro.color,
        total: 0,
        cantidad: 0
      };
    }
    porRubro[aporte.rubroId].total += aporte.monto.toNumber();
    porRubro[aporte.rubroId].cantidad++;
  }
  return {
    donante: {
      id: donante.id,
      nombre: donante.nombre,
      nombreNegocio: donante.nombreNegocio,
      tipo: donante.tipo
    },
    aportes: donante.aportes.map((a) => ({
      id: a.id,
      fecha: a.fecha.toISOString(),
      monto: a.monto.toNumber(),
      metodo: a.metodo,
      rubro: a.rubro.nombre,
      rubroColor: a.rubro.color,
      comentario: a.comentario
    })),
    totalDonado,
    porRubro: Object.values(porRubro)
  };
};
export {
  load
};

import { p as prisma } from './db-6tYg_p_L.js';
import { e as error } from './index-B2LGyy1l.js';
import 'dotenv/config';
import '@prisma/client';

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

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 22;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Ux2f8UjD.js')).default;
const server_id = "src/routes/donante/[id]/+page.server.ts";
const imports = ["_app/immutable/nodes/22.BxpIzwkH.js","_app/immutable/chunks/D2gFui-Z.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/C2yMkv0y.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/DlNLqZHT.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/DJc31okB.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=22-BuJ_BkwN.js.map

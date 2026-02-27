import { am as head, j as attr } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { R as ReportsView } from './ReportsView-B89CgnLj.js';
import './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let desde = data.filtros.desde;
    let hasta = data.filtros.hasta;
    head("1l5jsn3", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Reportes - Transparencia</title>`);
      });
    });
    $$renderer2.push(`<section class="bg-slate-50 border-b border-slate-200"><div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10"><h1 class="text-3xl font-display font-bold text-slate-900">Reportes públicos</h1> <p class="text-slate-600 mt-2">Resumen auditable de ingresos, egresos y balance historico del proyecto.</p> <div class="mt-6 flex flex-col sm:flex-row gap-4"><div><label class="label" for="desde">Desde</label> <input id="desde" type="date" class="input"${attr("value", desde)}/></div> <div><label class="label" for="hasta">Hasta</label> <input id="hasta" type="date" class="input"${attr("value", hasta)}/></div> <div class="flex items-end"><button class="btn btn-primary">Aplicar</button></div></div></div></section> <section class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">`);
    ReportsView($$renderer2, { reportes: data });
    $$renderer2.push(`<!----></section>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CwTy6lVS.js.map

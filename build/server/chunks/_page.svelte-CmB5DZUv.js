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
    head("1jn6df7", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Reportes - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div><h1 class="page-title">Reportes</h1> <p class="text-slate-600 mt-1">Vista consolidada de ingresos, egresos y balance.</p></div> <div class="card p-4"><div class="flex flex-col sm:flex-row gap-4 items-end"><div><label class="label" for="desde">Desde</label> <input id="desde" type="date" class="input"${attr("value", desde)}/></div> <div><label class="label" for="hasta">Hasta</label> <input id="hasta" type="date" class="input"${attr("value", hasta)}/></div> <button class="btn btn-primary">Aplicar filtros</button></div></div> `);
    ReportsView($$renderer2, { reportes: data });
    $$renderer2.push(`<!----></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-CmB5DZUv.js.map

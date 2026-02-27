import { am as head, m as escape_html, j as attr, h as ensure_array_like, l as stringify, an as attr_style, k as attr_class } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { b as formatDateShort, m as metodoPagoLabels, f as formatCurrency, e as estadoAporteLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let search = data.filtros.search;
    let estado = data.filtros.estado;
    let rubroId = data.filtros.rubroId;
    const estadoVariant = (e) => {
      switch (e) {
        case "VERIFICADO":
          return "success";
        case "PENDIENTE":
          return "warning";
        case "ANULADO":
          return "danger";
        default:
          return "default";
      }
    };
    head("ug8xi3", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aportes - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="page-title">Aportes / Ingresos</h1> <p class="text-slate-600 mt-1">${escape_html(data.pagination.total)} aporte${escape_html(data.pagination.total !== 1 ? "s" : "")} registrado${escape_html(data.pagination.total !== 1 ? "s" : "")}</p></div> <a href="/admin/aportes/nuevo" class="btn btn-primary"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Nuevo Aporte</a></div> <div class="card p-4"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1"><input type="text"${attr("value", search)} placeholder="Buscar donante..." class="input"/></div> `);
    $$renderer2.select({ value: estado, class: "select w-full sm:w-40" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todos los estados`);
      });
      $$renderer3.option({ value: "PENDIENTE" }, ($$renderer4) => {
        $$renderer4.push(`Pendiente`);
      });
      $$renderer3.option({ value: "VERIFICADO" }, ($$renderer4) => {
        $$renderer4.push(`Verificado`);
      });
      $$renderer3.option({ value: "ANULADO" }, ($$renderer4) => {
        $$renderer4.push(`Anulado`);
      });
    });
    $$renderer2.push(` `);
    $$renderer2.select({ value: rubroId, class: "select w-full sm:w-40" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todos los rubros`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(data.rubros);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let rubro = each_array[$$index];
        $$renderer3.option({ value: rubro.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(rubro.nombre)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(` <button class="btn btn-primary">Buscar</button></div></div> `);
    if (data.aportes.length === 0) {
      $$renderer2.push("<!--[-->");
      EmptyState($$renderer2, {
        title: "No hay aportes",
        description: "No se encontraron aportes con los filtros aplicados.",
        icon: "💰",
        actionLabel: "Registrar aporte",
        actionHref: "/admin/aportes/nuevo"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card overflow-hidden"><table class="table"><thead><tr><th>Fecha</th><th>Donante</th><th>Rubro</th><th>Método</th><th class="text-right">Monto</th><th>Estado</th><th></th></tr></thead><tbody><!--[-->`);
      const each_array_1 = ensure_array_like(data.aportes);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let aporte = each_array_1[$$index_1];
        $$renderer2.push(`<tr><td class="whitespace-nowrap">${escape_html(formatDateShort(aporte.fecha))}</td><td><a${attr("href", `/admin/donantes/${stringify(aporte.donanteId)}`)} class="font-medium text-slate-900 hover:text-primary-600">${escape_html(aporte.donante)}</a></td><td><div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(aporte.rubroColor)}`)}></div> <span class="text-sm">${escape_html(aporte.rubro)}</span></div></td><td class="text-sm text-slate-600">${escape_html(metodoPagoLabels[aporte.metodo] || aporte.metodo)}</td><td class="text-right font-bold text-green-600">${escape_html(formatCurrency(aporte.monto))}</td><td>`);
        Badge($$renderer2, {
          variant: estadoVariant(aporte.estado),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(estadoAporteLabels[aporte.estado])}`);
          }
        });
        $$renderer2.push(`<!----></td><td><a${attr("href", `/admin/aportes/${stringify(aporte.id)}`)} class="text-primary-600 hover:underline text-sm">Ver</a></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> `);
      if (data.pagination.totalPages > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-center gap-2"><!--[-->`);
        const each_array_2 = ensure_array_like(Array(Math.min(data.pagination.totalPages, 10)));
        for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
          each_array_2[i];
          $$renderer2.push(`<a${attr("href", `/admin/aportes?page=${stringify(i + 1)}&q=${stringify(search)}&estado=${stringify(estado)}&rubro=${stringify(rubroId)}`)}${attr_class(`w-10 h-10 rounded-lg flex items-center justify-center ${stringify(data.pagination.page === i + 1 ? "bg-primary-600 text-white" : "bg-white border border-slate-200 hover:bg-slate-50")}`)}>${escape_html(i + 1)}</a>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BSFwvwkm.js.map

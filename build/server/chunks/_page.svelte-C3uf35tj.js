import { am as head, m as escape_html, j as attr, h as ensure_array_like, an as attr_style, l as stringify, k as attr_class } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { b as formatDateShort, f as formatCurrency, g as estadoEgresoLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let search = data.filtros.search;
    let estado = data.filtros.estado;
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
    head("y7om5z", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Egresos - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="page-title">Egresos / Gastos</h1> <p class="text-slate-600 mt-1">${escape_html(data.pagination.total)} egreso${escape_html(data.pagination.total !== 1 ? "s" : "")} registrado${escape_html(data.pagination.total !== 1 ? "s" : "")}</p></div> <a href="/admin/egresos/nuevo" class="btn btn-primary"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Nuevo Egreso</a></div> <div class="card p-4"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1"><input type="text"${attr("value", search)} placeholder="Buscar por concepto o proveedor..." class="input"/></div> `);
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
    $$renderer2.push(` <button class="btn btn-primary">Buscar</button></div></div> `);
    if (data.egresos.length === 0) {
      $$renderer2.push("<!--[-->");
      EmptyState($$renderer2, {
        title: "No hay egresos",
        description: "No se encontraron egresos con los filtros aplicados.",
        icon: "📤",
        actionLabel: "Registrar egreso",
        actionHref: "/admin/egresos/nuevo"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card overflow-hidden"><table class="table"><thead><tr><th>Fecha</th><th>Concepto</th><th>Proveedor</th><th class="text-right">Monto</th><th>Estado</th><th></th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(data.egresos);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let egreso = each_array[$$index];
        $$renderer2.push(`<tr><td class="whitespace-nowrap">${escape_html(formatDateShort(egreso.fecha))}</td><td><p class="font-medium text-slate-900">${escape_html(egreso.concepto)}</p> `);
        if (egreso.rubro) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500 flex items-center gap-2"><span class="inline-flex w-2 h-2 rounded-full"${attr_style(`background:${egreso.rubroColor}`)}></span> ${escape_html(egreso.rubro)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></td><td class="text-sm text-slate-600">${escape_html(egreso.proveedor || "-")}</td><td class="text-right font-bold text-red-600">${escape_html(formatCurrency(egreso.monto))}</td><td>`);
        Badge($$renderer2, {
          variant: estadoVariant(egreso.estado),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(estadoEgresoLabels[egreso.estado])}`);
          }
        });
        $$renderer2.push(`<!----></td><td><a${attr("href", `/admin/egresos/${stringify(egreso.id)}`)} class="text-primary-600 hover:underline text-sm">Ver</a></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> `);
      if (data.pagination.totalPages > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-center gap-2"><!--[-->`);
        const each_array_1 = ensure_array_like(Array(Math.min(data.pagination.totalPages, 10)));
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          each_array_1[i];
          $$renderer2.push(`<a${attr("href", `/admin/egresos?page=${stringify(i + 1)}&q=${stringify(search)}&estado=${stringify(estado)}`)}${attr_class(`w-10 h-10 rounded-lg flex items-center justify-center ${stringify(data.pagination.page === i + 1 ? "bg-primary-600 text-white" : "bg-white border border-slate-200 hover:bg-slate-50")}`)}>${escape_html(i + 1)}</a>`);
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
//# sourceMappingURL=_page.svelte-C3uf35tj.js.map

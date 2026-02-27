import { am as head, m as escape_html, h as ensure_array_like, j as attr, an as attr_style, k as attr_class, l as stringify, d as store_get, f as unsubscribe_stores } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { p as page } from './stores-D8XgbXbc.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { f as formatCurrency, a as formatDate, m as metodoPagoLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { data } = $$props;
    let tipo = data.filtros.tipo;
    let rubroId = data.filtros.rubroId;
    let metodo = data.filtros.metodo;
    let desde = data.filtros.desde;
    let hasta = data.filtros.hasta;
    head("rsinwt", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Movimientos - Patronato de Monterrey</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="mb-8"><h1 class="page-title mb-2">Movimientos</h1> <p class="text-slate-600">Consulta todos los ingresos y egresos verificados del proyecto.</p></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"><div class="card p-4 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"><svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg></div> <div><p class="text-sm text-slate-500">Ingresos</p> <p class="text-xl font-bold text-green-600">${escape_html(formatCurrency(data.totales.ingresos))}</p></div></div> <div class="card p-4 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center"><svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg></div> <div><p class="text-sm text-slate-500">Egresos</p> <p class="text-xl font-bold text-red-600">${escape_html(formatCurrency(data.totales.egresos))}</p></div></div> <div class="card p-4 flex items-center gap-4"><div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center"><svg class="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg></div> <div><p class="text-sm text-slate-500">Balance</p> <p class="text-xl font-bold text-blue-600">${escape_html(formatCurrency(data.totales.ingresos - data.totales.egresos))}</p></div></div></div> <div class="card p-6 mb-8"><h2 class="font-display font-semibold text-slate-800 mb-4">Filtros</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"><div><label for="tipo" class="label">Tipo</label> `);
    $$renderer2.select({ id: "tipo", value: tipo, class: "select" }, ($$renderer3) => {
      $$renderer3.option({ value: "todos" }, ($$renderer4) => {
        $$renderer4.push(`Todos`);
      });
      $$renderer3.option({ value: "ingresos" }, ($$renderer4) => {
        $$renderer4.push(`Solo Ingresos`);
      });
      $$renderer3.option({ value: "egresos" }, ($$renderer4) => {
        $$renderer4.push(`Solo Egresos`);
      });
    });
    $$renderer2.push(`</div> <div><label for="rubro" class="label">Rubro</label> `);
    $$renderer2.select(
      {
        id: "rubro",
        value: rubroId,
        class: "select",
        disabled: tipo === "egresos"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Todos`);
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
      }
    );
    $$renderer2.push(`</div> <div><label for="metodo" class="label">Método</label> `);
    $$renderer2.select(
      {
        id: "metodo",
        value: metodo,
        class: "select",
        disabled: tipo === "egresos"
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Todos`);
        });
        $$renderer3.option({ value: "DEPOSITO" }, ($$renderer4) => {
          $$renderer4.push(`Depósito`);
        });
        $$renderer3.option({ value: "TRANSFERENCIA" }, ($$renderer4) => {
          $$renderer4.push(`Transferencia`);
        });
        $$renderer3.option({ value: "EFECTIVO" }, ($$renderer4) => {
          $$renderer4.push(`Efectivo`);
        });
        $$renderer3.option({ value: "CHEQUE" }, ($$renderer4) => {
          $$renderer4.push(`Cheque`);
        });
      }
    );
    $$renderer2.push(`</div> <div><label for="desde" class="label">Desde</label> <input type="date" id="desde"${attr("value", desde)} class="input"/></div> <div><label for="hasta" class="label">Hasta</label> <input type="date" id="hasta"${attr("value", hasta)} class="input"/></div></div> <div class="flex gap-3 mt-4"><button class="btn btn-primary">Aplicar Filtros</button> <button class="btn btn-secondary">Limpiar</button></div></div> `);
    if (data.movimientos.length === 0) {
      $$renderer2.push("<!--[-->");
      EmptyState($$renderer2, {
        title: "No hay movimientos",
        description: "No se encontraron movimientos con los filtros seleccionados.",
        icon: "📋"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-3"><!--[-->`);
      const each_array_1 = ensure_array_like(data.movimientos);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let mov = each_array_1[i];
        $$renderer2.push(`<div class="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow animate-slide-up"${attr_style(`animation-delay: ${stringify(i * 0.03)}s`)}><div class="flex items-start gap-4"><div${attr_class(`w-12 h-12 rounded-xl flex items-center justify-center ${stringify(mov.tipo === "ingreso" ? "bg-green-100" : "bg-red-100")}`)}>`);
        if (mov.tipo === "ingreso") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<svg class="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<svg class="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>`);
        }
        $$renderer2.push(`<!--]--></div> <div><div class="flex items-center gap-2 flex-wrap"><h3 class="font-medium text-slate-900">${escape_html(mov.concepto)}</h3> `);
        if (mov.rubro) {
          $$renderer2.push("<!--[-->");
          Badge($$renderer2, {
            variant: "info",
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(mov.rubro)}`);
            }
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> <p class="text-sm text-slate-500 mt-1">${escape_html(formatDate(mov.fecha))} `);
        if (mov.metodo) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="mx-2">•</span> ${escape_html(metodoPagoLabels[mov.metodo] || mov.metodo)}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></p> `);
        if (mov.detalle) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-slate-400 mt-1">${escape_html(mov.detalle)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></div> <div class="text-right sm:text-left"><p${attr_class(`text-xl font-bold ${stringify(mov.tipo === "ingreso" ? "text-green-600" : "text-red-600")}`)}>${escape_html(mov.tipo === "ingreso" ? "+" : "-")}${escape_html(formatCurrency(mov.monto))}</p> `);
        Badge($$renderer2, {
          variant: mov.tipo === "ingreso" ? "success" : "danger",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(mov.tipo === "ingreso" ? "Ingreso" : "Egreso")}`);
          }
        });
        $$renderer2.push(`<!----></div></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (data.pagination.hasMore) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-center mt-8"><a${attr("href", `/movimientos?page=${stringify(data.pagination.page + 1)}&${stringify(store_get($$store_subs ??= {}, "$page", page).url.searchParams.toString())}`)} class="btn btn-outline">Cargar más</a></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BagVmWLN.js.map

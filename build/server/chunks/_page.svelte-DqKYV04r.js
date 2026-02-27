import { am as head, m as escape_html, h as ensure_array_like, an as attr_style, l as stringify, j as attr } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { f as formatCurrency, a as formatDate } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let rubroId = data.filtros.rubroId;
    let proveedorId = data.filtros.proveedorId;
    let desde = data.filtros.desde;
    let hasta = data.filtros.hasta;
    head("6t7cxf", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Gastos del Proyecto - Portal de Transparencia</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen bg-slate-50"><section class="bg-gradient-to-br from-red-500 via-red-600 to-red-700 py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><h1 class="text-3xl md:text-4xl font-display font-bold text-white mb-3">Gastos del Proyecto</h1> <p class="text-white/80 max-w-2xl mx-auto">Transparencia total: conoce en detalle como se utilizan los fondos recaudados.</p></div></div></section> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"><div class="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 mb-8 relative z-10"><div class="card p-6 text-center"><p class="text-sm text-slate-500 mb-1">Total Gastado</p> <p class="text-3xl font-display font-bold text-red-600">${escape_html(formatCurrency(data.stats.totalGastado))}</p></div> <div class="card p-6 text-center"><p class="text-sm text-slate-500 mb-1">Egresos Registrados</p> <p class="text-3xl font-display font-bold text-slate-800">${escape_html(data.stats.totalEgresos)}</p></div> <div class="card p-6 text-center"><p class="text-sm text-slate-500 mb-1">Categorias</p> <p class="text-3xl font-display font-bold text-slate-800">${escape_html(data.stats.porRubro.length)}</p></div></div> `);
    if (data.stats.porRubro.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card p-6 mb-8"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Distribucion de Gastos por Categoria</h2> <div class="space-y-3"><!--[-->`);
      const each_array = ensure_array_like(data.stats.porRubro);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let rubro = each_array[$$index];
        const porcentaje = rubro.total / data.stats.totalGastado * 100;
        $$renderer2.push(`<div><div class="flex justify-between items-center mb-1"><div class="flex items-center gap-2"><span class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(rubro.color)}`)}></span> <span class="text-sm font-medium text-slate-700">${escape_html(rubro.nombre)}</span></div> <span class="text-sm font-semibold text-slate-900">${escape_html(formatCurrency(rubro.total))}</span></div> <div class="h-2 bg-slate-100 rounded-full overflow-hidden"><div class="h-full rounded-full transition-all duration-500"${attr_style(`width: ${stringify(porcentaje)}%; background-color: ${stringify(rubro.color)}`)}></div></div> <p class="text-xs text-slate-500 mt-0.5 text-right">${escape_html(porcentaje.toFixed(1))}%</p></div>`);
      }
      $$renderer2.push(`<!--]--></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="card p-4 mb-6"><form class="flex flex-wrap gap-4 items-end"><div class="flex-1 min-w-[150px]"><label for="rubro" class="label">Categoria</label> `);
    $$renderer2.select({ id: "rubro", value: rubroId, class: "select" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todas`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(data.rubros);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let rubro = each_array_1[$$index_1];
        $$renderer3.option({ value: rubro.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(rubro.nombre)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="flex-1 min-w-[150px]"><label for="proveedor" class="label">Proveedor</label> `);
    $$renderer2.select({ id: "proveedor", value: proveedorId, class: "select" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todos`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(data.proveedores);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let proveedor = each_array_2[$$index_2];
        $$renderer3.option({ value: proveedor.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(proveedor.nombre)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(`</div> <div class="flex-1 min-w-[140px]"><label for="desde" class="label">Desde</label> <input type="date" id="desde"${attr("value", desde)} class="input"/></div> <div class="flex-1 min-w-[140px]"><label for="hasta" class="label">Hasta</label> <input type="date" id="hasta"${attr("value", hasta)} class="input"/></div> <div class="flex gap-2"><button type="submit" class="btn btn-primary">Filtrar</button> <button type="button" class="btn btn-secondary">Limpiar</button></div></form></div> <div class="card overflow-hidden"><div class="p-4 border-b border-slate-100"><h2 class="font-display font-semibold text-slate-800">Detalle de Gastos <span class="text-sm font-normal text-slate-500 ml-2">(${escape_html(data.pagination.total)} registros)</span></h2></div> `);
    if (data.egresos.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-12 text-center"><div class="text-4xl mb-3">📭</div> <p class="text-slate-500">No se encontraron egresos con los filtros seleccionados.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="hidden md:block overflow-x-auto"><table class="table"><thead><tr><th>Fecha</th><th>Concepto</th><th>Categoria</th><th>Proveedor</th><th class="text-right">Monto</th></tr></thead><tbody><!--[-->`);
      const each_array_3 = ensure_array_like(data.egresos);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let egreso = each_array_3[$$index_3];
        $$renderer2.push(`<tr><td class="whitespace-nowrap">${escape_html(formatDate(egreso.fecha))}</td><td><div><span class="font-medium text-slate-900">${escape_html(egreso.concepto)}</span> `);
        if (egreso.notas) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500 mt-0.5 line-clamp-1">${escape_html(egreso.notas)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td>`);
        if (egreso.rubro) {
          $$renderer2.push("<!--[-->");
          Badge($$renderer2, {
            variant: "default",
            children: ($$renderer3) => {
              $$renderer3.push(`<span class="flex items-center gap-1.5"><span class="w-2 h-2 rounded-full"${attr_style(`background-color: ${stringify(egreso.rubroColor)}`)}></span> ${escape_html(egreso.rubro)}</span>`);
            }
          });
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="text-slate-400">-</span>`);
        }
        $$renderer2.push(`<!--]--></td><td>`);
        if (egreso.proveedor) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-slate-700">${escape_html(egreso.proveedor)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="text-slate-400">-</span>`);
        }
        $$renderer2.push(`<!--]--></td><td class="text-right"><span class="font-semibold text-red-600">${escape_html(formatCurrency(egreso.monto))}</span></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> <div class="md:hidden divide-y divide-slate-100"><!--[-->`);
      const each_array_4 = ensure_array_like(data.egresos);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let egreso = each_array_4[$$index_4];
        $$renderer2.push(`<div class="p-4"><div class="flex justify-between items-start mb-2"><div class="flex-1"><p class="font-medium text-slate-900">${escape_html(egreso.concepto)}</p> <p class="text-xs text-slate-500">${escape_html(formatDate(egreso.fecha))}</p></div> <span class="font-bold text-red-600">${escape_html(formatCurrency(egreso.monto))}</span></div> <div class="flex flex-wrap gap-2 text-xs">`);
        if (egreso.rubro) {
          $$renderer2.push("<!--[-->");
          Badge($$renderer2, {
            variant: "default",
            children: ($$renderer3) => {
              $$renderer3.push(`<span class="flex items-center gap-1"><span class="w-2 h-2 rounded-full"${attr_style(`background-color: ${stringify(egreso.rubroColor)}`)}></span> ${escape_html(egreso.rubro)}</span>`);
            }
          });
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (egreso.proveedor) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-slate-500">Proveedor: ${escape_html(egreso.proveedor)}</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div> `);
        if (egreso.notas) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500 mt-2">${escape_html(egreso.notas)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (data.pagination.totalPages > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="p-4 border-t border-slate-100 flex justify-center gap-2"><button${attr("disabled", data.pagination.page <= 1, true)} class="btn btn-secondary btn-sm">Anterior</button> <span class="px-4 py-2 text-sm text-slate-600">Pagina ${escape_html(data.pagination.page)} de ${escape_html(data.pagination.totalPages)}</span> <button${attr("disabled", data.pagination.page >= data.pagination.totalPages, true)} class="btn btn-secondary btn-sm">Siguiente</button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></div></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DqKYV04r.js.map

import { am as head, m as escape_html, h as ensure_array_like, an as attr_style, l as stringify, k as attr_class, j as attr } from './index2-DaWCMi17.js';
import { S as StatCard } from './StatCard-xB67hm5r.js';
import { P as ProgressBar } from './ProgressBar-D9jAJsKZ.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { c as calculatePercentage, f as formatCurrency, m as metodoPagoLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1iknb9c", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Estadísticas - Patronato de Monterrey</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="mb-8"><h1 class="page-title mb-2">Estadísticas</h1> <p class="text-slate-600">Análisis detallado de la recaudación y gastos del proyecto.</p></div> <div class="card p-6 mb-8"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Progreso hacia la meta</h2> `);
    ProgressBar($$renderer2, {
      current: data.totales.ingresos,
      goal: data.totales.metaProyecto,
      showLabels: true
    });
    $$renderer2.push(`<!----> <div class="mt-4 flex flex-wrap gap-4 text-sm"><div><span class="text-slate-500">Porcentaje:</span> <span class="font-bold text-primary-600 ml-1">${escape_html(calculatePercentage(data.totales.ingresos, data.totales.metaProyecto))}%</span></div> <div><span class="text-slate-500">Faltante:</span> <span class="font-bold text-slate-700 ml-1">${escape_html(formatCurrency(Math.max(0, data.totales.metaProyecto - data.totales.ingresos)))}</span></div></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">`);
    StatCard($$renderer2, {
      title: "Total Ingresos",
      value: data.totales.ingresos,
      icon: "💰",
      isCurrency: true,
      color: "green"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Total Egresos",
      value: data.totales.egresos,
      icon: "📤",
      isCurrency: true,
      color: "red"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Balance",
      value: data.totales.balance,
      icon: "📊",
      isCurrency: true,
      color: "blue"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Donantes",
      value: data.totales.donantes,
      icon: "👥",
      color: "purple"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Donaciones",
      value: data.totales.donaciones,
      icon: "🎁",
      color: "yellow"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Promedio/Aporte",
      value: data.totales.promedioAporte,
      icon: "📈",
      isCurrency: true,
      color: "green"
    });
    $$renderer2.push(`<!----></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Ingresos por Rubro</h2> <div class="h-80"><canvas></canvas></div></div> <div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Por Método de Pago</h2> <div class="h-80"><canvas></canvas></div></div></div> <div class="card p-6 mb-8"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Tendencia Ingresos vs Egresos (12 meses)</h2> <div class="h-80"><canvas></canvas></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"><div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Desglose por Rubro</h2> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(data.rubroStats.filter((r) => r.total > 0));
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let rubro = each_array[$$index];
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"><div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full"${attr_style(`background-color: ${stringify(rubro.color)}`)}></div> <div><p class="font-medium text-slate-900">${escape_html(rubro.nombre)}</p> <p class="text-xs text-slate-500">${escape_html(rubro.cantidad)} donaciones</p></div></div> <div class="text-right"><p class="font-bold text-slate-900">${escape_html(formatCurrency(rubro.total))}</p> <p class="text-xs text-slate-500">${escape_html(calculatePercentage(rubro.total, data.totales.ingresos))}%</p></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Por Tipo de Donante</h2> <div class="space-y-4">`);
    if (data.porTipoDonante.PERSONA) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-4 bg-slate-50 rounded-xl"><div class="flex items-center justify-between mb-2"><span class="font-medium text-slate-900">Personas</span> <span class="font-bold text-primary-600">${escape_html(formatCurrency(data.porTipoDonante.PERSONA.total))}</span></div> <div class="flex items-center justify-between text-sm text-slate-500"><span>${escape_html(data.porTipoDonante.PERSONA.cantidad)} donaciones</span> <span>${escape_html(calculatePercentage(data.porTipoDonante.PERSONA.total, data.totales.ingresos))}%</span></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.porTipoDonante.EMPRESA) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-4 bg-slate-50 rounded-xl"><div class="flex items-center justify-between mb-2"><span class="font-medium text-slate-900">Empresas</span> <span class="font-bold text-blue-600">${escape_html(formatCurrency(data.porTipoDonante.EMPRESA.total))}</span></div> <div class="flex items-center justify-between text-sm text-slate-500"><span>${escape_html(data.porTipoDonante.EMPRESA.cantidad)} donaciones</span> <span>${escape_html(calculatePercentage(data.porTipoDonante.EMPRESA.total, data.totales.ingresos))}%</span></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> <h3 class="font-display font-semibold text-slate-800 mt-6 mb-4">Por Método de Pago</h3> <div class="space-y-2"><!--[-->`);
    const each_array_1 = ensure_array_like(data.metodoStats);
    for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
      let met = each_array_1[$$index_1];
      $$renderer2.push(`<div class="flex items-center justify-between p-2 text-sm"><span class="text-slate-600">${escape_html(metodoPagoLabels[met.metodo] || met.metodo)}</span> <div class="text-right"><span class="font-medium text-slate-900">${escape_html(formatCurrency(met.total))}</span> <span class="text-slate-400 ml-2">(${escape_html(met.cantidad)})</span></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">🏆 Top 10 Donantes</h2> <div class="h-96"><canvas></canvas></div> <div class="mt-6 overflow-x-auto"><table class="table"><thead><tr><th class="w-12">#</th><th>Donante</th><th class="text-center">Tipo</th><th class="text-center">Donaciones</th><th class="text-right">Total</th><th class="text-right">%</th></tr></thead><tbody><!--[-->`);
    const each_array_2 = ensure_array_like(data.topDonantes);
    for (let index = 0, $$length = each_array_2.length; index < $$length; index++) {
      let donante = each_array_2[index];
      $$renderer2.push(`<tr><td><span${attr_class(`w-8 h-8 rounded-full ${stringify(index < 3 ? "bg-yellow-100 text-yellow-700" : "bg-slate-100 text-slate-600")} flex items-center justify-center text-sm font-bold`)}>${escape_html(index + 1)}</span></td><td><a${attr("href", `/donante/${stringify(donante.id)}`)} class="font-medium text-slate-900 hover:text-primary-600 transition-colors">${escape_html(donante.nombreNegocio || donante.nombre)}</a> `);
      if (donante.nombreNegocio) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="block text-xs text-slate-500">${escape_html(donante.nombre)}</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></td><td class="text-center">`);
      Badge($$renderer2, {
        variant: donante.tipo === "EMPRESA" ? "info" : "default",
        children: ($$renderer3) => {
          $$renderer3.push(`<!---->${escape_html(donante.tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
        }
      });
      $$renderer2.push(`<!----></td><td class="text-center">${escape_html(donante.donaciones)}</td><td class="text-right font-bold text-primary-600">${escape_html(formatCurrency(donante.total))}</td><td class="text-right text-slate-500">${escape_html(calculatePercentage(donante.total, data.totales.ingresos))}%</td></tr>`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B9bm1YIQ.js.map

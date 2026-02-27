import { am as head, m as escape_html, h as ensure_array_like, an as attr_style, l as stringify } from './index2-DaWCMi17.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { f as formatCurrency, a as formatDate, m as metodoPagoLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("aoum8m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>${escape_html(data.donante.nombreNegocio || data.donante.nombre)} - Patronato de Monterrey</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><a href="/buscar" class="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary-600 mb-8 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg> Volver a búsqueda</a> <div class="card p-8 mb-8"><div class="flex flex-col md:flex-row md:items-center gap-6"><div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-4xl font-display font-bold text-white shadow-lg shadow-primary-500/30">${escape_html((data.donante.nombreNegocio || data.donante.nombre).charAt(0).toUpperCase())}</div> <div class="flex-1"><h1 class="text-3xl font-display font-bold text-slate-900">${escape_html(data.donante.nombreNegocio || data.donante.nombre)}</h1> `);
    if (data.donante.nombreNegocio) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-slate-600 mt-1">${escape_html(data.donante.nombre)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="flex items-center gap-3 mt-3">`);
    Badge($$renderer2, {
      variant: data.donante.tipo === "EMPRESA" ? "info" : "default",
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(data.donante.tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
      }
    });
    $$renderer2.push(`<!----> <span class="text-sm text-slate-500">${escape_html(data.donaciones.length)} aporte${escape_html(data.donaciones.length !== 1 ? "s" : "")} verificado${escape_html(data.donaciones.length !== 1 ? "s" : "")}</span></div></div> <div class="text-center md:text-right"><p class="text-sm text-slate-500">Total contribuido</p> <p class="text-4xl font-display font-bold text-gradient bg-gradient-to-r from-primary-600 to-accent-500">${escape_html(formatCurrency(data.totalDonado))}</p></div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">`);
    if (data.porRubro.length > 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Distribución por Rubro</h2> <div class="h-64"><canvas></canvas></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="card p-6"><h2 class="font-display font-semibold text-lg text-slate-800 mb-4">Desglose</h2> <div class="space-y-3"><!--[-->`);
    const each_array = ensure_array_like(data.porRubro);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let rubro = each_array[$$index];
      $$renderer2.push(`<div class="flex items-center justify-between p-3 bg-slate-50 rounded-xl"><div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full"${attr_style(`background-color: ${stringify(rubro.color)}`)}></div> <div><p class="font-medium text-slate-900">${escape_html(rubro.nombre)}</p> <p class="text-xs text-slate-500">${escape_html(rubro.cantidad)} aporte${escape_html(rubro.cantidad !== 1 ? "s" : "")}</p></div></div> <p class="font-bold text-slate-900">${escape_html(formatCurrency(rubro.total))}</p></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div> <div class="card overflow-hidden"><div class="px-6 py-4 border-b border-slate-200"><h2 class="font-display font-semibold text-lg text-slate-800">Historial de Donaciones</h2></div> `);
    if (data.donaciones.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-12 text-center"><p class="text-slate-500">No hay donaciones verificados para mostrar.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="divide-y divide-slate-100"><!--[-->`);
      const each_array_1 = ensure_array_like(data.donaciones);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let aporte = each_array_1[i];
        $$renderer2.push(`<div class="p-5 hover:bg-slate-50 transition-colors animate-slide-up"${attr_style(`animation-delay: ${stringify(i * 0.05)}s`)}><div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div><div class="flex items-center gap-2 flex-wrap"><p class="font-medium text-slate-900">${escape_html(formatDate(aporte.fecha))}</p> `);
        Badge($$renderer2, {
          variant: "success",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(aporte.rubro)}`);
          }
        });
        $$renderer2.push(`<!----></div> <p class="text-sm text-slate-500 mt-1">${escape_html(metodoPagoLabels[aporte.metodo] || aporte.metodo)} `);
        if (aporte.comentario) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="mx-2">•</span> ${escape_html(aporte.comentario)}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></p></div> <p class="text-xl font-bold text-primary-600">${escape_html(formatCurrency(aporte.monto))}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="mt-8 p-6 bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl border border-primary-100 text-center"><div class="text-4xl mb-4">🏅</div> <h3 class="font-display font-bold text-xl text-slate-900 mb-2">¡Gracias por tu apoyo!</h3> <p class="text-slate-600 max-w-md mx-auto">Tu contribución de <strong>${escape_html(formatCurrency(data.totalDonado))}</strong> está ayudando a mejorar nuestra comunidad. 
      Cada aporte cuenta para alcanzar nuestra meta.</p></div></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Ux2f8UjD.js.map

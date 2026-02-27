import { e as ensure_array_like, d as escape_html, i as attr_style } from "./index2.js";
import { f as formatCurrency, h as formatNumber } from "./format.js";
function ReportsView($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { reportes } = $$props;
    $$renderer2.push(`<div class="space-y-10"><section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Resumen por periodo (mensual)</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><p class="text-sm font-medium text-slate-700 mb-3">Ingresos</p> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Mes</th><th class="text-right">Total</th><th class="text-right">Aportes</th></tr></thead><tbody>`);
    if (reportes.aportesPorPeriodo.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin datos en el periodo</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array = ensure_array_like(reportes.aportesPorPeriodo);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let row = each_array[$$index];
        $$renderer2.push(`<tr><td>${escape_html(row.mes)}</td><td class="text-right font-semibold text-emerald-700">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div><p class="text-sm font-medium text-slate-700 mb-3">Egresos</p> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Mes</th><th class="text-right">Total</th><th class="text-right">Egresos</th></tr></thead><tbody>`);
    if (reportes.egresosPorPeriodo.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin datos en el periodo</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_1 = ensure_array_like(reportes.egresosPorPeriodo);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let row = each_array_1[$$index_1];
        $$renderer2.push(`<tr><td>${escape_html(row.mes)}</td><td class="text-right font-semibold text-red-600">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Ingresos por rubro</h2> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Rubro</th><th class="text-right">Total</th><th class="text-right">Aportes</th></tr></thead><tbody>`);
    if (reportes.aportesPorRubro.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin aportes verificados</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_2 = ensure_array_like(reportes.aportesPorRubro);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let row = each_array_2[$$index_2];
        $$renderer2.push(`<tr><td><div class="flex items-center gap-2"><span class="inline-flex w-2.5 h-2.5 rounded-full"${attr_style(`background:${row.color}`)}></span> ${escape_html(row.rubro)}</div></td><td class="text-right font-semibold text-emerald-700">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Egresos por rubro</h2> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Rubro</th><th class="text-right">Total</th><th class="text-right">Egresos</th></tr></thead><tbody>`);
    if (reportes.egresosPorRubro.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin egresos verificados</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_3 = ensure_array_like(reportes.egresosPorRubro);
      for (let $$index_3 = 0, $$length = each_array_3.length; $$index_3 < $$length; $$index_3++) {
        let row = each_array_3[$$index_3];
        $$renderer2.push(`<tr><td><div class="flex items-center gap-2"><span class="inline-flex w-2.5 h-2.5 rounded-full"${attr_style(`background:${row.color}`)}></span> ${escape_html(row.rubro)}</div></td><td class="text-right font-semibold text-red-600">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Aportes por donante</h2> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Donante</th><th class="text-right">Total</th><th class="text-right">Aportes</th></tr></thead><tbody>`);
    if (reportes.aportesPorDonante.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin aportes en el periodo</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_4 = ensure_array_like(reportes.aportesPorDonante);
      for (let $$index_4 = 0, $$length = each_array_4.length; $$index_4 < $$length; $$index_4++) {
        let row = each_array_4[$$index_4];
        $$renderer2.push(`<tr><td>${escape_html(row.donante)}</td><td class="text-right font-semibold text-emerald-700">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Egresos por proveedor</h2> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Proveedor</th><th class="text-right">Total</th><th class="text-right">Egresos</th></tr></thead><tbody>`);
    if (reportes.egresosPorProveedor.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="3" class="text-center text-slate-500 py-6">Sin egresos en el periodo</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_5 = ensure_array_like(reportes.egresosPorProveedor);
      for (let $$index_5 = 0, $$length = each_array_5.length; $$index_5 < $$length; $$index_5++) {
        let row = each_array_5[$$index_5];
        $$renderer2.push(`<tr><td>${escape_html(row.proveedor)}</td><td class="text-right font-semibold text-red-600">${escape_html(formatCurrency(row.total))}</td><td class="text-right text-slate-500">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Balance historico</h2> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Mes</th><th class="text-right">Ingresos</th><th class="text-right">Egresos</th><th class="text-right">Balance</th></tr></thead><tbody>`);
    if (reportes.balanceHistorico.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="4" class="text-center text-slate-500 py-6">Sin movimientos en el periodo</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_6 = ensure_array_like(reportes.balanceHistorico);
      for (let $$index_6 = 0, $$length = each_array_6.length; $$index_6 < $$length; $$index_6++) {
        let row = each_array_6[$$index_6];
        $$renderer2.push(`<tr><td>${escape_html(row.mes)}</td><td class="text-right text-emerald-700">${escape_html(formatCurrency(row.ingresos))}</td><td class="text-right text-red-600">${escape_html(formatCurrency(row.egresos))}</td><td class="text-right font-semibold text-slate-900">${escape_html(formatCurrency(row.balance))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></section> <section class="card p-6"><h2 class="font-display font-semibold text-slate-800 mb-4">Estados de verificacion</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-6"><div><p class="text-sm font-medium text-slate-700 mb-3">Aportes</p> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Estado</th><th class="text-right">Cantidad</th></tr></thead><tbody>`);
    if (reportes.estados.aportes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="2" class="text-center text-slate-500 py-6">Sin datos</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_7 = ensure_array_like(reportes.estados.aportes);
      for (let $$index_7 = 0, $$length = each_array_7.length; $$index_7 < $$length; $$index_7++) {
        let row = each_array_7[$$index_7];
        $$renderer2.push(`<tr><td>${escape_html(row.estado)}</td><td class="text-right text-slate-600">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div> <div><p class="text-sm font-medium text-slate-700 mb-3">Egresos</p> <div class="overflow-x-auto"><table class="table"><thead><tr><th>Estado</th><th class="text-right">Cantidad</th></tr></thead><tbody>`);
    if (reportes.estados.egresos.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<tr><td colspan="2" class="text-center text-slate-500 py-6">Sin datos</td></tr>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<!--[-->`);
      const each_array_8 = ensure_array_like(reportes.estados.egresos);
      for (let $$index_8 = 0, $$length = each_array_8.length; $$index_8 < $$length; $$index_8++) {
        let row = each_array_8[$$index_8];
        $$renderer2.push(`<tr><td>${escape_html(row.estado)}</td><td class="text-right text-slate-600">${escape_html(formatNumber(row.cantidad))}</td></tr>`);
      }
      $$renderer2.push(`<!--]-->`);
    }
    $$renderer2.push(`<!--]--></tbody></table></div></div></div></section></div>`);
  });
}
export {
  ReportsView as R
};

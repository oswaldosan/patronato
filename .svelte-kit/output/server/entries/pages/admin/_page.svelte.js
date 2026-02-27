import { h as head, d as escape_html, e as ensure_array_like, a as attr, s as stringify } from "../../../chunks/index2.js";
import { S as StatCard } from "../../../chunks/StatCard.js";
import { B as Badge } from "../../../chunks/Badge.js";
import { f as formatCurrency, b as formatDateShort, c as formatDateTime, e as estadoAporteLabels, d as estadoEgresoLabels } from "../../../chunks/format.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    const estadoVariant = (estado) => {
      switch (estado) {
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
    head("1jef3w8", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Dashboard – Patronato Monterrey Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-8"><div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4"><div><h1 class="page-title">Dashboard</h1> <p class="text-slate-600 mt-1">Resumen operativo y financiero del Patronato de Monterrey.</p></div> <div class="flex flex-wrap gap-3"><a href="/admin/reportes" class="btn btn-secondary">Ver reportes</a> <a href="/admin/auditoria" class="btn btn-secondary">Auditoría</a></div></div> <div class="grid grid-cols-1 lg:grid-cols-3 gap-4"><div class="card p-5 border border-yellow-200 bg-yellow-50/60"><p class="text-sm font-medium text-yellow-800">Pendientes de verificación</p> <div class="mt-3 space-y-2"><p class="text-2xl font-bold text-yellow-900">${escape_html(data.stats.aportesPendientes + data.stats.egresosPendientes)}</p> <p class="text-xs text-yellow-700">${escape_html(data.stats.aportesPendientes)} donaciones · ${escape_html(data.stats.egresosPendientes)} gastos</p></div> <div class="mt-4 flex gap-2"><a href="/admin/aportes?estado=PENDIENTE" class="btn btn-sm bg-yellow-600 text-white hover:bg-yellow-700">Donaciones</a> <a href="/admin/egresos?estado=PENDIENTE" class="btn btn-sm bg-yellow-600 text-white hover:bg-yellow-700">Gastos</a></div></div> <div class="card p-5 bg-gradient-to-br from-primary-50 via-white to-slate-50 border border-primary-100"><p class="text-sm font-medium text-slate-600">Balance disponible</p> <p class="text-3xl font-bold text-primary-700 mt-2">${escape_html(formatCurrency(data.stats.balance))}</p> <div class="mt-3 text-xs text-slate-500"><p>Ingresos: ${escape_html(formatCurrency(data.stats.totalIngresos))}</p> <p>Egresos: ${escape_html(formatCurrency(data.stats.totalEgresos))}</p></div></div> <div class="card p-5"><p class="text-sm font-medium text-slate-600">Actividad total</p> <p class="text-3xl font-bold text-slate-900 mt-2">${escape_html(data.stats.totalAportes)}</p> <p class="text-xs text-slate-500 mt-2">Donaciones verificadas en el sistema.</p></div></div> <div><h2 class="text-lg font-display font-semibold text-slate-800 mb-4">Indicadores clave</h2> <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">`);
    StatCard($$renderer2, {
      title: "Ingresos",
      value: data.stats.totalIngresos,
      icon: "💰",
      isCurrency: true,
      color: "blue"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Egresos",
      value: data.stats.totalEgresos,
      icon: "📤",
      isCurrency: true,
      color: "red"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Balance",
      value: data.stats.balance,
      icon: "📊",
      isCurrency: true,
      color: "green"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Donantes",
      value: data.stats.totalDonantes,
      icon: "👥",
      color: "purple"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Donaciones pendientes",
      value: data.stats.aportesPendientes,
      icon: "⏳",
      color: "yellow"
    });
    $$renderer2.push(`<!----> `);
    StatCard($$renderer2, {
      title: "Gastos pendientes",
      value: data.stats.egresosPendientes,
      icon: "🧾",
      color: "yellow"
    });
    $$renderer2.push(`<!----></div></div> <div><h2 class="text-lg font-display font-semibold text-slate-800 mb-4">Acciones rápidas</h2> <div class="grid grid-cols-2 md:grid-cols-5 gap-4"><a href="/admin/aportes/nuevo" class="card p-4 flex items-center gap-3 hover:border-primary-300 transition-colors group"><div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">➕</div> <div><p class="font-medium text-slate-900">Nueva Donación</p> <p class="text-xs text-slate-500">Registrar ingreso</p></div></a> <a href="/admin/egresos/nuevo" class="card p-4 flex items-center gap-3 hover:border-red-300 transition-colors group"><div class="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📝</div> <div><p class="font-medium text-slate-900">Nuevo Gasto</p> <p class="text-xs text-slate-500">Registrar egreso</p></div></a> <a href="/admin/donantes/nuevo" class="card p-4 flex items-center gap-3 hover:border-purple-300 transition-colors group"><div class="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">👤</div> <div><p class="font-medium text-slate-900">Nuevo Donante</p> <p class="text-xs text-slate-500">Agregar persona/empresa</p></div></a> <a href="/admin/rubros" class="card p-4 flex items-center gap-3 hover:border-blue-300 transition-colors group"><div class="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📁</div> <div><p class="font-medium text-slate-900">Categorías</p> <p class="text-xs text-slate-500">Gestionar rubros</p></div></a> <a href="/admin/reportes" class="card p-4 flex items-center gap-3 hover:border-slate-300 transition-colors group"><div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📑</div> <div><p class="font-medium text-slate-900">Reportes</p> <p class="text-xs text-slate-500">Resumen y análisis</p></div></a></div></div> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="card overflow-hidden"><div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between"><h2 class="font-display font-semibold text-slate-800">Últimas Donaciones</h2> <a href="/admin/aportes" class="text-sm text-primary-700 hover:underline">Ver todas →</a></div> `);
    if (data.ultimosAportes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-8 text-center text-slate-500">No hay donaciones registradas</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="divide-y divide-slate-100"><!--[-->`);
      const each_array = ensure_array_like(data.ultimosAportes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let aporte = each_array[$$index];
        $$renderer2.push(`<a${attr("href", `/admin/aportes/${stringify(aporte.id)}`)} class="block p-4 hover:bg-slate-50 transition-colors"><div class="flex items-center justify-between"><div><p class="font-medium text-slate-900">${escape_html(aporte.donante)}</p> <p class="text-xs text-slate-500">${escape_html(aporte.rubro)} · ${escape_html(formatDateShort(aporte.fecha))}</p></div> <div class="text-right"><p class="font-bold text-primary-700">${escape_html(formatCurrency(aporte.monto))}</p> `);
        Badge($$renderer2, {
          variant: estadoVariant(aporte.estado),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(estadoAporteLabels[aporte.estado])}`);
          }
        });
        $$renderer2.push(`<!----></div></div></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div> <div class="card overflow-hidden"><div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between"><h2 class="font-display font-semibold text-slate-800">Últimos Gastos</h2> <a href="/admin/egresos" class="text-sm text-primary-700 hover:underline">Ver todos →</a></div> `);
    if (data.ultimosEgresos.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-8 text-center text-slate-500">No hay gastos registrados</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="divide-y divide-slate-100"><!--[-->`);
      const each_array_1 = ensure_array_like(data.ultimosEgresos);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let egreso = each_array_1[$$index_1];
        $$renderer2.push(`<a${attr("href", `/admin/egresos/${stringify(egreso.id)}`)} class="block p-4 hover:bg-slate-50 transition-colors"><div class="flex items-center justify-between"><div><p class="font-medium text-slate-900">${escape_html(egreso.concepto)}</p> <p class="text-xs text-slate-500">${escape_html(formatDateShort(egreso.fecha))} `);
        if (egreso.rubro) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(` · ${escape_html(egreso.rubro)}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (egreso.proveedor) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(` · ${escape_html(egreso.proveedor)}`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></p></div> <div class="text-right"><p class="font-bold text-red-600">${escape_html(formatCurrency(egreso.monto))}</p> `);
        Badge($$renderer2, {
          variant: estadoVariant(egreso.estado),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(estadoEgresoLabels[egreso.estado])}`);
          }
        });
        $$renderer2.push(`<!----></div></div></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="card overflow-hidden"><div class="px-6 py-4 border-b border-slate-200 flex items-center justify-between"><h2 class="font-display font-semibold text-slate-800">Actividad Reciente</h2> <a href="/admin/auditoria" class="text-sm text-primary-700 hover:underline">Ver todo →</a></div> `);
    if (data.ultimosLogs.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-8 text-center text-slate-500">No hay actividad registrada</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="divide-y divide-slate-100"><!--[-->`);
      const each_array_2 = ensure_array_like(data.ultimosLogs);
      for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
        let log = each_array_2[$$index_2];
        $$renderer2.push(`<div class="px-6 py-3 flex items-center gap-4"><div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">`);
        if (log.action === "CREATE") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-green-600 font-bold">+</span>`);
        } else if (log.action === "UPDATE") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`<span class="text-blue-600 font-bold">✎</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`<span class="text-red-600 font-bold">×</span>`);
        }
        $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0"><p class="text-sm text-slate-900"><span class="font-medium">${escape_html(log.user)}</span> ${escape_html(log.action === "CREATE" ? " creó " : log.action === "UPDATE" ? " actualizó " : " eliminó ")} <span class="text-slate-600">${escape_html(log.entity)}</span></p> <p class="text-xs text-slate-500">${escape_html(formatDateTime(log.createdAt))}</p></div></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};

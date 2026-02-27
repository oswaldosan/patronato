import { h as head, s as stringify, d as escape_html, e as ensure_array_like, i as attr_style } from "../../chunks/index2.js";
import { S as StatCard } from "../../chunks/StatCard.js";
import { P as ProgressBar } from "../../chunks/ProgressBar.js";
import { B as Badge } from "../../chunks/Badge.js";
import { f as formatCurrency, a as formatDate } from "../../chunks/format.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    head("1uha8ag", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Patronato de Monterrey – Portal de Transparencia</title>`);
      });
    });
    $$renderer2.push(`<section class="relative pt-12 pb-32 md:pt-16 md:pb-40 overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-primary-800 via-primary-900 to-primary-950"></div> <div class="absolute top-0 right-0 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div> <div class="absolute bottom-0 left-0 w-80 h-80 bg-primary-600/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"></div> <div class="absolute inset-0 opacity-5" style="background-image: url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%23ffffff&quot; fill-opacity=&quot;0.4&quot;%3E%3Cpath d=&quot;M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center"><div class="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-8 border border-white/20"><span class="w-2 h-2 bg-accent-400 rounded-full animate-pulse"></span> Portal de Transparencia — Comité de Desarrollo</div> <h1 class="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-5 tracking-tight">Patronato de <span class="text-accent-400">Monterrey</span></h1> <p class="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">Trabajamos juntos por el desarrollo de Monterrey con total transparencia. 
        Aquí puedes consultar cada donación recibida y cada gasto realizado.</p> <div class="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/20 shadow-xl">`);
    ProgressBar($$renderer2, {
      current: data.stats.totalIngresos,
      goal: data.stats.metaProyecto,
      label: "Progreso hacia la meta del proyecto",
      showLabels: true,
      variant: "dark"
    });
    $$renderer2.push(`<!----></div></div></div> <div class="absolute -bottom-1 left-0 right-0"><svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto" preserveAspectRatio="none"><path d="M0 100L60 90C120 80 240 60 360 50C480 40 600 40 720 45C840 50 960 60 1080 65C1200 70 1320 70 1380 70L1440 70V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="#f8fafc"></path></svg></div></section> <section class="py-12 -mt-16 relative z-10"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"><div class="animate-slide-up" style="animation-delay: 0.1s">`);
    StatCard($$renderer2, {
      title: "Total Recaudado",
      value: data.stats.totalIngresos,
      icon: "💰",
      isCurrency: true,
      color: "blue",
      subtitle: "Donaciones verificadas"
    });
    $$renderer2.push(`<!----></div> <div class="animate-slide-up" style="animation-delay: 0.2s">`);
    StatCard($$renderer2, {
      title: "Total Gastos",
      value: data.stats.totalEgresos,
      icon: "📤",
      isCurrency: true,
      color: "red",
      subtitle: "Egresos verificados"
    });
    $$renderer2.push(`<!----></div> <div class="animate-slide-up" style="animation-delay: 0.3s">`);
    StatCard($$renderer2, {
      title: "Balance Actual",
      value: data.stats.balance,
      icon: "📊",
      isCurrency: true,
      color: "green",
      subtitle: "Disponible"
    });
    $$renderer2.push(`<!----></div> <div class="animate-slide-up" style="animation-delay: 0.4s">`);
    StatCard($$renderer2, {
      title: "Donantes",
      value: data.stats.totalDonantes,
      icon: "🤝",
      color: "purple",
      subtitle: `${stringify(data.stats.totalAportes)} donaciones totales`
    });
    $$renderer2.push(`<!----></div></div></div></section> <section class="py-16 relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-b from-slate-50 via-primary-50/30 to-slate-50"></div> <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-100/20 rounded-full blur-3xl -translate-y-1/2 pointer-events-none"></div> <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="text-center mb-12"><div class="inline-flex items-center gap-2 px-3 py-1 bg-accent-100 rounded-full text-accent-700 text-xs font-semibold uppercase tracking-wider mb-4"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg> Leaderboard de Donantes</div> <h2 class="text-3xl md:text-4xl font-display font-bold text-slate-900 mb-3">Nuestros Principales Benefactores</h2> <p class="text-slate-500 max-w-lg mx-auto">Reconocemos a quienes hacen posible el desarrollo de Monterrey</p></div> `);
    if (data.topDonantes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card p-12 text-center"><p class="text-slate-500">Aún no hay donantes registrados.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      if (data.topDonantes.length >= 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mb-10 max-w-4xl mx-auto md:items-end"><div class="order-2 md:order-1 animate-slide-up" style="animation-delay: 0.2s"><div class="relative card p-6 pt-10 text-center border-2 border-slate-200/80 hover:border-slate-300 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"><div class="absolute -top-5 left-1/2 -translate-x-1/2"><div class="w-10 h-10 bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"><span class="text-base font-display font-bold text-white">2</span></div></div> <div class="w-14 h-14 mx-auto mb-3 bg-slate-100 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">🥈</div> <h3 class="font-display font-bold text-base text-slate-900 leading-tight group-hover:text-primary-700 transition-colors truncate">${escape_html(data.topDonantes[1].nombreNegocio || data.topDonantes[1].nombre)}</h3> `);
        if (data.topDonantes[1].nombreNegocio) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500 mt-0.5 truncate">${escape_html(data.topDonantes[1].nombre)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="mt-2">`);
        Badge($$renderer2, {
          variant: data.topDonantes[1].tipo === "EMPRESA" ? "info" : "default",
          size: "sm",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(data.topDonantes[1].tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
          }
        });
        $$renderer2.push(`<!----></div> <p class="text-2xl font-display font-bold text-primary-700 mt-3">${escape_html(formatCurrency(data.topDonantes[1].total))}</p> <p class="text-xs text-slate-400 mt-1">${escape_html(data.topDonantes[1].aportes)} donaciones</p></div></div> <div class="order-1 md:order-2 animate-slide-up" style="animation-delay: 0.1s"><div class="relative card p-7 pt-12 text-center border-2 border-accent-300 bg-gradient-to-b from-accent-50/60 via-white to-white hover:border-accent-400 group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl md:pb-8"><div class="absolute -top-5 left-1/2 -translate-x-1/2"><div class="relative"><div class="w-10 h-10 bg-gradient-to-br from-accent-400 to-yellow-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"><span class="text-base font-display font-bold text-white">1</span></div> <div class="absolute -top-1 -right-1 w-4 h-4 bg-accent-400 rounded-full animate-ping opacity-40"></div></div></div> <div class="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-accent-100 to-accent-50 rounded-full flex items-center justify-center text-4xl group-hover:scale-110 transition-transform duration-300 ring-4 ring-accent-200/50">🏆</div> <h3 class="font-display font-bold text-xl text-slate-900 leading-tight group-hover:text-primary-700 transition-colors">${escape_html(data.topDonantes[0].nombreNegocio || data.topDonantes[0].nombre)}</h3> `);
        if (data.topDonantes[0].nombreNegocio) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-sm text-slate-500 mt-0.5">${escape_html(data.topDonantes[0].nombre)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="mt-2">`);
        Badge($$renderer2, {
          variant: data.topDonantes[0].tipo === "EMPRESA" ? "info" : "default",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(data.topDonantes[0].tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
          }
        });
        $$renderer2.push(`<!----></div> <p class="text-3xl font-display font-bold text-primary-700 mt-4">${escape_html(formatCurrency(data.topDonantes[0].total))}</p> <p class="text-sm text-slate-400 mt-1">${escape_html(data.topDonantes[0].aportes)} donaciones</p></div></div> <div class="order-3 animate-slide-up" style="animation-delay: 0.3s"><div class="relative card p-6 pt-10 text-center border-2 border-orange-200/80 hover:border-orange-300 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"><div class="absolute -top-5 left-1/2 -translate-x-1/2"><div class="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg ring-4 ring-white"><span class="text-base font-display font-bold text-white">3</span></div></div> <div class="w-14 h-14 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">🥉</div> <h3 class="font-display font-bold text-base text-slate-900 leading-tight group-hover:text-primary-700 transition-colors truncate">${escape_html(data.topDonantes[2].nombreNegocio || data.topDonantes[2].nombre)}</h3> `);
        if (data.topDonantes[2].nombreNegocio) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500 mt-0.5 truncate">${escape_html(data.topDonantes[2].nombre)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> <div class="mt-2">`);
        Badge($$renderer2, {
          variant: data.topDonantes[2].tipo === "EMPRESA" ? "info" : "default",
          size: "sm",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(data.topDonantes[2].tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
          }
        });
        $$renderer2.push(`<!----></div> <p class="text-2xl font-display font-bold text-primary-700 mt-3">${escape_html(formatCurrency(data.topDonantes[2].total))}</p> <p class="text-xs text-slate-400 mt-1">${escape_html(data.topDonantes[2].aportes)} donaciones</p></div></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (data.topDonantes.length > 3) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="max-w-2xl mx-auto space-y-2.5"><!--[-->`);
        const each_array = ensure_array_like(data.topDonantes.slice(3));
        for (let i = 0, $$length = each_array.length; i < $$length; i++) {
          let donante = each_array[i];
          $$renderer2.push(`<div class="group flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl border border-slate-200/60 px-5 py-3.5 hover:border-primary-300 hover:bg-white hover:shadow-md transition-all duration-300 animate-slide-up"${attr_style(`animation-delay: ${stringify((i + 4) * 0.06)}s`)}><span class="w-8 h-8 rounded-full bg-slate-100 group-hover:bg-primary-50 flex items-center justify-center text-sm font-bold text-slate-500 group-hover:text-primary-700 transition-colors shrink-0">${escape_html(i + 4)}</span> <div class="flex-1 min-w-0"><span class="font-medium text-slate-900 block truncate">${escape_html(donante.nombreNegocio || donante.nombre)}</span> `);
          if (donante.nombreNegocio) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<span class="text-xs text-slate-500 block truncate">${escape_html(donante.nombre)}</span>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> `);
          Badge($$renderer2, {
            variant: donante.tipo === "EMPRESA" ? "info" : "default",
            size: "sm",
            children: ($$renderer3) => {
              $$renderer3.push(`<!---->${escape_html(donante.tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
            }
          });
          $$renderer2.push(`<!----> <div class="text-right shrink-0"><span class="font-bold text-primary-700 font-display">${escape_html(formatCurrency(donante.total))}</span> <span class="block text-xs text-slate-400">${escape_html(donante.aportes)} donaciones</span></div></div>`);
        }
        $$renderer2.push(`<!--]--></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="text-center mt-10"><a href="/buscar" class="btn btn-outline group"><svg class="w-4 h-4 text-slate-400 group-hover:text-primary-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> Buscar mi historial de donaciones</a></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="py-12"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><h2 class="section-title mb-8 text-center">Estadísticas de Recaudación</h2> <div class="grid grid-cols-1 lg:grid-cols-2 gap-8"><div class="card p-6"><h3 class="font-display font-semibold text-lg text-slate-800 mb-6">Donaciones por Categoría</h3> <div class="h-80"><canvas></canvas></div></div> <div class="card p-6"><h3 class="font-display font-semibold text-lg text-slate-800 mb-6">Top Donantes</h3> <div class="h-80"><canvas></canvas></div></div></div> <div class="card p-6 mt-8"><h3 class="font-display font-semibold text-lg text-slate-800 mb-6">Tendencia de Donaciones Mensuales</h3> <div class="h-64"><canvas></canvas></div></div></div></section> <section class="py-12 bg-white"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center mb-8"><h2 class="section-title">Últimas Donaciones</h2> <a href="/movimientos" class="btn btn-outline btn-sm">Ver todas <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></a></div> `);
    if (data.ultimosAportes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="card p-12 text-center"><p class="text-slate-500">Aún no hay donaciones registradas.</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array_1 = ensure_array_like(data.ultimosAportes);
      for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
        let aporte = each_array_1[i];
        $$renderer2.push(`<div class="card p-5 hover:border-primary-200 transition-all animate-slide-up"${attr_style(`animation-delay: ${stringify(i * 0.05)}s`)}><div class="flex items-start justify-between mb-3"><div><h4 class="font-medium text-slate-900">${escape_html(aporte.donante)}</h4> <p class="text-xs text-slate-500">${escape_html(formatDate(aporte.fecha))}</p></div> `);
        Badge($$renderer2, {
          variant: "success",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(aporte.rubro)}`);
          }
        });
        $$renderer2.push(`<!----></div> <p class="text-2xl font-display font-bold text-primary-700">${escape_html(formatCurrency(aporte.monto))}</p></div>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></section> <section class="py-16 bg-gradient-to-br from-primary-800 to-primary-950"><div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h2 class="text-3xl font-display font-bold text-white mb-4">¿Quieres contribuir al desarrollo de Monterrey?</h2> <p class="text-white/75 mb-8 text-lg">Cada aporte impulsa proyectos que transforman nuestra ciudad. Juntos hacemos la diferencia.</p> <div class="flex flex-wrap justify-center gap-4"><a href="/buscar" class="btn bg-white text-primary-800 hover:bg-slate-100 shadow-lg font-semibold">Buscar mi historial</a> <a href="/movimientos" class="btn border-2 border-white/60 text-white hover:bg-white/10">Ver todas las donaciones</a></div></div></section>`);
  });
}
export {
  _page as default
};

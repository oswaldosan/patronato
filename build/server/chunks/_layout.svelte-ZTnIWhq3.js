import { d as store_get, f as unsubscribe_stores, h as ensure_array_like, j as attr, k as attr_class, l as stringify, m as escape_html } from './index2-DaWCMi17.js';
import { p as page } from './stores-D8XgbXbc.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';

function Header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    const navLinks = [
      { href: "/", label: "Inicio" },
      { href: "/movimientos", label: "Donaciones" },
      { href: "/egresos", label: "Gastos" },
      { href: "/buscar", label: "Buscar Donante" },
      { href: "/reportes", label: "Reportes" }
    ];
    $$renderer2.push(`<header class="sticky top-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm py-2 border-b border-primary-100/50"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div class="flex justify-between items-center h-14"><a href="/" class="flex items-center gap-3 group"><div class="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-700 to-primary-900 flex items-center justify-center shadow-md shadow-primary-700/30"><svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div> <div class="hidden sm:block"><span class="font-display font-bold text-lg text-slate-900 leading-tight">Patronato de Monterrey</span> <span class="block text-xs text-primary-600 -mt-0.5 font-medium">Comité de Desarrollo</span></div></a> <nav class="hidden md:flex items-center gap-1"><!--[-->`);
    const each_array = ensure_array_like(navLinks);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let link = each_array[$$index];
      $$renderer2.push(`<a${attr("href", link.href)}${attr_class(`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${stringify(store_get($$store_subs ??= {}, "$page", page).url.pathname === link.href ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100")}`)}>${escape_html(link.label)}</a>`);
    }
    $$renderer2.push(`<!--]--></nav> <div class="flex items-center gap-3"><a href="/admin" class="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary-700 transition-colors"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Admin</a> <button class="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors" aria-label="Toggle menu"><svg class="w-6 h-6 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`);
    }
    $$renderer2.push(`<!--]--></svg></button></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></header>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
function Footer($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<footer class="bg-primary-950 text-slate-400 mt-auto"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="grid grid-cols-1 md:grid-cols-3 gap-8"><div><div class="flex items-center gap-3 mb-4"><div class="w-12 h-12 rounded-xl bg-primary-800 flex items-center justify-center"><svg class="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div> <div><p class="font-display font-bold text-white text-lg leading-tight">Patronato de Monterrey</p> <p class="text-xs text-accent-400 font-medium">Comité de Desarrollo</p></div></div> <p class="text-sm leading-relaxed">Portal de transparencia del Patronato de Monterrey. Gestionamos y publicamos de forma pública cada aporte recibido y cada gasto realizado para el desarrollo de nuestra ciudad.</p></div> <div><h3 class="font-display font-semibold text-white mb-4">Navegación</h3> <ul class="space-y-2 text-sm"><li><a href="/" class="hover:text-accent-400 transition-colors">Inicio</a></li> <li><a href="/movimientos" class="hover:text-accent-400 transition-colors">Donaciones</a></li> <li><a href="/egresos" class="hover:text-accent-400 transition-colors">Gastos</a></li> <li><a href="/buscar" class="hover:text-accent-400 transition-colors">Buscar Donante</a></li> <li><a href="/estadisticas" class="hover:text-accent-400 transition-colors">Estadísticas</a></li></ul></div> <div><h3 class="font-display font-semibold text-white mb-4">Contacto</h3> <ul class="space-y-2 text-sm"><li class="flex items-center gap-2"><svg class="w-4 h-4 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> contacto@patronato-monterrey.org</li> <li class="flex items-center gap-2"><svg class="w-4 h-4 text-accent-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Monterrey, Nuevo León, México</li></ul></div></div> <div class="border-t border-primary-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4"><p class="text-sm">© ${escape_html((/* @__PURE__ */ new Date()).getFullYear())} Patronato de Monterrey – Comité de Desarrollo. Todos los derechos reservados.</p> <p class="text-xs text-slate-500">Transparencia al servicio de Monterrey</p></div></div></footer>`);
  });
}
function _layout($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let { children } = $$props;
    const isAdminRoute = (pathname) => pathname.startsWith("/admin");
    $$renderer2.push(`<div class="min-h-screen flex flex-col">`);
    if (!isAdminRoute(store_get($$store_subs ??= {}, "$page", page).url.pathname)) {
      $$renderer2.push("<!--[-->");
      Header($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <main class="flex-1">`);
    children($$renderer2);
    $$renderer2.push(`<!----></main> `);
    if (!isAdminRoute(store_get($$store_subs ??= {}, "$page", page).url.pathname)) {
      $$renderer2.push("<!--[-->");
      Footer($$renderer2);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}

export { _layout as default };
//# sourceMappingURL=_layout.svelte-ZTnIWhq3.js.map

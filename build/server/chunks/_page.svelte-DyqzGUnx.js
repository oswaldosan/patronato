import { am as head, m as escape_html, h as ensure_array_like, j as attr, l as stringify, an as attr_style, ao as bind_props } from './index2-DaWCMi17.js';
import { g as goto } from './client-Dcp1-aNv.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { f as formatCurrency } from './format-OIrQpM7m.js';
import './root-BhGlX1_a.js';
import './index-D_8dOU1D.js';
import './state.svelte-D0Tb5oKo.js';

function SearchInput($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { value = "", placeholder = "Buscar...", onSearch } = $$props;
    $$renderer2.push(`<form class="relative"><div class="relative"><svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg> <input type="text"${attr("value", value)}${attr("placeholder", placeholder)} class="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm transition-all duration-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 focus:outline-none"/> `);
    if (value) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<button type="button" class="absolute right-14 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-slate-100 transition-colors"><svg class="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button type="submit" class="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-xl hover:bg-primary-700 transition-colors">Buscar</button></div></form>`);
    bind_props($$props, { value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let searchQuery = data.query;
    function handleSearch(query) {
      if (query && query.length >= 2) {
        goto();
      } else if (!query) {
        goto();
      }
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("4lhogl", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Buscar Donante - Patronato de Monterrey</title>`);
        });
      });
      $$renderer3.push(`<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12"><div class="text-center mb-12"><h1 class="page-title mb-4">Buscar Donante</h1> <p class="text-slate-600 max-w-xl mx-auto">Busca por nombre de persona o empresa para ver el historial de donaciones y el total acumulado.</p></div> <div class="max-w-xl mx-auto mb-12">`);
      SearchInput($$renderer3, {
        placeholder: "Nombre de persona o empresa...",
        onSearch: handleSearch,
        get value() {
          return searchQuery;
        },
        set value($$value) {
          searchQuery = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <p class="text-xs text-slate-400 mt-2 text-center">Ingresa al menos 2 caracteres para buscar</p></div> `);
      if (data.searched) {
        $$renderer3.push("<!--[-->");
        if (data.donantes.length === 0) {
          $$renderer3.push("<!--[-->");
          EmptyState($$renderer3, {
            title: "Sin resultados",
            description: "No se encontraron donantes con ese nombre. Intenta con otro término.",
            icon: "🔍"
          });
        } else {
          $$renderer3.push("<!--[!-->");
          $$renderer3.push(`<div class="space-y-4"><p class="text-sm text-slate-500">${escape_html(data.donantes.length)} resultado${escape_html(data.donantes.length !== 1 ? "s" : "")} para "<strong>${escape_html(data.query)}</strong>"</p> <!--[-->`);
          const each_array = ensure_array_like(data.donantes);
          for (let i = 0, $$length = each_array.length; i < $$length; i++) {
            let donante = each_array[i];
            $$renderer3.push(`<a${attr("href", `/donante/${stringify(donante.id)}`)} class="card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-lg hover:border-primary-200 transition-all group animate-slide-up"${attr_style(`animation-delay: ${stringify(i * 0.05)}s`)}><div class="flex items-center gap-4"><div class="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center text-2xl font-display font-bold text-primary-600 group-hover:scale-110 transition-transform">${escape_html((donante.nombreNegocio || donante.nombre).charAt(0).toUpperCase())}</div> <div><h3 class="font-display font-semibold text-lg text-slate-900 group-hover:text-primary-600 transition-colors">${escape_html(donante.nombreNegocio || donante.nombre)}</h3> `);
            if (donante.nombreNegocio) {
              $$renderer3.push("<!--[-->");
              $$renderer3.push(`<p class="text-sm text-slate-500">${escape_html(donante.nombre)}</p>`);
            } else {
              $$renderer3.push("<!--[!-->");
            }
            $$renderer3.push(`<!--]--> <div class="flex items-center gap-2 mt-1">`);
            Badge($$renderer3, {
              variant: donante.tipo === "EMPRESA" ? "info" : "default",
              children: ($$renderer4) => {
                $$renderer4.push(`<!---->${escape_html(donante.tipo === "EMPRESA" ? "Empresa" : "Persona")}`);
              }
            });
            $$renderer3.push(`<!----> <span class="text-xs text-slate-400">${escape_html(donante.cantidadDonaciones)} aporte${escape_html(donante.cantidadDonaciones !== 1 ? "s" : "")}</span></div></div></div> <div class="text-right"><p class="text-sm text-slate-500">Total donado</p> <p class="text-2xl font-display font-bold text-primary-600">${escape_html(formatCurrency(donante.totalDonado))}</p></div></a>`);
          }
          $$renderer3.push(`<!--]--></div>`);
        }
        $$renderer3.push(`<!--]-->`);
      } else {
        $$renderer3.push("<!--[!-->");
        $$renderer3.push(`<div class="text-center py-12"><div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6"><svg class="w-10 h-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></div> <h3 class="font-display font-semibold text-lg text-slate-700 mb-2">Ingresa un término de búsqueda</h3> <p class="text-slate-500 max-w-md mx-auto">Puedes buscar por nombre de persona, nombre de empresa o negocio para ver su historial completo de donaciones.</p></div>`);
      }
      $$renderer3.push(`<!--]--></div>`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DyqzGUnx.js.map

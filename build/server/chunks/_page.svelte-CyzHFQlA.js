import { am as head, m as escape_html, j as attr, h as ensure_array_like, l as stringify, k as attr_class } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { f as formatCurrency, t as tipDonanteLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let search = data.filtros.search;
    let tipo = data.filtros.tipo;
    head("vhxxuf", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Donantes - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="page-title">Donantes</h1> <p class="text-slate-600 mt-1">${escape_html(data.pagination.total)} donante${escape_html(data.pagination.total !== 1 ? "s" : "")} registrado${escape_html(data.pagination.total !== 1 ? "s" : "")}</p></div> <a href="/admin/donantes/nuevo" class="btn btn-primary"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Nuevo Donante</a></div> <div class="card p-4"><div class="flex flex-col sm:flex-row gap-4"><div class="flex-1"><input type="text"${attr("value", search)} placeholder="Buscar por nombre..." class="input"/></div> `);
    $$renderer2.select({ value: tipo, class: "select w-full sm:w-48" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todos los tipos`);
      });
      $$renderer3.option({ value: "PERSONA" }, ($$renderer4) => {
        $$renderer4.push(`Persona`);
      });
      $$renderer3.option({ value: "EMPRESA" }, ($$renderer4) => {
        $$renderer4.push(`Empresa`);
      });
    });
    $$renderer2.push(` <button class="btn btn-primary">Buscar</button></div></div> `);
    if (data.donantes.length === 0) {
      $$renderer2.push("<!--[-->");
      EmptyState($$renderer2, {
        title: "No hay donantes",
        description: "No se encontraron donantes con los filtros aplicados.",
        icon: "👥",
        actionLabel: "Agregar donante",
        actionHref: "/admin/donantes/nuevo"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="card overflow-hidden"><table class="table"><thead><tr><th>Nombre</th><th>Tipo</th><th>Contacto</th><th class="text-center">Aportes</th><th class="text-right">Total</th><th>Estado</th><th></th></tr></thead><tbody><!--[-->`);
      const each_array = ensure_array_like(data.donantes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let donante = each_array[$$index];
        $$renderer2.push(`<tr><td><div><p class="font-medium text-slate-900">${escape_html(donante.nombreNegocio || donante.nombre)}</p> `);
        if (donante.nombreNegocio) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-xs text-slate-500">${escape_html(donante.nombre)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td>`);
        Badge($$renderer2, {
          variant: donante.tipo === "EMPRESA" ? "info" : "default",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(tipDonanteLabels[donante.tipo])}`);
          }
        });
        $$renderer2.push(`<!----></td><td><div class="text-sm">`);
        if (donante.telefono) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p>${escape_html(donante.telefono)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (donante.email) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<p class="text-slate-500">${escape_html(donante.email)}</p>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--> `);
        if (!donante.telefono && !donante.email) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-slate-400">-</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div></td><td class="text-center">${escape_html(donante.totalAportes)}</td><td class="text-right font-bold text-primary-600">${escape_html(formatCurrency(donante.totalDonado))}</td><td>`);
        Badge($$renderer2, {
          variant: donante.activo ? "success" : "danger",
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(donante.activo ? "Activo" : "Inactivo")}`);
          }
        });
        $$renderer2.push(`<!----></td><td><a${attr("href", `/admin/donantes/${stringify(donante.id)}`)} class="text-primary-600 hover:underline text-sm">Editar</a></td></tr>`);
      }
      $$renderer2.push(`<!--]--></tbody></table></div> `);
      if (data.pagination.totalPages > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-center gap-2"><!--[-->`);
        const each_array_1 = ensure_array_like(Array(data.pagination.totalPages));
        for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
          each_array_1[i];
          $$renderer2.push(`<a${attr("href", `/admin/donantes?page=${stringify(i + 1)}&q=${stringify(search)}&tipo=${stringify(tipo)}`)}${attr_class(`w-10 h-10 rounded-lg flex items-center justify-center ${stringify(data.pagination.page === i + 1 ? "bg-primary-600 text-white" : "bg-white border border-slate-200 hover:bg-slate-50")}`)}>${escape_html(i + 1)}</a>`);
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
//# sourceMappingURL=_page.svelte-CyzHFQlA.js.map

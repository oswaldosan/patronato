import { am as head, m as escape_html, h as ensure_array_like, k as attr_class, l as stringify, j as attr } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { E as EmptyState } from './EmptyState-D9JcMxy5.js';
import { d as formatDateTime } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data } = $$props;
    let entity = data.filtros.entity;
    let action = data.filtros.action;
    let expandedId = null;
    const actionLabels = { CREATE: "Crear", UPDATE: "Actualizar", DELETE: "Eliminar" };
    const actionVariants = { CREATE: "success", UPDATE: "info", DELETE: "danger" };
    head("tqjeeb", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Auditoría - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="space-y-6"><div><h1 class="page-title">Registro de Auditoría</h1> <p class="text-slate-600 mt-1">${escape_html(data.pagination.total)} registro${escape_html(data.pagination.total !== 1 ? "s" : "")} de actividad</p></div> <div class="card p-4"><div class="flex flex-col sm:flex-row gap-4">`);
    $$renderer2.select({ value: entity, class: "select flex-1" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todas las entidades`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(data.entities);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let e = each_array[$$index];
        $$renderer3.option({ value: e }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(e)}`);
        });
      }
      $$renderer3.push(`<!--]-->`);
    });
    $$renderer2.push(` `);
    $$renderer2.select({ value: action, class: "select w-full sm:w-40" }, ($$renderer3) => {
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Todas las acciones`);
      });
      $$renderer3.option({ value: "CREATE" }, ($$renderer4) => {
        $$renderer4.push(`Crear`);
      });
      $$renderer3.option({ value: "UPDATE" }, ($$renderer4) => {
        $$renderer4.push(`Actualizar`);
      });
      $$renderer3.option({ value: "DELETE" }, ($$renderer4) => {
        $$renderer4.push(`Eliminar`);
      });
    });
    $$renderer2.push(` <button class="btn btn-primary">Filtrar</button></div></div> `);
    if (data.logs.length === 0) {
      $$renderer2.push("<!--[-->");
      EmptyState($$renderer2, {
        title: "Sin registros",
        description: "No hay actividad registrada con los filtros seleccionados.",
        icon: "📋"
      });
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="space-y-2"><!--[-->`);
      const each_array_1 = ensure_array_like(data.logs);
      for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
        let log = each_array_1[$$index_1];
        $$renderer2.push(`<div class="card overflow-hidden"><button class="w-full p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors text-left"><div${attr_class(`w-10 h-10 rounded-full flex items-center justify-center ${stringify(log.action === "CREATE" ? "bg-green-100 text-green-600" : log.action === "UPDATE" ? "bg-blue-100 text-blue-600" : "bg-red-100 text-red-600")}`)}>`);
        if (log.action === "CREATE") {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`+`);
        } else if (log.action === "UPDATE") {
          $$renderer2.push("<!--[1-->");
          $$renderer2.push(`✎`);
        } else {
          $$renderer2.push("<!--[!-->");
          $$renderer2.push(`×`);
        }
        $$renderer2.push(`<!--]--></div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2 flex-wrap">`);
        Badge($$renderer2, {
          variant: actionVariants[log.action],
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(actionLabels[log.action])}`);
          }
        });
        $$renderer2.push(`<!----> <span class="font-medium text-slate-900">${escape_html(log.entity)}</span> <span class="text-xs text-slate-400 font-mono">${escape_html(log.entityId.slice(-8))}</span></div> <p class="text-sm text-slate-500 mt-1">${escape_html(log.user)} • ${escape_html(formatDateTime(log.createdAt))}</p></div> <svg${attr_class(`w-5 h-5 text-slate-400 transition-transform ${stringify(expandedId === log.id ? "rotate-180" : "")}`)} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button> `);
        if (expandedId === log.id) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<div class="px-4 pb-4 border-t border-slate-100 bg-slate-50"><div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">`);
          if (log.oldData) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div><p class="text-xs font-medium text-slate-500 mb-2">Datos anteriores</p> <pre class="text-xs bg-white p-3 rounded-lg border border-slate-200 overflow-auto max-h-60">${escape_html(JSON.stringify(log.oldData, null, 2))}</pre></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--> `);
          if (log.newData) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<div><p class="text-xs font-medium text-slate-500 mb-2">Datos nuevos</p> <pre class="text-xs bg-white p-3 rounded-lg border border-slate-200 overflow-auto max-h-60">${escape_html(JSON.stringify(log.newData, null, 2))}</pre></div>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div> <div class="mt-4 text-xs text-slate-500"><p>ID completo: ${escape_html(log.id)}</p> `);
          if (log.ip) {
            $$renderer2.push("<!--[-->");
            $$renderer2.push(`<p>IP: ${escape_html(log.ip)}</p>`);
          } else {
            $$renderer2.push("<!--[!-->");
          }
          $$renderer2.push(`<!--]--></div></div>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></div>`);
      }
      $$renderer2.push(`<!--]--></div> `);
      if (data.pagination.totalPages > 1) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex justify-center gap-2"><!--[-->`);
        const each_array_2 = ensure_array_like(Array(Math.min(data.pagination.totalPages, 10)));
        for (let i = 0, $$length = each_array_2.length; i < $$length; i++) {
          each_array_2[i];
          $$renderer2.push(`<a${attr("href", `/admin/auditoria?page=${stringify(i + 1)}&entity=${stringify(entity)}&action=${stringify(action)}`)}${attr_class(`w-10 h-10 rounded-lg flex items-center justify-center ${stringify(data.pagination.page === i + 1 ? "bg-primary-600 text-white" : "bg-white border border-slate-200 hover:bg-slate-50")}`)}>${escape_html(i + 1)}</a>`);
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
//# sourceMappingURL=_page.svelte-rsOb4pCr.js.map

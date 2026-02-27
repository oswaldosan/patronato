import { b as attr_class, d as escape_html, j as bind_props, s as stringify, h as head, e as ensure_array_like, i as attr_style, a as attr } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import { B as Badge } from "../../../../chunks/Badge.js";
import { f as formatCurrency } from "../../../../chunks/format.js";
function Modal($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { open = false, title, size = "md", onClose, children, footer } = $$props;
    const sizeClasses = {
      sm: "max-w-sm",
      md: "max-w-lg",
      lg: "max-w-2xl",
      xl: "max-w-4xl"
    };
    if (open) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true"><div class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm animate-fade-in"></div> <div class="flex min-h-full items-center justify-center p-4"><div${attr_class(`relative w-full ${stringify(sizeClasses[size])} bg-white rounded-2xl shadow-2xl animate-scale-in`)}>`);
      if (title) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="flex items-center justify-between px-6 py-4 border-b border-slate-200"><h3 class="text-lg font-display font-semibold text-slate-900">${escape_html(title)}</h3> <button class="p-2 rounded-lg hover:bg-slate-100 transition-colors"><svg class="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg></button></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> <div class="px-6 py-4 max-h-[70vh] overflow-y-auto">`);
      children($$renderer2);
      $$renderer2.push(`<!----></div> `);
      if (footer) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="px-6 py-4 border-t border-slate-200 bg-slate-50 rounded-b-2xl">`);
        footer($$renderer2);
        $$renderer2.push(`<!----></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { open });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let showNewModal = false;
    let editingRubro = null;
    let deletingId = null;
    let nombre = "";
    let descripcion = "";
    let color = "#22c55e";
    let icono = "";
    let orden = 0;
    let activo = true;
    function closeModals() {
      showNewModal = false;
      editingRubro = null;
      deletingId = null;
    }
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("4i07c8", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Rubros - Admin</title>`);
        });
      });
      $$renderer3.push(`<div class="space-y-6"><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"><div><h1 class="page-title">Rubros / Categorías</h1> <p class="text-slate-600 mt-1">${escape_html(data.rubros.length)} rubros registrados</p></div> <button class="btn btn-primary"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg> Nuevo Rubro</button></div> `);
      if (form?.error) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> `);
      if (form?.success) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">Operación realizada correctamente</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      const each_array = ensure_array_like(data.rubros);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let rubro = each_array[$$index];
        $$renderer3.push(`<div${attr_class(`card p-5 hover:shadow-md transition-shadow ${stringify(!rubro.activo ? "opacity-60" : "")}`)}><div class="flex items-start justify-between mb-3"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"${attr_style(`background-color: ${stringify(rubro.color)}`)}>${escape_html(rubro.icono || rubro.nombre.charAt(0))}</div> <div><h3 class="font-medium text-slate-900">${escape_html(rubro.nombre)}</h3> `);
        if (rubro.descripcion) {
          $$renderer3.push("<!--[-->");
          $$renderer3.push(`<p class="text-xs text-slate-500">${escape_html(rubro.descripcion)}</p>`);
        } else {
          $$renderer3.push("<!--[!-->");
        }
        $$renderer3.push(`<!--]--></div></div> `);
        Badge($$renderer3, {
          variant: rubro.activo ? "success" : "danger",
          children: ($$renderer4) => {
            $$renderer4.push(`<!---->${escape_html(rubro.activo ? "Activo" : "Inactivo")}`);
          }
        });
        $$renderer3.push(`<!----></div> <div class="grid grid-cols-2 gap-4 mb-4 text-sm"><div><p class="text-slate-500">Aportes</p> <p class="font-semibold text-slate-900">${escape_html(rubro.totalAportes)}</p></div> <div><p class="text-slate-500">Recaudado</p> <p class="font-semibold text-primary-600">${escape_html(formatCurrency(rubro.totalRecaudado))}</p></div></div> <div class="flex gap-2 pt-3 border-t border-slate-100"><button class="flex-1 btn btn-sm btn-secondary">Editar</button> <button class="btn btn-sm btn-outline text-red-600 border-red-200 hover:bg-red-50"${attr("disabled", rubro.totalAportes > 0, true)}>Eliminar</button></div></div>`);
      }
      $$renderer3.push(`<!--]--></div></div> `);
      Modal($$renderer3, {
        title: "Nuevo Rubro",
        onClose: closeModals,
        get open() {
          return showNewModal;
        },
        set open($$value) {
          showNewModal = $$value;
          $$settled = false;
        },
        children: ($$renderer4) => {
          $$renderer4.push(`<form method="POST" action="?/create" class="space-y-4"><div><label for="new-nombre" class="label">Nombre *</label> <input type="text" id="new-nombre" name="nombre"${attr("value", nombre)} class="input" required=""/></div> <div><label for="new-descripcion" class="label">Descripción</label> <input type="text" id="new-descripcion" name="descripcion"${attr("value", descripcion)} class="input"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="new-color" class="label">Color</label> <div class="flex gap-2"><input type="color" id="new-color" name="color"${attr("value", color)} class="w-12 h-10 rounded-lg cursor-pointer"/> <input type="text"${attr("value", color)} class="input flex-1"/></div></div> <div><label for="new-orden" class="label">Orden</label> <input type="number" id="new-orden" name="orden"${attr("value", orden)} class="input" min="0"/></div></div> <div><label for="new-icono" class="label">Ícono (emoji)</label> <input type="text" id="new-icono" name="icono"${attr("value", icono)} class="input" placeholder="🏪"/></div> <div class="flex justify-end gap-3 pt-4"><button type="button" class="btn btn-secondary">Cancelar</button> <button type="submit" class="btn btn-primary">Crear</button></div></form>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Modal($$renderer3, {
        open: !!editingRubro,
        title: "Editar Rubro",
        onClose: closeModals,
        children: ($$renderer4) => {
          if (editingRubro) {
            $$renderer4.push("<!--[-->");
            $$renderer4.push(`<form method="POST" action="?/update" class="space-y-4"><input type="hidden" name="id"${attr("value", editingRubro.id)}/> <div><label for="edit-nombre" class="label">Nombre *</label> <input type="text" id="edit-nombre" name="nombre"${attr("value", nombre)} class="input" required=""/></div> <div><label for="edit-descripcion" class="label">Descripción</label> <input type="text" id="edit-descripcion" name="descripcion"${attr("value", descripcion)} class="input"/></div> <div class="grid grid-cols-2 gap-4"><div><label for="edit-color" class="label">Color</label> <div class="flex gap-2"><input type="color" id="edit-color" name="color"${attr("value", color)} class="w-12 h-10 rounded-lg cursor-pointer"/> <input type="text"${attr("value", color)} class="input flex-1"/></div></div> <div><label for="edit-orden" class="label">Orden</label> <input type="number" id="edit-orden" name="orden"${attr("value", orden)} class="input" min="0"/></div></div> <div><label for="edit-icono" class="label">Ícono (emoji)</label> <input type="text" id="edit-icono" name="icono"${attr("value", icono)} class="input" placeholder="🏪"/></div> <div><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="activo"${attr("checked", activo, true)} class="w-4 h-4 rounded text-primary-600"/> <span class="text-sm font-medium">Rubro activo</span></label></div> <div class="flex justify-end gap-3 pt-4"><button type="button" class="btn btn-secondary">Cancelar</button> <button type="submit" class="btn btn-primary">Guardar</button></div></form>`);
          } else {
            $$renderer4.push("<!--[!-->");
          }
          $$renderer4.push(`<!--]-->`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!----> `);
      Modal($$renderer3, {
        open: !!deletingId,
        title: "¿Eliminar rubro?",
        onClose: closeModals,
        children: ($$renderer4) => {
          $$renderer4.push(`<p class="text-slate-600 mb-6">Esta acción no se puede deshacer. Solo puedes eliminar rubros sin aportes asociados.</p> <div class="flex justify-end gap-3"><button class="btn btn-secondary">Cancelar</button> <form method="POST" action="?/delete"><input type="hidden" name="id"${attr("value", deletingId)}/> <button type="submit" class="btn btn-danger">Eliminar</button></form></div>`);
        },
        $$slots: { default: true }
      });
      $$renderer3.push(`<!---->`);
    }
    do {
      $$settled = true;
      $$inner_renderer = $$renderer2.copy();
      $$render_inner($$inner_renderer);
    } while (!$$settled);
    $$renderer2.subsume($$inner_renderer);
  });
}
export {
  _page as default
};

import { a as attr, b as attr_class, s as stringify, d as escape_html, j as bind_props, f as derived, h as head, e as ensure_array_like } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
function Combobox($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      options,
      value = "",
      placeholder = "Seleccionar...",
      name,
      required = false,
      disabled = false
    } = $$props;
    const selectedOption = derived(() => options.find((o) => o.value === value));
    $$renderer2.push(`<div class="combobox-container relative"><input type="hidden"${attr("name", name)}${attr("value", value)}/> <div class="relative">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<button type="button"${attr("disabled", disabled, true)}${attr_class(`input w-full text-left pr-10 ${stringify(disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer")} ${stringify(!selectedOption() ? "text-slate-400" : "")}`)}>`);
      if (selectedOption()) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="block truncate">${escape_html(selectedOption().label)} `);
        if (selectedOption().sublabel) {
          $$renderer2.push("<!--[-->");
          $$renderer2.push(`<span class="text-slate-500">(${escape_html(selectedOption().sublabel)})</span>`);
        } else {
          $$renderer2.push("<!--[!-->");
        }
        $$renderer2.push(`<!--]--></span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="block truncate">${escape_html(placeholder)}</span>`);
      }
      $$renderer2.push(`<!--]--></button>`);
    }
    $$renderer2.push(`<!--]--> <span class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><svg class="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></span></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
    bind_props($$props, { value });
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let loading = false;
    let donanteId = data.preselectedDonante || "";
    const donanteOptions = derived(() => data.donantes.map((d) => ({
      value: d.id,
      label: d.nombreNegocio || d.nombre,
      sublabel: d.nombreNegocio ? d.nombre : void 0
    })));
    let $$settled = true;
    let $$inner_renderer;
    function $$render_inner($$renderer3) {
      head("je07ob", $$renderer3, ($$renderer4) => {
        $$renderer4.title(($$renderer5) => {
          $$renderer5.push(`<title>Nuevo Aporte - Admin</title>`);
        });
      });
      $$renderer3.push(`<div class="max-w-2xl mx-auto"><div class="mb-8"><a href="/admin/aportes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a aportes</a> <h1 class="page-title">Registrar Aporte</h1></div> `);
      if (form?.error) {
        $$renderer3.push("<!--[-->");
        $$renderer3.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
      } else {
        $$renderer3.push("<!--[!-->");
      }
      $$renderer3.push(`<!--]--> <form method="POST" class="card p-6 space-y-6"><div><label for="donanteId" class="label">Donante *</label> `);
      Combobox($$renderer3, {
        name: "donanteId",
        options: donanteOptions(),
        placeholder: "Buscar donante...",
        required: true,
        get value() {
          return donanteId;
        },
        set value($$value) {
          donanteId = $$value;
          $$settled = false;
        }
      });
      $$renderer3.push(`<!----> <p class="text-xs text-slate-500 mt-1">¿Donante nuevo? <a href="/admin/donantes/nuevo" class="text-primary-600 hover:underline">Crear primero</a></p></div> <div><label for="rubroId" class="label">Rubro / Categoría *</label> <select id="rubroId" name="rubroId" class="select" required="">`);
      $$renderer3.option({ value: "" }, ($$renderer4) => {
        $$renderer4.push(`Seleccionar rubro...`);
      });
      $$renderer3.push(`<!--[-->`);
      const each_array = ensure_array_like(data.rubros);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let rubro = each_array[$$index];
        $$renderer3.option({ value: rubro.id }, ($$renderer4) => {
          $$renderer4.push(`${escape_html(rubro.nombre)}`);
        });
      }
      $$renderer3.push(`<!--]--></select></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="fecha" class="label">Fecha *</label> <input type="date" id="fecha" name="fecha"${attr("value", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="input" required=""/></div> <div><label for="monto" class="label">Monto *</label> <input type="number" id="monto" name="monto" step="0.01" min="0.01" class="input" placeholder="0.00" required=""/></div></div> <div><label for="metodo" class="label">Método de pago *</label> <select id="metodo" name="metodo" class="select" required="">`);
      $$renderer3.option({ value: "DEPOSITO" }, ($$renderer4) => {
        $$renderer4.push(`Depósito Bancario`);
      });
      $$renderer3.option({ value: "TRANSFERENCIA" }, ($$renderer4) => {
        $$renderer4.push(`Transferencia`);
      });
      $$renderer3.option({ value: "EFECTIVO" }, ($$renderer4) => {
        $$renderer4.push(`Efectivo`);
      });
      $$renderer3.option({ value: "CHEQUE" }, ($$renderer4) => {
        $$renderer4.push(`Cheque`);
      });
      $$renderer3.option({ value: "OTRO" }, ($$renderer4) => {
        $$renderer4.push(`Otro`);
      });
      $$renderer3.push(`</select></div> <div><label for="referencia" class="label">Número de referencia <span class="text-slate-400 font-normal">(privado)</span></label> <input type="text" id="referencia" name="referencia" class="input" placeholder="Ej: Número de depósito, boleta, etc."/></div> <div><label for="comentario" class="label">Comentario</label> <textarea id="comentario" name="comentario" rows="2" class="input" placeholder="Notas adicionales..."></textarea></div> <div><label for="estado" class="label">Estado inicial</label> <select id="estado" name="estado" class="select">`);
      $$renderer3.option({ value: "PENDIENTE" }, ($$renderer4) => {
        $$renderer4.push(`Pendiente de verificación`);
      });
      $$renderer3.option({ value: "VERIFICADO" }, ($$renderer4) => {
        $$renderer4.push(`Verificado`);
      });
      $$renderer3.push(`</select></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><a href="/admin/aportes" class="btn btn-secondary">Cancelar</a> <button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Registrar Aporte")}</button></div></form></div>`);
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

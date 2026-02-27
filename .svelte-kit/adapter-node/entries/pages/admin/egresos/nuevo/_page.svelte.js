import { h as head, d as escape_html, a as attr, e as ensure_array_like } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let loading = false;
    head("17erdkn", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nuevo Egreso - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-2xl mx-auto"><div class="mb-8"><a href="/admin/egresos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a egresos</a> <h1 class="page-title">Registrar Egreso</h1></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="card p-6 space-y-6"><div><label for="concepto" class="label">Concepto / Descripción *</label> <input type="text" id="concepto" name="concepto"${attr("value", form?.data?.concepto ?? "")} class="input" placeholder="Ej: Compra de materiales, pago de mano de obra..." required=""/></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="fecha" class="label">Fecha *</label> <input type="date" id="fecha" name="fecha"${attr("value", (/* @__PURE__ */ new Date()).toISOString().split("T")[0])} class="input" required=""/></div> <div><label for="monto" class="label">Monto *</label> <input type="number" id="monto" name="monto" step="0.01" min="0.01" class="input" placeholder="0.00" required=""/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="rubroId" class="label">Rubro / Categoría *</label> `);
    $$renderer2.select(
      {
        id: "rubroId",
        name: "rubroId",
        class: "select",
        required: true,
        value: form?.data?.rubroId ?? ""
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "", disabled: true, hidden: true }, ($$renderer4) => {
          $$renderer4.push(`Selecciona un rubro`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(data.rubros);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let rubro = each_array[$$index];
          $$renderer3.option({ value: rubro.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(rubro.nombre)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="proveedorId" class="label">Proveedor</label> `);
    $$renderer2.select(
      {
        id: "proveedorId",
        name: "proveedorId",
        class: "select",
        value: form?.data?.proveedorId ?? ""
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "" }, ($$renderer4) => {
          $$renderer4.push(`Sin proveedor registrado`);
        });
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(data.proveedores);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let proveedor = each_array_1[$$index_1];
          $$renderer3.option({ value: proveedor.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(proveedor.nombre)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div><label for="referencia" class="label">Número de factura/comprobante <span class="text-slate-400 font-normal">(privado)</span></label> <input type="text" id="referencia" name="referencia" class="input" placeholder="Número de factura, recibo, etc."/></div> <div><label for="notas" class="label">Notas</label> <textarea id="notas" name="notas" rows="2" class="input" placeholder="Notas adicionales..."></textarea></div> <div><label for="estado" class="label">Estado inicial</label> <select id="estado" name="estado" class="select">`);
    $$renderer2.option({ value: "PENDIENTE" }, ($$renderer3) => {
      $$renderer3.push(`Pendiente de verificación`);
    });
    $$renderer2.option({ value: "VERIFICADO" }, ($$renderer3) => {
      $$renderer3.push(`Verificado`);
    });
    $$renderer2.push(`</select></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><a href="/admin/egresos" class="btn btn-secondary">Cancelar</a> <button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Registrar Egreso")}</button></div></form></div>`);
  });
}
export {
  _page as default
};

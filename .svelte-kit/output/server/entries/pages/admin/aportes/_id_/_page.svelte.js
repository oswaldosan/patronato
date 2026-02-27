import { h as head, d as escape_html, e as ensure_array_like, a as attr, s as stringify, i as attr_style } from "../../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../../chunks/exports.js";
import "../../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../../chunks/root.js";
import "../../../../../chunks/state.svelte.js";
import { B as Badge } from "../../../../../chunks/Badge.js";
import { f as formatCurrency, c as formatDateTime, e as estadoAporteLabels } from "../../../../../chunks/format.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let loading = false;
    const estadoVariant = (e) => {
      switch (e) {
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
    head("158hwc3", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Aporte #${escape_html(data.aporte.id.slice(-6))} - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto"><div class="mb-8"><a href="/admin/aportes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a aportes</a> <div class="flex items-center justify-between"><div><h1 class="page-title">Detalle del Aporte</h1> <p class="text-slate-600 mt-1">ID: ${escape_html(data.aporte.id)}</p></div> `);
    Badge($$renderer2, {
      variant: estadoVariant(data.aporte.estado),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(estadoAporteLabels[data.aporte.estado])}`);
      }
    });
    $$renderer2.push(`<!----></div></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.success) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">${escape_html(form.verified ? "Aporte verificado correctamente" : form.cancelled ? "Aporte anulado" : "Aporte actualizado correctamente")}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><form method="POST" action="?/update" class="card p-6 space-y-6"><div><label for="donanteId" class="label">Donante *</label> `);
    $$renderer2.select(
      {
        id: "donanteId",
        name: "donanteId",
        value: data.aporte.donanteId,
        class: "select",
        required: true
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(data.donantes);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let donante = each_array[$$index];
          $$renderer3.option({ value: donante.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(donante.nombreNegocio || donante.nombre)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label for="rubroId" class="label">Rubro *</label> `);
    $$renderer2.select(
      {
        id: "rubroId",
        name: "rubroId",
        value: data.aporte.rubroId,
        class: "select",
        required: true
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(data.rubros);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let rubro = each_array_1[$$index_1];
          $$renderer3.option({ value: rubro.id }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(rubro.nombre)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="fecha" class="label">Fecha *</label> <input type="date" id="fecha" name="fecha"${attr("value", data.aporte.fecha)} class="input" required=""/></div> <div><label for="monto" class="label">Monto *</label> <input type="number" id="monto" name="monto" step="0.01" min="0.01"${attr("value", data.aporte.monto)} class="input" required=""/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="metodo" class="label">Método de pago *</label> `);
    $$renderer2.select(
      {
        id: "metodo",
        name: "metodo",
        value: data.aporte.metodo,
        class: "select",
        required: true
      },
      ($$renderer3) => {
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
      }
    );
    $$renderer2.push(`</div> <div><label for="estado" class="label">Estado *</label> `);
    $$renderer2.select(
      {
        id: "estado",
        name: "estado",
        value: data.aporte.estado,
        class: "select",
        required: true
      },
      ($$renderer3) => {
        $$renderer3.option({ value: "PENDIENTE" }, ($$renderer4) => {
          $$renderer4.push(`Pendiente`);
        });
        $$renderer3.option({ value: "VERIFICADO" }, ($$renderer4) => {
          $$renderer4.push(`Verificado`);
        });
        $$renderer3.option({ value: "ANULADO" }, ($$renderer4) => {
          $$renderer4.push(`Anulado`);
        });
      }
    );
    $$renderer2.push(`</div></div> <div><label for="referencia" class="label">Referencia <span class="text-slate-400 font-normal">(privado)</span></label> <input type="text" id="referencia" name="referencia"${attr("value", data.aporte.referencia ?? "")} class="input"/></div> <div><label for="comentario" class="label">Comentario</label> <textarea id="comentario" name="comentario" rows="2" class="input">`);
    const $$body = escape_html(data.aporte.comentario ?? "");
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Guardar Cambios")}</button></div></form></div> <div class="space-y-6"><div class="card p-6"><h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3> <div class="space-y-4 text-sm"><div><p class="text-slate-500">Monto</p> <p class="text-2xl font-bold text-primary-600">${escape_html(formatCurrency(data.aporte.monto))}</p></div> <div><p class="text-slate-500">Donante</p> <a${attr("href", `/admin/donantes/${stringify(data.aporte.donante.id)}`)} class="font-medium text-primary-600 hover:underline">${escape_html(data.aporte.donante.nombreNegocio || data.aporte.donante.nombre)}</a></div> <div><p class="text-slate-500">Rubro</p> <div class="flex items-center gap-2"><div class="w-3 h-3 rounded-full"${attr_style(`background-color: ${stringify(data.aporte.rubro.color)}`)}></div> <span class="font-medium">${escape_html(data.aporte.rubro.nombre)}</span></div></div> <div><p class="text-slate-500">Creado</p> <p class="font-medium">${escape_html(formatDateTime(data.aporte.createdAt))}</p></div> <div><p class="text-slate-500">Actualizado</p> <p class="font-medium">${escape_html(formatDateTime(data.aporte.updatedAt))}</p></div></div></div> <div class="card p-6 space-y-3"><h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3> `);
    if (data.aporte.estado === "PENDIENTE") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" action="?/verify"><button type="submit" class="btn btn-primary w-full">✓ Verificar Aporte</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.aporte.estado !== "ANULADO") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" action="?/cancel"><button type="submit" class="btn btn-secondary w-full">✗ Anular Aporte</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <button class="btn btn-danger w-full">🗑 Eliminar</button></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}
export {
  _page as default
};

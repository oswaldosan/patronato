import { am as head, m as escape_html, j as attr, h as ensure_array_like, an as attr_style } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { f as formatCurrency, d as formatDateTime, g as estadoEgresoLabels } from './format-OIrQpM7m.js';

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
    head("1xmqodr", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Egreso #${escape_html(data.egreso.id.slice(-6))} - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto"><div class="mb-8"><a href="/admin/egresos" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a egresos</a> <div class="flex items-center justify-between"><div><h1 class="page-title">Detalle del Egreso</h1> <p class="text-slate-600 mt-1">ID: ${escape_html(data.egreso.id)}</p></div> `);
    Badge($$renderer2, {
      variant: estadoVariant(data.egreso.estado),
      children: ($$renderer3) => {
        $$renderer3.push(`<!---->${escape_html(estadoEgresoLabels[data.egreso.estado])}`);
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
      $$renderer2.push(`<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">${escape_html(form.verified ? "Egreso verificado correctamente" : form.cancelled ? "Egreso anulado" : "Egreso actualizado correctamente")}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><form method="POST" action="?/update" class="card p-6 space-y-6"><div><label for="concepto" class="label">Concepto *</label> <input type="text" id="concepto" name="concepto"${attr("value", data.egreso.concepto)} class="input" required=""/></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="fecha" class="label">Fecha *</label> <input type="date" id="fecha" name="fecha"${attr("value", data.egreso.fecha)} class="input" required=""/></div> <div><label for="monto" class="label">Monto *</label> <input type="number" id="monto" name="monto" step="0.01" min="0.01"${attr("value", data.egreso.monto)} class="input" required=""/></div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="rubroId" class="label">Rubro *</label> `);
    $$renderer2.select(
      {
        id: "rubroId",
        name: "rubroId",
        class: "select",
        value: data.egreso.rubroId,
        required: true
      },
      ($$renderer3) => {
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
        value: data.egreso.proveedorId ?? ""
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
    $$renderer2.push(`</div></div> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="referencia" class="label">Referencia</label> <input type="text" id="referencia" name="referencia"${attr("value", data.egreso.referencia ?? "")} class="input"/></div> <div><label for="estado" class="label">Estado *</label> `);
    $$renderer2.select(
      {
        id: "estado",
        name: "estado",
        value: data.egreso.estado,
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
    $$renderer2.push(`</div></div> <div><label for="notas" class="label">Notas</label> <textarea id="notas" name="notas" rows="2" class="input">`);
    const $$body = escape_html(data.egreso.notas ?? "");
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Guardar Cambios")}</button></div></form></div> <div class="space-y-6"><div class="card p-6"><h3 class="font-display font-semibold text-slate-800 mb-4">Información</h3> <div class="space-y-4 text-sm"><div><p class="text-slate-500">Monto</p> <p class="text-2xl font-bold text-red-600">${escape_html(formatCurrency(data.egreso.monto))}</p></div> `);
    if (data.egreso.rubroNombre) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><p class="text-slate-500">Rubro</p> <p class="font-medium flex items-center gap-2"><span class="inline-flex w-2.5 h-2.5 rounded-full"${attr_style(`background:${data.egreso.rubroColor}`)}></span> ${escape_html(data.egreso.rubroNombre)}</p></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div><p class="text-slate-500">Creado</p> <p class="font-medium">${escape_html(formatDateTime(data.egreso.createdAt))}</p></div> <div><p class="text-slate-500">Actualizado</p> <p class="font-medium">${escape_html(formatDateTime(data.egreso.updatedAt))}</p></div></div></div> <div class="card p-6 space-y-3"><h3 class="font-display font-semibold text-slate-800 mb-4">Acciones</h3> `);
    if (data.egreso.estado === "PENDIENTE") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" action="?/verify"><button type="submit" class="btn btn-primary w-full">✓ Verificar Egreso</button></form>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (data.egreso.estado !== "ANULADO") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<form method="POST" action="?/cancel"><button type="submit" class="btn btn-secondary w-full">✗ Anular Egreso</button></form>`);
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

export { _page as default };
//# sourceMappingURL=_page.svelte-aESJnU9C.js.map

import { am as head, m as escape_html, j as attr, l as stringify, h as ensure_array_like } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';
import { B as Badge } from './Badge-iToL1tb1.js';
import { f as formatCurrency, b as formatDateShort, e as estadoAporteLabels } from './format-OIrQpM7m.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { data, form } = $$props;
    let loading = false;
    let tipo = data.donante.tipo;
    const estadoVariant = (estado) => {
      switch (estado) {
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
    head("8u2la7", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Editar ${escape_html(data.donante.nombreNegocio || data.donante.nombre)} - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-4xl mx-auto"><div class="mb-8"><a href="/admin/donantes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a donantes</a> <div class="flex items-center justify-between"><h1 class="page-title">Editar Donante</h1> <button class="btn btn-danger btn-sm">Eliminar</button></div></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (form?.success) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm">Donante actualizado correctamente</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><form method="POST" action="?/update" class="card p-6 space-y-6"><div><label class="label">Tipo de donante</label> <div class="flex gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="PERSONA"${attr("checked", tipo === "PERSONA", true)} class="w-4 h-4 text-primary-600"/> <span>Persona</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="EMPRESA"${attr("checked", tipo === "EMPRESA", true)} class="w-4 h-4 text-primary-600"/> <span>Empresa</span></label></div></div> <div><label for="nombre" class="label">${escape_html(tipo === "EMPRESA" ? "Nombre del representante" : "Nombre completo")} *</label> <input type="text" id="nombre" name="nombre"${attr("value", data.donante.nombre)} class="input" required=""/></div> <div><label for="identificacion" class="label">Identidad / RTN *</label> <input type="text" id="identificacion" name="identificacion"${attr("value", data.donante.identificacion)} class="input" required=""/> <p class="text-xs text-slate-500 mt-1">Debe coincidir con el documento oficial.</p></div> `);
    if (tipo === "EMPRESA") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><label for="nombreNegocio" class="label">Nombre del negocio/empresa</label> <input type="text" id="nombreNegocio" name="nombreNegocio"${attr("value", data.donante.nombreNegocio ?? "")} class="input"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="telefono" class="label">Teléfono</label> <input type="tel" id="telefono" name="telefono"${attr("value", data.donante.telefono ?? "")} class="input"/></div> <div><label for="email" class="label">Email</label> <input type="email" id="email" name="email"${attr("value", data.donante.email ?? "")} class="input"/></div></div> <div><label for="direccion" class="label">Dirección</label> <input type="text" id="direccion" name="direccion"${attr("value", data.donante.direccion ?? "")} class="input"/></div> <div><label for="notas" class="label">Notas</label> <textarea id="notas" name="notas" rows="3" class="input">`);
    const $$body = escape_html(data.donante.notas ?? "");
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div><label class="flex items-center gap-2 cursor-pointer"><input type="checkbox" name="activo"${attr("checked", data.donante.activo, true)} class="w-4 h-4 rounded text-primary-600"/> <span class="text-sm font-medium">Donante activo</span></label></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Guardar Cambios")}</button></div></form></div> <div class="space-y-6"><div class="card p-6"><h3 class="font-display font-semibold text-slate-800 mb-4">Resumen</h3> <div class="space-y-4"><div><p class="text-sm text-slate-500">Total donado</p> <p class="text-2xl font-bold text-primary-600">${escape_html(formatCurrency(data.totalDonado))}</p></div> <div><p class="text-sm text-slate-500">Total aportes</p> <p class="text-lg font-semibold text-slate-900">${escape_html(data.aportes.length)}</p></div></div> <div class="mt-4 pt-4 border-t border-slate-200"><a${attr("href", `/admin/aportes/nuevo?donante=${stringify(data.donante.id)}`)} class="btn btn-primary w-full">+ Nuevo Aporte</a></div></div> <div class="card overflow-hidden"><div class="px-6 py-4 border-b border-slate-200"><h3 class="font-display font-semibold text-slate-800">Historial</h3></div> `);
    if (data.aportes.length === 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="p-6 text-center text-slate-500 text-sm">Sin aportes registrados</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="divide-y divide-slate-100 max-h-96 overflow-y-auto"><!--[-->`);
      const each_array = ensure_array_like(data.aportes);
      for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
        let aporte = each_array[$$index];
        $$renderer2.push(`<a${attr("href", `/admin/aportes/${stringify(aporte.id)}`)} class="block p-4 hover:bg-slate-50 transition-colors"><div class="flex items-center justify-between"><div><p class="text-sm text-slate-500">${escape_html(formatDateShort(aporte.fecha))}</p> <p class="text-xs text-slate-400">${escape_html(aporte.rubro)}</p></div> <div class="text-right"><p class="font-bold text-slate-900">${escape_html(formatCurrency(aporte.monto))}</p> `);
        Badge($$renderer2, {
          variant: estadoVariant(aporte.estado),
          children: ($$renderer3) => {
            $$renderer3.push(`<!---->${escape_html(estadoAporteLabels[aporte.estado])}`);
          }
        });
        $$renderer2.push(`<!----></div></div></a>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]-->`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-B02FSxqU.js.map

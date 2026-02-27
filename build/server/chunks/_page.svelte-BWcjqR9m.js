import { am as head, m as escape_html, j as attr } from './index2-DaWCMi17.js';
import './root-BhGlX1_a.js';
import './state.svelte-D0Tb5oKo.js';

function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let loading = false;
    let tipo = form?.data?.tipo || "PERSONA";
    head("1yhu85z", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Nuevo Donante - Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="max-w-2xl mx-auto"><div class="mb-8"><a href="/admin/donantes" class="text-sm text-slate-600 hover:text-primary-600 mb-2 inline-block">← Volver a donantes</a> <h1 class="page-title">Nuevo Donante</h1></div> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="card p-6 space-y-6"><div><label class="label">Tipo de donante</label> <div class="flex gap-4"><label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="PERSONA"${attr("checked", tipo === "PERSONA", true)} class="w-4 h-4 text-primary-600"/> <span>Persona</span></label> <label class="flex items-center gap-2 cursor-pointer"><input type="radio" name="tipo" value="EMPRESA"${attr("checked", tipo === "EMPRESA", true)} class="w-4 h-4 text-primary-600"/> <span>Empresa</span></label></div></div> <div><label for="nombre" class="label">${escape_html(tipo === "EMPRESA" ? "Nombre del representante" : "Nombre completo")} *</label> <input type="text" id="nombre" name="nombre"${attr("value", form?.data?.nombre ?? "")} class="input" required=""/></div> <div><label for="identificacion" class="label">Identidad / RTN *</label> <input type="text" id="identificacion" name="identificacion"${attr("value", form?.data?.identificacion ?? "")} class="input" placeholder="Ej: 0801-1980-12345" required=""/> <p class="text-xs text-slate-500 mt-1">Debe ser único en el sistema.</p></div> `);
    if (tipo === "EMPRESA") {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div><label for="nombreNegocio" class="label">Nombre del negocio/empresa *</label> <input type="text" id="nombreNegocio" name="nombreNegocio"${attr("value", form?.data?.nombreNegocio ?? "")} class="input"/></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="telefono" class="label">Teléfono</label> <input type="tel" id="telefono" name="telefono"${attr("value", form?.data?.telefono ?? "")} class="input"/></div> <div><label for="email" class="label">Email</label> <input type="email" id="email" name="email"${attr("value", form?.data?.email ?? "")} class="input"/></div></div> <div><label for="direccion" class="label">Dirección</label> <input type="text" id="direccion" name="direccion"${attr("value", form?.data?.direccion ?? "")} class="input"/></div> <div><label for="notas" class="label">Notas</label> <textarea id="notas" name="notas" rows="3" class="input">`);
    const $$body = escape_html(form?.data?.notas ?? "");
    if ($$body) {
      $$renderer2.push(`${$$body}`);
    }
    $$renderer2.push(`</textarea></div> <div class="flex justify-end gap-3 pt-4 border-t border-slate-200"><a href="/admin/donantes" class="btn btn-secondary">Cancelar</a> <button type="submit" class="btn btn-primary"${attr("disabled", loading, true)}>${escape_html("Crear Donante")}</button></div></form></div>`);
  });
}

export { _page as default };
//# sourceMappingURL=_page.svelte-BWcjqR9m.js.map

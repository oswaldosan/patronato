import { h as head, d as escape_html, a as attr } from "../../../../chunks/index2.js";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { form } = $$props;
    let loading = false;
    head("18c6u1m", $$renderer2, ($$renderer3) => {
      $$renderer3.title(($$renderer4) => {
        $$renderer4.push(`<title>Iniciar Sesión – Patronato Monterrey Admin</title>`);
      });
    });
    $$renderer2.push(`<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 px-4"><div class="w-full max-w-md"><div class="text-center mb-8"><div class="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary-900/50 border border-primary-600"><svg class="w-10 h-10 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></div> <h1 class="text-2xl font-display font-bold text-white">Panel de Administración</h1> <p class="text-primary-300 mt-1">Patronato de Monterrey – Comité de Desarrollo</p></div> <div class="bg-white rounded-2xl shadow-2xl p-8"><h2 class="text-xl font-display font-semibold text-slate-900 mb-6">Iniciar Sesión</h2> `);
    if (form?.error) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">${escape_html(form.error)}</div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <form method="POST" class="space-y-5"><div><label for="email" class="label">Correo electrónico</label> <input type="email" id="email" name="email"${attr("value", form?.email ?? "")} class="input" placeholder="admin@patronato-monterrey.org" required=""/></div> <div><label for="password" class="label">Contraseña</label> <input type="password" id="password" name="password" class="input" placeholder="••••••••" required=""/></div> <button type="submit" class="w-full btn btn-primary btn-lg"${attr("disabled", loading, true)}>`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`Ingresar al sistema`);
    }
    $$renderer2.push(`<!--]--></button></form></div> <div class="text-center mt-6"><a href="/" class="text-primary-300 hover:text-white text-sm transition-colors">← Volver al portal público</a></div></div></div>`);
  });
}
export {
  _page as default
};

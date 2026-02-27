import { d as escape_html, a as attr } from "./index2.js";
function EmptyState($$renderer, $$props) {
  let {
    title,
    description,
    icon = "📭",
    actionLabel,
    actionHref,
    onAction
  } = $$props;
  $$renderer.push(`<div class="flex flex-col items-center justify-center py-12 px-4 text-center"><div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6"><span class="text-4xl">${escape_html(icon)}</span></div> <h3 class="text-lg font-display font-semibold text-slate-900 mb-2">${escape_html(title)}</h3> `);
  if (description) {
    $$renderer.push("<!--[-->");
    $$renderer.push(`<p class="text-sm text-slate-500 max-w-sm mb-6">${escape_html(description)}</p>`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--> `);
  if (actionLabel) {
    $$renderer.push("<!--[-->");
    if (actionHref) {
      $$renderer.push("<!--[-->");
      $$renderer.push(`<a${attr("href", actionHref)} class="btn btn-primary">${escape_html(actionLabel)}</a>`);
    } else if (onAction) {
      $$renderer.push("<!--[1-->");
      $$renderer.push(`<button class="btn btn-primary">${escape_html(actionLabel)}</button>`);
    } else {
      $$renderer.push("<!--[!-->");
    }
    $$renderer.push(`<!--]-->`);
  } else {
    $$renderer.push("<!--[!-->");
  }
  $$renderer.push(`<!--]--></div>`);
}
export {
  EmptyState as E
};

import { b as attr_class, s as stringify, d as escape_html, i as attr_style, f as derived } from "./index2.js";
import { f as formatCurrency, g as calculatePercentage } from "./format.js";
function ProgressBar($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      current,
      goal,
      label = "Meta del proyecto",
      showLabels = true,
      variant = "light"
    } = $$props;
    const percentage = derived(() => calculatePercentage(current, goal));
    const clampedPercentage = derived(() => Math.min(percentage(), 100));
    const labelClass = derived(() => variant === "dark" ? "text-white/90" : "text-slate-700");
    const percentageClass = derived(() => variant === "dark" ? "text-white font-bold" : "text-primary-600");
    const sublabelClass = derived(() => variant === "dark" ? "text-white/80" : "text-slate-500");
    const barBgClass = derived(() => variant === "dark" ? "bg-white/20" : "bg-slate-200");
    $$renderer2.push(`<div class="space-y-3 svelte-1qjgclg">`);
    if (showLabels) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex justify-between items-center svelte-1qjgclg"><span${attr_class(`text-sm font-medium ${stringify(labelClass())}`, "svelte-1qjgclg")}>${escape_html(label)}</span> <span${attr_class(`text-sm font-bold ${stringify(percentageClass())}`, "svelte-1qjgclg")}>${escape_html(percentage())}%</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> <div${attr_class(`relative h-6 ${stringify(barBgClass())} rounded-full overflow-hidden`, "svelte-1qjgclg")}><div class="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 via-primary-400 to-accent-400 rounded-full transition-all duration-1000 ease-out svelte-1qjgclg"${attr_style(`width: ${stringify(clampedPercentage())}%`)}><div class="absolute inset-0 bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.3),transparent)] animate-[shimmer_2s_infinite] svelte-1qjgclg"></div></div> `);
    if (percentage() >= 10) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<span class="absolute inset-y-0 left-3 flex items-center text-xs font-bold text-white drop-shadow svelte-1qjgclg">${escape_html(formatCurrency(current))}</span>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (showLabels) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`flex justify-between items-center text-xs ${stringify(sublabelClass())}`, "svelte-1qjgclg")}><span class="svelte-1qjgclg">Recaudado</span> <span class="svelte-1qjgclg">Meta: ${escape_html(formatCurrency(goal))}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  ProgressBar as P
};

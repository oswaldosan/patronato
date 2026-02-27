import { m as escape_html, k as attr_class, l as stringify } from './index2-DaWCMi17.js';
import { f as formatCurrency } from './format-OIrQpM7m.js';

function StatCard($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      value,
      subtitle,
      icon,
      trend,
      isCurrency = false,
      color = "green"
    } = $$props;
    const colorClasses = {
      green: "from-primary-500 to-primary-600",
      blue: "from-blue-500 to-blue-600",
      yellow: "from-yellow-500 to-yellow-600",
      red: "from-red-500 to-red-600",
      purple: "from-purple-500 to-purple-600"
    };
    const bgColorClasses = {
      green: "bg-primary-50",
      blue: "bg-blue-50",
      yellow: "bg-yellow-50",
      red: "bg-red-50",
      purple: "bg-purple-50"
    };
    $$renderer2.push(`<div class="card p-6 group hover:scale-[1.02] transition-transform duration-300"><div class="flex items-start justify-between"><div class="flex-1"><p class="text-sm font-medium text-slate-500 mb-1">${escape_html(title)}</p> <p${attr_class(`stat-value text-gradient bg-gradient-to-r ${stringify(colorClasses[color])}`)}>${escape_html(isCurrency ? formatCurrency(value) : value)}</p> `);
    if (subtitle) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<p class="text-xs text-slate-400 mt-2">${escape_html(subtitle)}</p>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    if (trend !== void 0) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div class="flex items-center gap-1 mt-2">`);
      if (trend > 0) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<svg class="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> <span class="text-xs text-green-600 font-medium">+${escape_html(trend)}%</span>`);
      } else if (trend < 0) {
        $$renderer2.push("<!--[1-->");
        $$renderer2.push(`<svg class="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path></svg> <span class="text-xs text-red-600 font-medium">${escape_html(trend)}%</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
        $$renderer2.push(`<span class="text-xs text-slate-400">Sin cambios</span>`);
      }
      $$renderer2.push(`<!--]--></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div> `);
    if (icon) {
      $$renderer2.push("<!--[-->");
      $$renderer2.push(`<div${attr_class(`w-12 h-12 rounded-xl ${stringify(bgColorClasses[color])} flex items-center justify-center group-hover:scale-110 transition-transform`)}><span class="text-2xl">${escape_html(icon)}</span></div>`);
    } else {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}

export { StatCard as S };
//# sourceMappingURL=StatCard-xB67hm5r.js.map

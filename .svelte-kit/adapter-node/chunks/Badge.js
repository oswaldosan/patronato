import { b as attr_class, s as stringify } from "./index2.js";
function Badge($$renderer, $$props) {
  let { variant = "default", size = "md", children } = $$props;
  const variantClasses = {
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    info: "bg-blue-100 text-blue-800 border-blue-200",
    default: "bg-slate-100 text-slate-700 border-slate-200"
  };
  const sizeClasses = { sm: "px-2 py-0.5 text-xs", md: "px-2.5 py-1 text-xs" };
  $$renderer.push(`<span${attr_class(`inline-flex items-center rounded-full font-medium border ${stringify(variantClasses[variant])} ${stringify(sizeClasses[size])}`)}>`);
  children($$renderer);
  $$renderer.push(`<!----></span>`);
}
export {
  Badge as B
};

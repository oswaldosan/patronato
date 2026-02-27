import { m as escape_html, al as getContext } from './index2-DaWCMi17.js';
import './state.svelte-D0Tb5oKo.js';
import { s as stores } from './client-Dcp1-aNv.js';
import './root-BhGlX1_a.js';
import './index-D_8dOU1D.js';

({
  check: stores.updated.check
});
function context() {
  return getContext("__request__");
}
const page$1 = {
  get error() {
    return context().page.error;
  },
  get status() {
    return context().page.status;
  }
};
const page = page$1;
function Error$1($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<h1>${escape_html(page.status)}</h1> <p>${escape_html(page.error?.message)}</p>`);
  });
}

export { Error$1 as default };
//# sourceMappingURL=error.svelte-C02a26u5.js.map

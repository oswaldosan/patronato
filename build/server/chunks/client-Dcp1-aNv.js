import './root-BhGlX1_a.js';
import { w as writable } from './index-D_8dOU1D.js';
import './state.svelte-D0Tb5oKo.js';

function create_updated_store() {
  const { set, subscribe } = writable(false);
  {
    return {
      subscribe,
      // eslint-disable-next-line @typescript-eslint/require-await
      check: async () => false
    };
  }
}
const stores = {
  updated: /* @__PURE__ */ create_updated_store()
};
function goto(url, opts = {}) {
  {
    throw new Error("Cannot call goto(...) on the server");
  }
}

export { goto as g, stores as s };
//# sourceMappingURL=client-Dcp1-aNv.js.map

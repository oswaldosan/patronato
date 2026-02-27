import { r as redirect } from './index-B2LGyy1l.js';

const actions = {
  default: async ({ cookies }) => {
    cookies.delete("auth_token", { path: "/" });
    throw redirect(302, "/admin/login");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 17;
const server_id = "src/routes/admin/logout/+page.server.ts";
const imports = [];
const stylesheets = [];
const fonts = [];

export { fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=17-BMY6k_L6.js.map

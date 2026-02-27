import { r as redirect } from './index-B2LGyy1l.js';

const load = async ({ locals, cookies, url }) => {
  const user = locals.user;
  if (url.pathname === "/admin/login") {
    if (user) throw redirect(302, "/admin");
    return { user: null };
  }
  if (!user) {
    cookies.delete("auth_token", { path: "/" });
    throw redirect(302, "/admin/login");
  }
  return { user };
};

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-BHMY72NX.js')).default;
const server_id = "src/routes/admin/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.CQfq6K4R.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/B_TJrAGS.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/BHkW5Tdc.js","_app/immutable/chunks/BK_--6wx.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js"];
const stylesheets = ["_app/immutable/assets/app.BXvOEigu.css"];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-DbHjBn1J.js.map

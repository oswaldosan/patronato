import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import { a as authenticateUser, b as generateToken } from './auth-C5IcvRRF.js';
import { l as loginSchema } from './validations-DjlCDxJA.js';
import 'bcryptjs';
import 'jsonwebtoken';
import './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';
import 'zod';

const load = async () => {
  return {};
};
const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const result = loginSchema.safeParse({ email, password });
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Datos inválidos";
      return fail(400, {
        error: message,
        email
      });
    }
    const user = await authenticateUser(email, password);
    if (!user) {
      return fail(401, {
        error: "Credenciales inválidas",
        email
      });
    }
    const token = generateToken(user);
    cookies.set("auth_token", token, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7
      // 7 días
    });
    throw redirect(302, "/admin");
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 16;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-ZvdD6bzb.js')).default;
const server_id = "src/routes/admin/login/+page.server.ts";
const imports = ["_app/immutable/nodes/16.B60jDIMP.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/FiqctlaF.js","_app/immutable/chunks/DwtWQrsL.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CWn9fQy-.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=16-BnH8wj6u.js.map

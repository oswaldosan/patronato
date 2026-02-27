import { fail, redirect } from "@sveltejs/kit";
import { a as authenticateUser, g as generateToken } from "../../../../chunks/auth.js";
import { l as loginSchema } from "../../../../chunks/validations.js";
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
export {
  actions,
  load
};

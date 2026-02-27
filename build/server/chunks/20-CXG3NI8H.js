import { p as prisma } from './db-6tYg_p_L.js';
import { h as hashPassword } from './auth-C5IcvRRF.js';
import { u as userPasswordResetSchema, g as userToggleSchema, h as userCreateSchema } from './validations-DjlCDxJA.js';
import { f as fail, r as redirect } from './index-B2LGyy1l.js';
import 'dotenv/config';
import '@prisma/client';
import 'bcryptjs';
import 'jsonwebtoken';
import 'zod';

const load = async ({ locals }) => {
  const user = locals.user;
  if (!user || user.role !== "ADMIN") {
    throw redirect(302, "/admin");
  }
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, role: true, activo: true, createdAt: true }
  });
  const stats = {
    total: users.length,
    activos: users.filter((u) => u.activo).length,
    inactivos: users.filter((u) => !u.activo).length,
    viewers: users.filter((u) => u.role === "VIEWER").length
  };
  return {
    users: users.map((u) => ({
      ...u,
      createdAt: u.createdAt.toISOString()
    })),
    stats,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
};
const actions = {
  create: async ({ request, locals }) => {
    const user = locals.user;
    if (!user || user.role !== "ADMIN") {
      return fail(403, { message: "No autorizado" });
    }
    const formData = await request.formData();
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      password: String(formData.get("password") ?? ""),
      role: formData.get("role") ?? "ADMIN"
    };
    const parsed = userCreateSchema.safeParse(payload);
    if (!parsed.success) {
      return fail(400, { message: parsed.error.issues[0]?.message ?? "Datos inválidos" });
    }
    const hashed = await hashPassword(parsed.data.password);
    try {
      await prisma.user.create({
        data: {
          name: parsed.data.name.trim(),
          email: parsed.data.email.trim().toLowerCase(),
          password: hashed,
          role: parsed.data.role
        }
      });
    } catch (error) {
      return fail(400, { message: "El email ya está registrado" });
    }
    return { success: true };
  },
  toggleActive: async ({ request, locals }) => {
    const user = locals.user;
    if (!user || user.role !== "ADMIN") return fail(403, { message: "No autorizado" });
    const formData = await request.formData();
    const parsed = userToggleSchema.safeParse({ id: formData.get("id") });
    if (!parsed.success) {
      return fail(400, { message: parsed.error.issues[0]?.message ?? "Datos inválidos" });
    }
    if (parsed.data.id === user.id) {
      return fail(400, { message: "No puedes desactivarte a ti mismo" });
    }
    const target = await prisma.user.findUnique({ where: { id: parsed.data.id } });
    if (!target) return fail(404, { message: "Usuario no encontrado" });
    await prisma.user.update({
      where: { id: parsed.data.id },
      data: { activo: !target.activo }
    });
    return { success: true };
  },
  resetPassword: async ({ request, locals }) => {
    const user = locals.user;
    if (!user || user.role !== "ADMIN") return fail(403, { message: "No autorizado" });
    const formData = await request.formData();
    const parsed = userPasswordResetSchema.safeParse({
      id: formData.get("id"),
      password: formData.get("password")
    });
    if (!parsed.success) {
      return fail(400, { message: parsed.error.issues[0]?.message ?? "Datos inválidos" });
    }
    await prisma.user.update({
      where: { id: parsed.data.id },
      data: { password: await hashPassword(parsed.data.password) }
    });
    return { success: true };
  }
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-BKuNPVP3.js')).default;
const server_id = "src/routes/admin/usuarios/+page.server.ts";
const imports = ["_app/immutable/nodes/20.N9CliBH2.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/B3baiw5N.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/6RaR5WWk.js","_app/immutable/chunks/CWn9fQy-.js","_app/immutable/chunks/Dj1_M-cw.js","_app/immutable/chunks/BVEhXgIt.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-CXG3NI8H.js.map

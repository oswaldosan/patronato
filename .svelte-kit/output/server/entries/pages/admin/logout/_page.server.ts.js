import { redirect } from "@sveltejs/kit";
const actions = {
  default: async ({ cookies }) => {
    cookies.delete("auth_token", { path: "/" });
    throw redirect(302, "/admin/login");
  }
};
export {
  actions
};

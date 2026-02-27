import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies, url }) => {
  const user = locals.user;

  if (url.pathname === '/admin/login') {
    if (user) throw redirect(302, '/admin');
    return { user: null };
  }

  if (!user) {
    cookies.delete('auth_token', { path: '/' });
    throw redirect(302, '/admin/login');
  }

  return { user };
};

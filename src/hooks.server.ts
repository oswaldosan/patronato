import type { Handle } from '@sveltejs/kit';
import { getUserFromToken } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.user = null;
  const token = event.cookies.get('auth_token');

  if (token) {
    const user = await getUserFromToken(token);

    if (user && user.activo) {
      event.locals.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      };
    } else {
      event.cookies.delete('auth_token', { path: '/' });
    }
  }

  return resolve(event);
};

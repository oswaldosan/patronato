import { g as getUserFromToken } from './auth-C5IcvRRF.js';
import 'bcryptjs';
import 'jsonwebtoken';
import './db-6tYg_p_L.js';
import 'dotenv/config';
import '@prisma/client';

const handle = async ({ event, resolve }) => {
  event.locals.user = null;
  const token = event.cookies.get("auth_token");
  if (token) {
    const user = await getUserFromToken(token);
    if (user && user.activo) {
      event.locals.user = {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      };
    } else {
      event.cookies.delete("auth_token", { path: "/" });
    }
  }
  return resolve(event);
};

export { handle };
//# sourceMappingURL=hooks.server-DcLEPsYh.js.map

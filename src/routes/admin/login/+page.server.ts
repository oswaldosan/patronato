import { fail, redirect } from '@sveltejs/kit';
import { authenticateUser, generateToken } from '$lib/server/auth';
import { loginSchema } from '$lib/validations';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  return {};
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    // Validar datos
    const result = loginSchema.safeParse({ email, password });
    
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? 'Datos inválidos';
      return fail(400, {
        error: message,
        email,
      });
    }

    // Autenticar usuario
    const user = await authenticateUser(email, password);
    
    if (!user) {
      return fail(401, {
        error: 'Credenciales inválidas',
        email,
      });
    }

    // Generar token y establecer cookie
    const token = generateToken(user);
    
    cookies.set('auth_token', token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 días
    });

    throw redirect(302, '/admin');
  },
};

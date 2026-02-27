// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
  default: async ({ cookies }: import('./$types').RequestEvent) => {
    cookies.delete('auth_token', { path: '/' });
    throw redirect(302, '/admin/login');
  },
};
;null as any as Actions;
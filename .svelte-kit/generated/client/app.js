export { matchers } from './matchers.js';

export const nodes = [
	() => import('./nodes/0'),
	() => import('./nodes/1'),
	() => import('./nodes/2'),
	() => import('./nodes/3'),
	() => import('./nodes/4'),
	() => import('./nodes/5'),
	() => import('./nodes/6'),
	() => import('./nodes/7'),
	() => import('./nodes/8'),
	() => import('./nodes/9'),
	() => import('./nodes/10'),
	() => import('./nodes/11'),
	() => import('./nodes/12'),
	() => import('./nodes/13'),
	() => import('./nodes/14'),
	() => import('./nodes/15'),
	() => import('./nodes/16'),
	() => import('./nodes/17'),
	() => import('./nodes/18'),
	() => import('./nodes/19'),
	() => import('./nodes/20'),
	() => import('./nodes/21'),
	() => import('./nodes/22'),
	() => import('./nodes/23'),
	() => import('./nodes/24'),
	() => import('./nodes/25'),
	() => import('./nodes/26'),
	() => import('./nodes/27'),
	() => import('./nodes/28'),
	() => import('./nodes/29'),
	() => import('./nodes/30'),
	() => import('./nodes/31')
];

export const server_loads = [2];

export const dictionary = {
		"/": [~3],
		"/admin": [~4,[2]],
		"/admin/aportes": [~5,[2]],
		"/admin/aportes/nuevo": [~7,[2]],
		"/admin/aportes/[id]": [~6,[2]],
		"/admin/auditoria": [~8,[2]],
		"/admin/configuracion": [~9,[2]],
		"/admin/donantes": [~10,[2]],
		"/admin/donantes/nuevo": [~12,[2]],
		"/admin/donantes/[id]": [~11,[2]],
		"/admin/egresos": [~13,[2]],
		"/admin/egresos/nuevo": [~15,[2]],
		"/admin/egresos/[id]": [~14,[2]],
		"/admin/login": [~16,[2]],
		"/admin/logout": [~17,[2]],
		"/admin/proyectos": [~18,[2]],
		"/admin/proyectos/nuevo": [~20,[2]],
		"/admin/proyectos/[id]": [~19,[2]],
		"/admin/reportes": [~21,[2]],
		"/admin/rubros": [~22,[2]],
		"/admin/usuarios": [~23,[2]],
		"/buscar": [~24],
		"/donante/[id]": [~25],
		"/egresos": [~26],
		"/estadisticas": [~27],
		"/movimientos": [~28],
		"/proyectos": [~29],
		"/proyectos/[id]": [~30],
		"/reportes": [~31]
	};

export const hooks = {
	handleError: (({ error }) => { console.error(error) }),
	
	reroute: (() => {}),
	transport: {}
};

export const decoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.decode]));
export const encoders = Object.fromEntries(Object.entries(hooks.transport).map(([k, v]) => [k, v.encode]));

export const hash = false;

export const decode = (type, value) => decoders[type](value);

export { default as root } from '../root.js';
const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.CP9apVfU.js",app:"_app/immutable/entry/app.Tye-EUxh.js",imports:["_app/immutable/entry/start.CP9apVfU.js","_app/immutable/chunks/CQlYeRKf.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/entry/app.Tye-EUxh.js","_app/immutable/chunks/D2gFui-Z.js","_app/immutable/chunks/CpxVo7Xb.js","_app/immutable/chunks/Bzak7iHL.js","_app/immutable/chunks/C6qXeb9M.js","_app/immutable/chunks/C1oSKhUs.js","_app/immutable/chunks/D-QOQs1b.js","_app/immutable/chunks/Dp-_RygU.js","_app/immutable/chunks/BHkW5Tdc.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-KnYzTb-g.js')),
			__memo(() => import('./chunks/1-C_tQIsFf.js')),
			__memo(() => import('./chunks/2-DbHjBn1J.js')),
			__memo(() => import('./chunks/3-BxbFXRP0.js')),
			__memo(() => import('./chunks/4-Cq0qN9Gf.js')),
			__memo(() => import('./chunks/5-BWTOMwpB.js')),
			__memo(() => import('./chunks/6-JJ3jzxyN.js')),
			__memo(() => import('./chunks/7-BMoKq1sZ.js')),
			__memo(() => import('./chunks/8-9OXI80QP.js')),
			__memo(() => import('./chunks/9-BrDrz2vq.js')),
			__memo(() => import('./chunks/10-DkG0ghh1.js')),
			__memo(() => import('./chunks/11-C6bugZW7.js')),
			__memo(() => import('./chunks/12-HsDHZuMl.js')),
			__memo(() => import('./chunks/13-iFENQIwM.js')),
			__memo(() => import('./chunks/14-CGT98XA7.js')),
			__memo(() => import('./chunks/15-CE8otHGG.js')),
			__memo(() => import('./chunks/16-BnH8wj6u.js')),
			__memo(() => import('./chunks/17-BMY6k_L6.js')),
			__memo(() => import('./chunks/18-oC8QHR9V.js')),
			__memo(() => import('./chunks/19-BhQjmLWW.js')),
			__memo(() => import('./chunks/20-CXG3NI8H.js')),
			__memo(() => import('./chunks/21-BSA6wJ8h.js')),
			__memo(() => import('./chunks/22-BuJ_BkwN.js')),
			__memo(() => import('./chunks/23-DDOd3wTd.js')),
			__memo(() => import('./chunks/24-BH9utaVo.js')),
			__memo(() => import('./chunks/25-fpOcPRJ-.js')),
			__memo(() => import('./chunks/26-Dc9h1I_X.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/admin",
				pattern: /^\/admin\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/admin/aportes",
				pattern: /^\/admin\/aportes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/admin/aportes/nuevo",
				pattern: /^\/admin\/aportes\/nuevo\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/admin/aportes/[id]",
				pattern: /^\/admin\/aportes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/admin/auditoria",
				pattern: /^\/admin\/auditoria\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/admin/configuracion",
				pattern: /^\/admin\/configuracion\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/admin/donantes",
				pattern: /^\/admin\/donantes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/admin/donantes/nuevo",
				pattern: /^\/admin\/donantes\/nuevo\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/admin/donantes/[id]",
				pattern: /^\/admin\/donantes\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/admin/egresos",
				pattern: /^\/admin\/egresos\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/admin/egresos/nuevo",
				pattern: /^\/admin\/egresos\/nuevo\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 15 },
				endpoint: null
			},
			{
				id: "/admin/egresos/[id]",
				pattern: /^\/admin\/egresos\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,2,], errors: [1,,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/admin/login",
				pattern: /^\/admin\/login\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 16 },
				endpoint: null
			},
			{
				id: "/admin/logout",
				pattern: /^\/admin\/logout\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 17 },
				endpoint: null
			},
			{
				id: "/admin/reportes",
				pattern: /^\/admin\/reportes\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 18 },
				endpoint: null
			},
			{
				id: "/admin/rubros",
				pattern: /^\/admin\/rubros\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 19 },
				endpoint: null
			},
			{
				id: "/admin/usuarios",
				pattern: /^\/admin\/usuarios\/?$/,
				params: [],
				page: { layouts: [0,2,], errors: [1,,], leaf: 20 },
				endpoint: null
			},
			{
				id: "/buscar",
				pattern: /^\/buscar\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 21 },
				endpoint: null
			},
			{
				id: "/donante/[id]",
				pattern: /^\/donante\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 22 },
				endpoint: null
			},
			{
				id: "/egresos",
				pattern: /^\/egresos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 23 },
				endpoint: null
			},
			{
				id: "/estadisticas",
				pattern: /^\/estadisticas\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 24 },
				endpoint: null
			},
			{
				id: "/health",
				pattern: /^\/health\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./chunks/_server.ts-2g3jp8up.js'))
			},
			{
				id: "/movimientos",
				pattern: /^\/movimientos\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 25 },
				endpoint: null
			},
			{
				id: "/reportes",
				pattern: /^\/reportes\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 26 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map

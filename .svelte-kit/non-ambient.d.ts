
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/admin" | "/admin/aportes" | "/admin/aportes/nuevo" | "/admin/aportes/[id]" | "/admin/auditoria" | "/admin/configuracion" | "/admin/donantes" | "/admin/donantes/nuevo" | "/admin/donantes/[id]" | "/admin/egresos" | "/admin/egresos/nuevo" | "/admin/egresos/[id]" | "/admin/login" | "/admin/logout" | "/admin/reportes" | "/admin/rubros" | "/admin/usuarios" | "/buscar" | "/donante" | "/donante/[id]" | "/egresos" | "/estadisticas" | "/health" | "/movimientos" | "/reportes";
		RouteParams(): {
			"/admin/aportes/[id]": { id: string };
			"/admin/donantes/[id]": { id: string };
			"/admin/egresos/[id]": { id: string };
			"/donante/[id]": { id: string }
		};
		LayoutParams(): {
			"/": { id?: string };
			"/admin": { id?: string };
			"/admin/aportes": { id?: string };
			"/admin/aportes/nuevo": Record<string, never>;
			"/admin/aportes/[id]": { id: string };
			"/admin/auditoria": Record<string, never>;
			"/admin/configuracion": Record<string, never>;
			"/admin/donantes": { id?: string };
			"/admin/donantes/nuevo": Record<string, never>;
			"/admin/donantes/[id]": { id: string };
			"/admin/egresos": { id?: string };
			"/admin/egresos/nuevo": Record<string, never>;
			"/admin/egresos/[id]": { id: string };
			"/admin/login": Record<string, never>;
			"/admin/logout": Record<string, never>;
			"/admin/reportes": Record<string, never>;
			"/admin/rubros": Record<string, never>;
			"/admin/usuarios": Record<string, never>;
			"/buscar": Record<string, never>;
			"/donante": { id?: string };
			"/donante/[id]": { id: string };
			"/egresos": Record<string, never>;
			"/estadisticas": Record<string, never>;
			"/health": Record<string, never>;
			"/movimientos": Record<string, never>;
			"/reportes": Record<string, never>
		};
		Pathname(): "/" | "/admin" | "/admin/aportes" | "/admin/aportes/nuevo" | `/admin/aportes/${string}` & {} | "/admin/auditoria" | "/admin/configuracion" | "/admin/donantes" | "/admin/donantes/nuevo" | `/admin/donantes/${string}` & {} | "/admin/egresos" | "/admin/egresos/nuevo" | `/admin/egresos/${string}` & {} | "/admin/login" | "/admin/logout" | "/admin/reportes" | "/admin/rubros" | "/admin/usuarios" | "/buscar" | `/donante/${string}` & {} | "/egresos" | "/estadisticas" | "/health" | "/movimientos" | "/reportes";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/robots.txt" | string & {};
	}
}
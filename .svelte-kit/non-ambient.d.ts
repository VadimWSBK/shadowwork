
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
		RouteId(): "/(app)" | "/" | "/auth" | "/auth/cookie" | "/auth/logout" | "/(app)/dashboard" | "/login" | "/reset";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(app)": Record<string, never>;
			"/": Record<string, never>;
			"/auth": Record<string, never>;
			"/auth/cookie": Record<string, never>;
			"/auth/logout": Record<string, never>;
			"/(app)/dashboard": Record<string, never>;
			"/login": Record<string, never>;
			"/reset": Record<string, never>
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/cookie" | "/auth/cookie/" | "/auth/logout" | "/auth/logout/" | "/dashboard" | "/dashboard/" | "/login" | "/login/" | "/reset" | "/reset/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon-shadowwork.png" | "/favicon.svg" | string & {};
	}
}
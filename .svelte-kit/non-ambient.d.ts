
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
		RouteId(): "/(app)" | "/" | "/auth" | "/auth/cookie" | "/auth/logout" | "/contact" | "/(app)/dashboard" | "/disclaimer" | "/faq" | "/login" | "/privacy" | "/reset" | "/signup" | "/terms";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/(app)": Record<string, never>;
			"/": Record<string, never>;
			"/auth": Record<string, never>;
			"/auth/cookie": Record<string, never>;
			"/auth/logout": Record<string, never>;
			"/contact": Record<string, never>;
			"/(app)/dashboard": Record<string, never>;
			"/disclaimer": Record<string, never>;
			"/faq": Record<string, never>;
			"/login": Record<string, never>;
			"/privacy": Record<string, never>;
			"/reset": Record<string, never>;
			"/signup": Record<string, never>;
			"/terms": Record<string, never>
		};
		Pathname(): "/" | "/auth" | "/auth/" | "/auth/cookie" | "/auth/cookie/" | "/auth/logout" | "/auth/logout/" | "/contact" | "/contact/" | "/dashboard" | "/dashboard/" | "/disclaimer" | "/disclaimer/" | "/faq" | "/faq/" | "/login" | "/login/" | "/privacy" | "/privacy/" | "/reset" | "/reset/" | "/signup" | "/signup/" | "/terms" | "/terms/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon-shadowwork.png" | "/favicon.svg" | string & {};
	}
}
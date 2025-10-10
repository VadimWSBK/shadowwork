
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
		RouteId(): "/(app)" | "/" | "/api" | "/api/resend-invite" | "/api/stripe-webhook" | "/auth" | "/auth/cookie" | "/auth/logout" | "/contact" | "/course" | "/course/[slug]" | "/(app)/dashboard" | "/disclaimer" | "/faq" | "/login" | "/payment-confirmation" | "/privacy" | "/reset" | "/sales" | "/shadowwork" | "/signup" | "/terms";
		RouteParams(): {
			"/course/[slug]": { slug: string }
		};
		LayoutParams(): {
			"/(app)": Record<string, never>;
			"/": { slug?: string };
			"/api": Record<string, never>;
			"/api/resend-invite": Record<string, never>;
			"/api/stripe-webhook": Record<string, never>;
			"/auth": Record<string, never>;
			"/auth/cookie": Record<string, never>;
			"/auth/logout": Record<string, never>;
			"/contact": Record<string, never>;
			"/course": { slug?: string };
			"/course/[slug]": { slug: string };
			"/(app)/dashboard": Record<string, never>;
			"/disclaimer": Record<string, never>;
			"/faq": Record<string, never>;
			"/login": Record<string, never>;
			"/payment-confirmation": Record<string, never>;
			"/privacy": Record<string, never>;
			"/reset": Record<string, never>;
			"/sales": Record<string, never>;
			"/shadowwork": Record<string, never>;
			"/signup": Record<string, never>;
			"/terms": Record<string, never>
		};
		Pathname(): "/" | "/api" | "/api/" | "/api/resend-invite" | "/api/resend-invite/" | "/api/stripe-webhook" | "/api/stripe-webhook/" | "/auth" | "/auth/" | "/auth/cookie" | "/auth/cookie/" | "/auth/logout" | "/auth/logout/" | "/contact" | "/contact/" | "/course" | "/course/" | `/course/${string}` & {} | `/course/${string}/` & {} | "/dashboard" | "/dashboard/" | "/disclaimer" | "/disclaimer/" | "/faq" | "/faq/" | "/login" | "/login/" | "/payment-confirmation" | "/payment-confirmation/" | "/privacy" | "/privacy/" | "/reset" | "/reset/" | "/sales" | "/sales/" | "/shadowwork" | "/shadowwork/" | "/signup" | "/signup/" | "/terms" | "/terms/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/favicon-shadowwork.png" | "/favicon.svg" | string & {};
	}
}
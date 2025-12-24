import { createBrowserClient } from "@supabase/ssr";

function createClient() {
	return createBrowserClient(
		import.meta.env.VITE_SUPABASE_URL!,
		import.meta.env.VITE_SUPABASE_PUBLISHABLE_OR_ANON_KEY!,
	);
}

const supabase = createClient();

export default supabase;

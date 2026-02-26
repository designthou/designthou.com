import { createClient, SupabaseClientOptions } from '@supabase/supabase-js';

export function createStaticClient(options?: SupabaseClientOptions<'public'> | undefined) {
	// Create a supabase client on the browser with project's credentials
	return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, options);
}

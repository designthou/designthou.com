import { STORAGE_BUCKETS } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const filename = searchParams.get('filename');

	if (!filename) return new Response('filename required', { status: 400 });

	const supabaseServerClient = await createClient();

	const {
		data: { user },
	} = await supabaseServerClient.auth.getUser();

	if (!user) return new Response('Unauthorized', { status: 401 });

	const { data, error } = await supabaseServerClient.storage.from(STORAGE_BUCKETS.OPEN_SOURCE_AI).download(`${filename}`);
	console.log(data);
	if (error || !data) {
		return Response.json({ error: 'Not found' }, { status: 404 });
	}

	return new Response(data, {
		headers: {
			'Content-Disposition': `attachment; filename="${filename}"`,
			'Content-Type': data.type,
		},
	});
}

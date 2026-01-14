import { ResetPasswordForm } from '@/components';
import { createClient } from '@/lib/supabase/server';

export default async function ResetPasswordPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<>
			<h2 className="auth-page-title">Reset Password</h2>
			<ResetPasswordForm email={user?.email ?? ''} />
		</>
	);
}

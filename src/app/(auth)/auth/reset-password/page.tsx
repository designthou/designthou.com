import { AnimateLoader, ResetPasswordForm } from '@/components';
import { Suspense } from 'react';

export default function ResetPasswordPage() {
	return (
		<>
			<h2 className="auth-page-title">Reset Password</h2>
			<Suspense
				fallback={
					<div className="ui-flex-center w-full h-20">
						<AnimateLoader />
					</div>
				}>
				<ResetPasswordForm />
			</Suspense>
		</>
	);
}

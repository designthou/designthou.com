import { useMutation } from '@tanstack/react-query';
import { type ForgotPasswordSchema } from '@/components';

export default function useForgotPasword() {
	return useMutation({
		async mutationFn({ email }: ForgotPasswordSchema) {
			const response = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData?.error || '비밀번호 재설정 실패');
			}

			return response.json();
		},
	});
}

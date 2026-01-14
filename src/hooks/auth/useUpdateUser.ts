import { useMutation } from '@tanstack/react-query';
import { type ResetPasswordSchema } from '@/components';
import { createClient } from '@/lib/supabase/client';

export default function useUpdateUser() {
	return useMutation({
		async mutationFn({ password }: Pick<ResetPasswordSchema, 'password'>) {
			const supabase = createClient();
			const { error: updateUserError } = await supabase.auth.updateUser({ password });

			if (updateUserError) {
				throw new Error(updateUserError.message);
			}

			const { error: signOutError } = await supabase.auth.signOut({ scope: 'local' });

			if (signOutError) {
				throw new Error(signOutError?.message);
			}
		},
	});
}

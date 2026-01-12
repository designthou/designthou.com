'use client';

import React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Button, Input } from '@/components';

interface PasswordInputProps {
	placeholder: string;
}

export default function PasswordInput({ placeholder, ...props }: PasswordInputProps) {
	const [type, setType] = React.useState<'password' | 'text'>('password');

	return (
		<div className="flex items-center gap-2">
			<Input type={type} placeholder={placeholder} {...props} />
			<Button
				type="button"
				variant="ghost"
				size="icon"
				onClick={() => setType(type => (type === 'text' ? 'password' : 'text'))}
				aria-label={type === 'password' ? 'Hide Password' : 'Show Password'}>
				{type === 'password' ? <Eye /> : <EyeOff />}
			</Button>
		</div>
	);
}

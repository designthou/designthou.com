import { z } from 'zod';

type ApplyFormSchema = z.infer<typeof applyFormSchema>;

const phoneRegex = /^01[016789]\d{7,8}$/;

const applyFormSchema = z.object({
	category: z.string().nonempty('카테고리를 선택해 주세요'),
	name: z.string().min(2, {
		message: '이름은 최소 2글자 이상입니다.',
	}),
	email: z.email({
		message: '이메일 형식이 올바르지 않습니다.',
	}),
	phoneNumber: z.string().regex(phoneRegex, '휴대폰 번호 형식이 올바르지 않습니다.'),
	description: z.string().optional(),
});

const formatPhoneNumber = (value: string) => {
	const numbers = value.replace(/\D/g, '');

	if (numbers.length < 4) return numbers;
	if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
	return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

export type { ApplyFormSchema };
export { applyFormSchema, formatPhoneNumber };

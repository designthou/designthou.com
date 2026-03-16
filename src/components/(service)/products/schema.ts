import { courseOptions } from '@/constants';
import { z } from 'zod';

type ApplyFormSchema = z.infer<typeof applyFormSchema>;

const phoneRegex = /^01[016789]\d{7,8}$/;
const bankAccountRegex = /^\d{10,14}$/;

const applyFormSchema = z
	.object({
		option: z.string().nonempty('3개 중에 하나의 옵션을 꼭 선택해 주세요'),
		program: z.string('2개 중에 원하는 프로그램을 하나 꼭 선택해 주세요').optional(),
		name: z.string().min(2, {
			message: '이름은 최소 2글자 이상입니다.',
		}),
		email: z.email({
			message: '이메일 형식이 올바르지 않습니다.',
		}),
		phoneNumber: z.string().regex(phoneRegex, '휴대폰 번호 형식이 올바르지 않습니다.'),
		description: z.string().optional(),
		bank: z.string(),
		accountNumber: z.string().regex(bankAccountRegex, '계좌번호 형식이 올바르지 않습니다(10 ~ 14개의 숫자)'),
	})
	.superRefine((data, ctx) => {
		const requiresProgram = data.option !== courseOptions[2];

		if (requiresProgram && !data.program) {
			ctx.addIssue({
				code: 'custom',
				message: '프로그램을 선택해 주세요.',
				path: ['program'],
			});
		}
	});

const formatPhoneNumber = (value: string) => {
	const numbers = value.replace(/\D/g, '');

	if (numbers.length < 4) return numbers;
	if (numbers.length < 8) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
	return `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
};

export type { ApplyFormSchema };
export { applyFormSchema, formatPhoneNumber };

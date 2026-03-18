const fieldName = {
	option: '옵 션',
	program: '프로그램',
	name: '이 름',
	email: '이메일',
	phone_number: '전화번호',
	bank: '은 행',
	account_number: '계좌번호',
	description: '추가 정보',
} as const;

const courseOptions = [
	'옵션 1 - [8주] 프로그램 수업 + 포트폴리오 (₩ 300,000)',
	'옵션 2 - [4주] 프로그램 수업 (₩ 200,000)',
	'옵션 3 - [4주] 포트폴리오 수업 (₩ 200,000)',
] as const;

const programs = ['Rhino(라이노)', 'Sketchup(스케치업)'];

export { fieldName, courseOptions, programs };

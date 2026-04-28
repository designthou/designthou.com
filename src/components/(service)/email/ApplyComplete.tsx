import { Html, Head, Body, Container, Heading, Text, Section, Hr } from '@react-email/components';

interface ApplyCompleteEmailProps {
	name: string;
	title: string;
	program: string;
	option: string;
}

const BANK_RELATED_INFO = `${process.env.ADMIN_INCOME_BANK!}은행 ${process.env.ADMIN_BANK_ACCOUNT_NUMBER} [ 예금주 : ${process.env.ADMIN_BANK_ACCOUNT_OWNER} ]`;

export default function ApplyCompleteEmail({ name, title, program, option }: ApplyCompleteEmailProps) {
	return (
		<Html lang="ko">
			<Head />
			<Body style={{ fontFamily: 'sans-serif' }}>
				<Container>
					<Heading>오프라인 수업 신청이 완료되었습니다 🎉</Heading>
					<Text>
						{name}님, <strong> {title} </strong>수업 신청이 완료되었습니다.
					</Text>

					<Hr />

					<Section>
						<Heading as="h2">선택한 옵션 및 프로그램</Heading>
						<Text>{option}</Text>
						<Text>{program}</Text>
					</Section>

					<Hr />

					<Section>
						<Heading as="h2">입금 계좌 안내</Heading>
						<Text style={{ padding: '4px 8px', fontSize: '16px', fontWeight: 'bold', backgroundColor: '#d3e3fd' }}>
							{BANK_RELATED_INFO}
						</Text>
						<Text>입금 확인 후 최종 등록이 완료됩니다.</Text>
					</Section>

					<Hr />

					<Section>
						<Heading as="h2">문의</Heading>

						<Text>designthou.dev@gmail.com</Text>
						<Text>designthou@naver.com</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
}

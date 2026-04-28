// lib/crypto.ts

const SECRET = process.env.KY_ENCRYPTION_SECRET!; // 아무 문자열

function getKey(): Uint8Array {
	return new TextEncoder().encode(SECRET);
}

export async function encrypt(text: string): Promise<string> {
	const { CompactEncrypt } = await import('jose');

	return new CompactEncrypt(new TextEncoder().encode(text))
		.setProtectedHeader({ alg: 'dir', enc: 'A256GCM' })
		.encrypt(getKey().slice(0, 32)); // 32bytes
}

export async function decrypt(token: string): Promise<string> {
	const { compactDecrypt } = await import('jose');

	const { plaintext } = await compactDecrypt(token, getKey().slice(0, 32));
	return new TextDecoder().decode(plaintext);
}

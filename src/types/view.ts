interface RegisteredUserView {
	id: string;
	nickname: string;
	displayName: string;
	legacyUserId: number;
	registeredAt: string;
	loginType: string;
	role: string;
}

interface LegacyUserView {
	id: string;
	email: string;
	nickname: string;
	displayName: string;
	legacyUserId: number;
	registeredAt: string;
	loginType: string;
}

export type { RegisteredUserView, LegacyUserView };

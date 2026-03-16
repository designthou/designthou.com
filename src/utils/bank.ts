const maskAccountNumber = (account: string): string => {
	if (account.length <= 4) return account;

	const start = account.slice(0, 4);
	const end = account.slice(-4);
	const masked = '*'.repeat(account.length - 8);

	return `${start}${masked}${end}`;
};

export { maskAccountNumber };

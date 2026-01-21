import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <div className="mx-auto my-8 p-4">{children}</div>;
}

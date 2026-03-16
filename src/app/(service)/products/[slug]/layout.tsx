import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
	return <div className="mx-auto my-4 p-4 md:my-8">{children}</div>;
}

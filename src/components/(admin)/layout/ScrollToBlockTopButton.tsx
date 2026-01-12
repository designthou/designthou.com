import { ArrowUp } from 'lucide-react';
import { Button } from '@/components';

export default function ScrollToBlockTopButton() {
	return (
		<Button
			type="button"
			className="fixed right-4 bottom-20 rounded-full z-20"
			size="icon-lg"
			onClick={() => {
				window.scrollTo({
					top: 0,
					behavior: 'smooth',
				});
			}}>
			<ArrowUp size={20} />
		</Button>
	);
}

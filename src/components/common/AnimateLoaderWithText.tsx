import { AnimateLoader } from '@/components';

export default function AnimateLoaderWithText({ text = 'Loading ...' }: { text?: string }) {
	return (
		<div className="ui-flex-center gap-2 w-full h-full text-xs text-gray-700">
			<AnimateLoader /> <span>{text}</span>
		</div>
	);
}

import { cn } from '@/lib/utils';
import { generateGradient } from '@/utils/seedGradient';

export default function GradientCircle({ trigger, className }: { trigger: string; className?: string }) {
	return <div className={cn('w-10 h-10 rounded-full', className)} style={{ background: generateGradient(trigger) }} />;
}

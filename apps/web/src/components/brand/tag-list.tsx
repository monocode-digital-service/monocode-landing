import { Badge } from '@monocode-landing/ui/components/badge'
import { cn } from '@monocode-landing/ui/lib/utils'

const tones = {
	peach: 'bg-peach',
	mint: 'bg-mint',
	ice: 'bg-ice-soft',
} as const

export function TagList({
	tags,
	tone,
}: {
	tags: readonly string[]
	tone: keyof typeof tones
}) {
	return (
		<ul className='flex flex-wrap gap-1.5'>
			{tags.map(tag => (
				<li key={tag}>
					<Badge
						className={cn(
							'h-auto rounded-[6px] px-[9px] py-1 font-mono font-normal text-move text-xs',
							tones[tone]
						)}
					>
						{tag}
					</Badge>
				</li>
			))}
		</ul>
	)
}

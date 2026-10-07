import { cn } from '@monocode-landing/ui/lib/utils'

const tones = {
	dark: {
		root: 'border-move/25 text-move',
		muted: 'text-move/45',
		cursor: 'bg-move',
	},
	light: {
		root: 'border-soft/25 text-soft',
		muted: 'text-soft/45',
		cursor: 'bg-lime',
	},
} as const

// Rótulo de seção no formato de caminho de terminal: ~/monocode/<path>▍
export function SectionLabel({
	path,
	tone = 'dark',
	className,
}: {
	path: string
	tone?: keyof typeof tones
	className?: string
}) {
	const t = tones[tone]
	return (
		<p
			data-reveal='up'
			className={cn(
				'flex w-full items-center border-y py-3.5 font-mono text-[15px]',
				t.root,
				className
			)}
		>
			<span className={t.muted}>~/monocode/</span>
			<span>{path}</span>
			<span
				aria-hidden
				className={cn(
					'ml-1 inline-block h-[1.1em] w-[0.6em] animate-caret motion-reduce:animate-none',
					t.cursor
				)}
			/>
		</p>
	)
}

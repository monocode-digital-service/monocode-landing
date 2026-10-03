import { cn } from '@monocode-landing/ui/lib/utils'
import Image from 'next/image'

const tones = {
	dark: {
		root: 'border-move/35 text-move',
		dot: '/brand/dot-dark.svg',
		hatch: '/brand/hatch-strip-dark.svg',
	},
	light: {
		root: 'border-soft/35 text-soft',
		dot: '/brand/dot-light.svg',
		hatch: '/brand/hatch-strip-light.svg',
	},
} as const

export function SectionLabel({
	children,
	tone = 'dark',
	className,
}: {
	children: React.ReactNode
	tone?: keyof typeof tones
	className?: string
}) {
	const t = tones[tone]
	return (
		<div
			className={cn(
				'flex w-full items-center gap-4 border-y py-3.5',
				t.root,
				className
			)}
		>
			<Image src={t.dot} width={10} height={10} alt='' className='shrink-0' />
			<p className='shrink-0 font-mono text-[15px]'>{children}</p>
			<div className='h-[22px] min-w-px flex-1 overflow-hidden'>
				<Image
					src={t.hatch}
					width={600}
					height={22}
					alt=''
					className='max-w-none'
				/>
			</div>
		</div>
	)
}

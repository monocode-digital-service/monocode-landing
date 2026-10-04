import { cn } from '@monocode-landing/ui/lib/utils'

// Cantoneiras de enquadramento (marcas de corte nos 4 cantos)
export function CornerFrame({
	className,
	children,
}: {
	className?: string
	children?: React.ReactNode
}) {
	const corner = 'pointer-events-none absolute size-3 border-current'
	return (
		<div className={cn('relative', className)}>
			{children}
			<span
				aria-hidden
				className={cn(corner, 'top-0 left-0 border-t-[1.5px] border-l-[1.5px]')}
			/>
			<span
				aria-hidden
				className={cn(
					corner,
					'top-0 right-0 border-t-[1.5px] border-r-[1.5px]'
				)}
			/>
			<span
				aria-hidden
				className={cn(
					corner,
					'bottom-0 left-0 border-b-[1.5px] border-l-[1.5px]'
				)}
			/>
			<span
				aria-hidden
				className={cn(
					corner,
					'right-0 bottom-0 border-r-[1.5px] border-b-[1.5px]'
				)}
			/>
		</div>
	)
}

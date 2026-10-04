import Image from 'next/image'

// Wordmark vetorial (Figma: Logo/Wordmark). Dois tamanhos exportados do layout.
const sizes = {
	sm: { src: '/brand/wordmark.svg', width: 168, height: 25 },
	lg: { src: '/brand/wordmark-large.svg', width: 1300, height: 195.526 },
} as const

export function Wordmark({
	size = 'sm',
	className,
}: {
	size?: keyof typeof sizes
	className?: string
}) {
	const { src, width, height } = sizes[size]
	return (
		<Image
			src={src}
			width={width}
			height={height}
			alt='monocode'
			className={className}
			style={{ height: 'auto' }}
		/>
	)
}

'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useEffect, useRef } from 'react'

import encaixe from './figures/encaixe'
import HL from './figures/kernel'
import sinal from './figures/sinal'
import turno from './figures/turno'

const figures = { turno, sinal, encaixe } as const

// Paleta "verde + laranja" sobre o painel claro de Soluções
const palette = {
	'--hairline-plate': '#f5f8f5',
	'--hairline-edge': '#0f3b27',
	'--hairline-mid': '#8fa597',
	'--hairline-lo': '#cfdcd3',
	'--hairline-hi': '#ff7036',
	'--hairline-stroke': '1.2',
} as React.CSSProperties

/** Monta uma figura Hairline (motor + figura em design/hairline) num palco SVG. */
export function HairlineFigure({
	name,
	label,
	className,
}: {
	name: keyof typeof figures
	label: string
	className?: string
}) {
	const stage = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const el = stage.current
		if (!el) return
		const figure = figures[name]
		HL.inject(document)
		const svg = HL.mk(
			'svg',
			{ viewBox: '0 0 400 320', 'aria-hidden': 'true' },
			el
		)
		const handle = figure.mount(
			{ stage: el, svg, read: { textContent: '' } },
			figure.range[1]
		)
		return () => {
			handle.destroy()
			svg.remove()
		}
	}, [name])

	return (
		<div
			ref={stage}
			data-hairline={name}
			role='img'
			aria-label={label}
			className={cn('w-full', className)}
			style={palette}
		/>
	)
}

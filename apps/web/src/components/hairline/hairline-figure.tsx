'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useEffect, useRef } from 'react'

import encaixe from './figures/encaixe'
import esteira from './figures/esteira'
import HL from './figures/kernel'
import pasta from './figures/pasta'
import raiox from './figures/raiox'
import sinal from './figures/sinal'
import turno from './figures/turno'

const figures = { turno, sinal, encaixe, raiox, pasta, esteira } as const

// Paletas: "light" para o painel claro de Soluções, "dark" para Como trabalhamos
const palettes = {
	light: {
		'--hairline-plate': '#f5f8f5',
		'--hairline-edge': '#0f3b27',
		'--hairline-mid': '#8fa597',
		'--hairline-lo': '#cfdcd3',
		'--hairline-hi': '#ff7036',
		'--hairline-stroke': '1.2',
	},
	dark: {
		'--hairline-plate': '#0f3b27',
		'--hairline-edge': '#92ff5f',
		'--hairline-mid': '#4f9a5f',
		'--hairline-lo': '#2b6443',
		'--hairline-hi': '#ff7036',
		'--hairline-stroke': '1.2',
	},
} as Record<'light' | 'dark', React.CSSProperties>

/** Monta uma figura Hairline (motor + figura em design/hairline) num palco SVG. */
export function HairlineFigure({
	name,
	label,
	palette = 'light',
	className,
}: {
	name: keyof typeof figures
	label: string
	palette?: keyof typeof palettes
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
			style={palettes[palette]}
		/>
	)
}

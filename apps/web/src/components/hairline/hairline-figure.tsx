'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useEffect, useRef } from 'react'

// Motor e figuras só são baixados quando o palco se aproxima da tela
const figures = {
	turno: () => import('./figures/turno'),
	sinal: () => import('./figures/sinal'),
	encaixe: () => import('./figures/encaixe'),
	raiox: () => import('./figures/raiox'),
	pasta: () => import('./figures/pasta'),
	esteira: () => import('./figures/esteira'),
} as const

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
		let cleanup = () => {}
		let cancelled = false
		const io = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return
				io.disconnect()
				const [{ default: HL }, { default: figure }] = await Promise.all([
					import('./figures/kernel'),
					figures[name](),
				])
				if (cancelled) return
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
				cleanup = () => {
					handle.destroy()
					svg.remove()
				}
			},
			{ rootMargin: '400px 0px' }
		)
		io.observe(el)
		return () => {
			cancelled = true
			io.disconnect()
			cleanup()
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

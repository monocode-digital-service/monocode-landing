'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useEffect, useId, useRef } from 'react'

// Motor e figuras só são baixados quando o palco se aproxima da tela
const figures = {
	turno: () => import('./figures/turno'),
	sinal: () => import('./figures/sinal'),
	encaixe: () => import('./figures/encaixe'),
	raiox: () => import('./figures/raiox'),
	pasta: () => import('./figures/pasta'),
	esteira: () => import('./figures/esteira'),
	evolucao: () => import('./figures/evolucao'),
} as const

const stop = (offset: number, color: string) =>
	`<stop offset="${offset}" style="stop-color:var(${color})"/>`
const gradient = (id: string, from: string, to: string) =>
	`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stop(0, from)}${stop(1, to)}</linearGradient>`

/**
 * Tratamento "Volume": cada peça recebe um degradê de cima para baixo, a base um tom próprio
 * e o desenho inteiro projeta uma sombra suave no painel. As cores vêm das variáveis --hl-* e --hairline-*
 * do globals.css, por tom ("light" ou "dark") e por paleta; a espessura do traço também fica lá.
 * Os degradês e as regras de preenchimento vão dentro do próprio SVG (e não no CSS global) porque
 * url(#id) numa folha externa não aponta para o documento em todo navegador.
 *
 * Só recebe preenchimento o que o motor já preenche: os contornos abertos (classe "nf", como a moldura do
 * scanner ou a parede da frente da pasta) ficam de fora, senão o navegador fecha a forma com uma reta.
 * A base é o primeiro sólido que a figura desenha; a pasta não tem base, então a caixa faz esse papel.
 */
const baseSelector = (id: string, name: string) =>
	name === 'pasta'
		? `#${id}>g>path.sil:not(.nf),#${id}>g>path.fo`
		: `#${id}>g>g:first-of-type>.sil:not(.nf)`
const volumeMarkup = (id: string, name: string) =>
	`<defs>${gradient(`${id}-piece`, '--hl-piece-top', '--hl-piece-bottom')}${gradient(`${id}-base`, '--hl-base-top', '--hl-base-bottom')}</defs><style>#${id} .sil:not(.nf){fill:url(#${id}-piece)}${baseSelector(id, name)}{fill:url(#${id}-base)}#${id}>g{filter:drop-shadow(0 14px 12px var(--hl-shadow))}</style>`

/** Monta uma figura Hairline (motor + figura em design/hairline) num palco SVG. */
export function HairlineFigure({
	name,
	label,
	palette = 'light',
	className,
}: {
	name: keyof typeof figures
	label: string
	/** "light" para o painel claro de Soluções, "dark" para Como trabalhamos */
	palette?: 'light' | 'dark'
	className?: string
}) {
	const stage = useRef<HTMLDivElement>(null)
	const id = `hl${useId().replace(/[^a-zA-Z0-9]/g, '')}`

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
					{ viewBox: '0 0 400 320', 'aria-hidden': 'true', id },
					el
				)
				svg.insertAdjacentHTML('afterbegin', volumeMarkup(id, name))
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
	}, [name, id])

	return (
		<div
			ref={stage}
			data-hairline={name}
			data-tone={palette}
			role='img'
			aria-label={label}
			className={cn('w-full', className)}
		/>
	)
}

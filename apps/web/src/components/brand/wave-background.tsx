'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { type RefObject, useEffect, useRef } from 'react'

/**
 * Bordas de bloco que envergam com a velocidade do scroll, como uma onda (ideia do newformcap.com).
 * O elemento passa --bend px além do bloco nas bordas animadas; um clip-path refeito a cada frame
 * desenha a borda reta em repouso e uma curva no meio enquanto a página corre.
 */
function useWave(
	ref: RefObject<HTMLElement | null>,
	{
		top,
		bottom,
		parent = false,
	}: { top: boolean; bottom: boolean; parent?: boolean }
) {
	useEffect(() => {
		const el = parent ? ref.current?.parentElement : ref.current
		if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches)
			return

		let w = 0
		let h = 0
		let max = 0
		let bend = 0
		let velocity = 0
		let lastY = window.scrollY
		let lastT = performance.now()
		let frame = 0

		const edge = (y: number, b: number, forward: boolean) => {
			const [x1, x2, x3, x4, end] = forward
				? [0.25, 0.3, 0.7, 0.75, w]
				: [0.75, 0.7, 0.3, 0.25, 0]
			return `C${w * x1},${y} ${w * x2},${y + b} ${w * 0.5},${y + b} C${w * x3},${y + b} ${w * x4},${y} ${end},${y}`
		}
		const draw = () => {
			const b = Math.round(bend * 10) / 10
			const y0 = top ? max : 0
			const y1 = bottom ? h - max : h
			el.style.clipPath = `path('M0,${y0} ${top ? edge(y0, b, true) : `L${w},${y0}`} L${w},${y1} ${bottom ? edge(y1, b, false) : `L0,${y1}`} Z')`
		}

		const tick = (now: number) => {
			const y = window.scrollY
			const dt = Math.max(now - lastT, 1)
			// velocidade filtrada (px/s) e mola na curva: tira os trancos da roda do mouse
			velocity += (((y - lastY) / dt) * 1000 - velocity) * 0.2
			lastY = y
			lastT = now
			const goal = Math.max(-max, Math.min(max, -velocity * 0.05))
			bend += (goal - bend) * 0.08
			draw()
			if (Math.abs(bend) < 0.2 && Math.abs(velocity) < 2) {
				bend = 0
				velocity = 0
				frame = 0
				draw()
				return
			}
			frame = requestAnimationFrame(tick)
		}

		const onScroll = () => {
			if (frame) return
			lastY = window.scrollY
			lastT = performance.now()
			frame = requestAnimationFrame(tick)
		}

		const measure = () => {
			w = el.offsetWidth
			h = el.offsetHeight
			max = Number.parseFloat(getComputedStyle(el).getPropertyValue('--bend'))
			draw()
		}
		const observer = new ResizeObserver(measure)
		observer.observe(el)
		measure()
		window.addEventListener('scroll', onScroll, { passive: true })
		return () => {
			observer.disconnect()
			window.removeEventListener('scroll', onScroll)
			cancelAnimationFrame(frame)
		}
	}, [ref, top, bottom, parent])
}

/** Camada de fundo do bloco (cor em className), com as bordas em onda. */
export function WaveBackground({
	className,
	top = true,
	bottom = true,
}: {
	className?: string
	top?: boolean
	bottom?: boolean
}) {
	const ref = useRef<HTMLDivElement>(null)
	useWave(ref, { top, bottom })
	return (
		<div
			ref={ref}
			aria-hidden
			className={cn(
				'pointer-events-none absolute inset-x-0 -z-10 [--bend:56px] md:[--bend:96px]',
				top ? '-top-(--bend)' : 'top-0',
				bottom ? '-bottom-(--bend)' : 'bottom-0',
				className
			)}
		/>
	)
}

/**
 * Aplica a borda inferior em onda ao elemento pai (para blocos com fundo próprio, como a hero).
 * O pai precisa sobrar --bend px embaixo (padding) e recuar o mesmo tanto (margem negativa).
 */
export function WaveBottomEdge() {
	const ref = useRef<HTMLSpanElement>(null)
	useWave(ref, { top: false, bottom: true, parent: true })
	return <span ref={ref} hidden />
}

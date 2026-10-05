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
			// sino no meio: plano nas pontas, como no newformcap (controles a 35% e 65%)
			const [a, c, end] = forward ? [0.35, 0.65, w] : [0.65, 0.35, 0]
			return `C${w * a},${y} ${w * a},${y + b} ${w * 0.5},${y + b} C${w * c},${y + b} ${w * c},${y} ${end},${y}`
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
			velocity += (((y - lastY) / dt) * 1000 - velocity) * 0.6
			const moved = y !== lastY
			lastY = y
			lastT = now
			// curva suave: scroll normal enverga pouco, só um scroll forte chega perto do máximo
			const goal = -max * Math.tanh(velocity / (max * 16))
			bend += (goal - bend) * 0.25
			draw()
			if (!moved && Math.abs(bend) < 0.2 && Math.abs(velocity) < 2) {
				bend = 0
				velocity = 0
				frame = 0
				draw()
				return
			}
			frame = requestAnimationFrame(tick)
		}

		// lastY guarda onde a página parou; o primeiro frame mede o salto desde lá
		const onScroll = () => {
			if (frame) return
			lastT = performance.now() - 16
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

/** Camada de fundo do bloco (cor em className), com as bordas em onda. Filhos (ex.: um fundo animado) são recortados pela mesma onda. */
export function WaveBackground({
	className,
	top = true,
	bottom = true,
	children,
}: {
	className?: string
	top?: boolean
	bottom?: boolean
	children?: React.ReactNode
}) {
	const ref = useRef<HTMLDivElement>(null)
	useWave(ref, { top, bottom })
	return (
		<div
			ref={ref}
			aria-hidden
			className={cn(
				'pointer-events-none absolute inset-x-0 -z-10 [--bend:80px] md:[--bend:200px] lg:[--bend:300px]',
				top ? '-top-(--bend)' : 'top-0',
				bottom ? '-bottom-(--bend)' : 'bottom-0',
				className
			)}
		>
			{children}
		</div>
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

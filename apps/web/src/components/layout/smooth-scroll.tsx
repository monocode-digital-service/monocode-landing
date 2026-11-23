'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

// arranca como cubic e pousa como quint: a frenagem final fica mais longa e macia
const easeInOutSoft = (t: number) =>
	t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 5 / 2

// Scroll suave com inércia (Lenis) em mouse e trackpad. Toque e movimento reduzido ficam no scroll nativo.
export function SmoothScroll() {
	const [enabled, setEnabled] = useState(false)
	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		// no toque o scroll nativo já tem inércia; o loop do Lenis só custaria CPU
		const fine = window.matchMedia('(pointer: fine)')
		const update = () => setEnabled(!reduced.matches && fine.matches)
		update()
		reduced.addEventListener('change', update)
		fine.addEventListener('change', update)
		return () => {
			reduced.removeEventListener('change', update)
			fine.removeEventListener('change', update)
		}
	}, [])
	// Clique numa âncora da própria página: o Lenis anima a rolagem, mas não cancela o salto nativo do
	// navegador. Sem cancelar, a página pula para a âncora por um instante, o ScrollTrigger aplica o
	// deslocamento final do parallax e o texto do hero pisca no topo antes de a animação começar.
	// Aqui o salto é cancelado e o que ele faria além de rolar é refeito à mão: o # no endereço e o foco.
	useEffect(() => {
		if (!enabled) return
		const onClick = (e: MouseEvent) => {
			if (e.defaultPrevented || e.button !== 0) return
			if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
			const link = (e.target as Element | null)?.closest?.('a[href*="#"]')
			if (!(link instanceof HTMLAnchorElement) || link.target === '_blank')
				return
			const url = new URL(link.href)
			if (url.origin !== location.origin || url.pathname !== location.pathname)
				return
			const target = document.getElementById(
				decodeURIComponent(url.hash.slice(1))
			)
			if (!target) return
			e.preventDefault()
			// como no navegador: repetir o clique na âncora atual não empilha entradas iguais no histórico
			if (url.hash !== location.hash)
				history.pushState(
					null,
					'',
					`${location.pathname}${location.search}${url.hash}`
				)
			// o salto nativo também levaria o foco para a seção; sem isso, o próximo Tab continuaria no menu
			if (!target.hasAttribute('tabindex'))
				target.setAttribute('tabindex', '-1')
			target.focus({ preventScroll: true })
		}
		document.addEventListener('click', onClick)
		return () => document.removeEventListener('click', onClick)
	}, [enabled])

	if (!enabled) return null
	return (
		<ReactLenis
			root
			options={{
				lerp: 0.1,
				// clique no menu: animação com duração e easing in-out, sem o salto do lerp no primeiro frame
				anchors: { lerp: 0, duration: 1.8, easing: easeInOutSoft },
			}}
		/>
	)
}

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

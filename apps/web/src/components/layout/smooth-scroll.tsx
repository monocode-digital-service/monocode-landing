'use client'

import 'lenis/dist/lenis.css'

import { ReactLenis } from 'lenis/react'
import { useEffect, useState } from 'react'

// Scroll suave com inércia (Lenis). Com movimento reduzido fica o scroll nativo.
export function SmoothScroll() {
	const [enabled, setEnabled] = useState(false)
	useEffect(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		const update = () => setEnabled(!reduced.matches)
		update()
		reduced.addEventListener('change', update)
		return () => reduced.removeEventListener('change', update)
	}, [])
	if (!enabled) return null
	return <ReactLenis root options={{ lerp: 0.1, anchors: true }} />
}

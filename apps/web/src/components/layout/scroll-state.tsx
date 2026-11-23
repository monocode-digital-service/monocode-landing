'use client'

import { useEffect } from 'react'

/**
 * Marca no <html> o quanto a página rolou, para o CSS reagir sem re-renderizar nada:
 * - data-scrolled: saiu do topo (o cabeçalho ganha a barra)
 * - data-scrolled-far: passou da primeira dobra (aparece o botão de voltar ao topo)
 * No Tailwind: in-data-scrolled:… e in-data-scrolled-far:…
 */
export function ScrollState() {
	useEffect(() => {
		const root = document.documentElement
		const update = () => {
			root.toggleAttribute('data-scrolled', window.scrollY > 24)
			root.toggleAttribute(
				'data-scrolled-far',
				window.scrollY > window.innerHeight * 0.8
			)
		}
		update()
		window.addEventListener('scroll', update, { passive: true })
		window.addEventListener('resize', update)
		return () => {
			window.removeEventListener('scroll', update)
			window.removeEventListener('resize', update)
		}
	}, [])
	return null
}

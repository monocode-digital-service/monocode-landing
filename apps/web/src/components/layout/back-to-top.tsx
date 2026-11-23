'use client'

import { useLenis } from 'lenis/react'
import { ArrowUp } from 'lucide-react'

// Botão de voltar ao topo: aparece depois da primeira dobra (data-scrolled-far no <html>, marcado pelo script do layout).
// Escondido ele fica com visibility: hidden, então também sai da ordem do Tab.
export function BackToTop() {
	const lenis = useLenis()
	const toTop = () => {
		// com o Lenis ativo a subida usa a mesma inércia do resto da página; sem ele, o scroll nativo
		if (lenis) return lenis.scrollTo(0, { duration: 1.4 })
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
		window.scrollTo({ top: 0, behavior: reduced.matches ? 'auto' : 'smooth' })
	}
	return (
		<button
			type='button'
			onClick={toTop}
			aria-label='Voltar ao topo'
			className='group in-data-scrolled-far:visible invisible fixed right-5 bottom-5 z-40 flex size-11 in-data-scrolled-far:translate-y-0 translate-y-2 items-center justify-center rounded-lg bg-ink-deep text-soft in-data-scrolled-far:opacity-100 opacity-0 transition-[opacity,translate,visibility,color] duration-300 hover:text-lime motion-reduce:transition-none md:right-8 md:bottom-8'
		>
			<ArrowUp className='size-5 transition-transform duration-300 group-hover:-translate-y-0.5' />
		</button>
	)
}

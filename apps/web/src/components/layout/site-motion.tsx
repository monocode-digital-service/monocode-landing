'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { usePathname } from 'next/navigation'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin)

/**
 * Animações de entrada da página, ligadas por atributos nos elementos (ver globals.css para o estado inicial):
 * - data-reveal="lines": título dividido em linhas, cada linha sobe de trás de uma máscara
 * - data-reveal="up": fade com deslocamento para cima; vizinhos que entram juntos ganham escalonamento
 * - data-reveal="scale": o mesmo, com leve escala (figuras e galeria)
 * - data-reveal="wipe": revelação por recorte, de cima para baixo (foto)
 * - data-reveal="draw": o traço do SVG se desenha
 * - data-parallax: sobe mais devagar que o scroll (texto do hero)
 * Tudo só em opacity, transform e clip-path, uma vez por elemento; nada roda com movimento reduzido.
 *
 * O Next troca de página sem recarregar (links internos e o botão voltar), e este componente fica montado
 * no layout. Por isso a configuração é refeita a cada rota: sem isso os elementos da página que chega
 * continuam escondidos pelo CSS e nunca entram.
 */
export function SiteMotion() {
	const pathname = usePathname()
	useGSAP(
		() => {
			const mm = gsap.matchMedia()
			mm.add('(prefers-reduced-motion: no-preference)', () => {
				const once = (trigger: Element, start = 'top 85%') => ({
					trigger,
					start,
					once: true,
				})

				for (const el of gsap.utils.toArray<HTMLElement>(
					'[data-reveal="lines"]'
				)) {
					SplitText.create(el, {
						type: 'lines',
						mask: 'lines',
						autoSplit: true,
						onSplit: self => {
							gsap.set(el, { visibility: 'visible' })
							return gsap.from(self.lines, {
								yPercent: 110,
								duration: 1,
								ease: 'power4.out',
								stagger: 0.09,
								scrollTrigger: once(el),
							})
						},
					})
				}

				const batch = (
					selector: string,
					from: gsap.TweenVars,
					to: gsap.TweenVars
				) => {
					// página sem esse tipo de elemento (as legais não têm "scale"): nada a fazer, e o GSAP não avisa no console
					if (!document.querySelector(selector)) return
					gsap.set(selector, from)
					ScrollTrigger.batch(selector, {
						start: 'top 88%',
						once: true,
						onEnter: els =>
							gsap.to(els, {
								autoAlpha: 1,
								y: 0,
								scale: 1,
								duration: 0.9,
								ease: 'power3.out',
								stagger: 0.08,
								overwrite: true,
								...to,
							}),
					})
				}
				batch('[data-reveal="up"]', { y: 24 }, {})
				batch(
					'[data-reveal="scale"]',
					{ y: 16, scale: 0.96 },
					{ duration: 1.1 }
				)

				for (const el of gsap.utils.toArray<HTMLElement>(
					'[data-reveal="wipe"]'
				)) {
					gsap.fromTo(
						el,
						{ clipPath: 'inset(0 0 100% 0)', visibility: 'visible' },
						{
							clipPath: 'inset(0 0 0% 0)',
							duration: 1.3,
							ease: 'power4.inOut',
							scrollTrigger: once(el, 'top 80%'),
						}
					)
				}

				for (const svg of gsap.utils.toArray<SVGElement>(
					'[data-reveal="draw"]'
				)) {
					gsap.set(svg, { visibility: 'visible' })
					gsap.from(svg.querySelectorAll('path'), {
						drawSVG: '0%',
						duration: 1.8,
						ease: 'power2.inOut',
						stagger: 0.06,
						scrollTrigger: once(svg, 'top 95%'),
					})
				}

				// A altura da página muda depois que os gatilhos são criados: troca de frente, passos que abrem no
				// celular, fontes e figuras que terminam de carregar. Os gatilhos guardam posições, então são
				// recalculados; sem isso as seções abaixo entrariam atrasadas, com áreas em branco na tela.
				let height = document.documentElement.scrollHeight
				let timer = 0
				const resize = new ResizeObserver(() => {
					window.clearTimeout(timer)
					timer = window.setTimeout(() => {
						const now = document.documentElement.scrollHeight
						if (now === height) return
						height = now
						// true: espera a rolagem em curso terminar antes de medir
						ScrollTrigger.refresh(true)
					}, 150)
				})
				resize.observe(document.body)

				for (const el of gsap.utils.toArray<HTMLElement>('[data-parallax]')) {
					gsap.to(el, {
						yPercent: -30,
						ease: 'none',
						scrollTrigger: {
							trigger: el.parentElement,
							start: 'top top',
							end: 'bottom top',
							scrub: true,
						},
					})
				}

				// ao trocar de rota ou sair de "sem movimento reduzido", o observador de altura sai junto
				return () => {
					resize.disconnect()
					window.clearTimeout(timer)
				}
			})
		},
		{ dependencies: [pathname], revertOnUpdate: true }
	)
	return null
}

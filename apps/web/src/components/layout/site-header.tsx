import type { CSSProperties } from 'react'

import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { Wordmark } from '@/components/brand/wordmark'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { navLinks } from '@/lib/site'

const ease = 'ease-[cubic-bezier(0.32,0.72,0,1)]'
const move = `transition-transform duration-500 ${ease} motion-reduce:transition-none`

// Item do menu: no hover um traço se desenha da esquerda para a direita e, ao sair, recolhe para a direita
// (a origem do transform troca de lado). As cores vêm de --nav-fg e --nav-accent, que o cabeçalho troca ao rolar.
const navLink =
	'relative py-1 font-semibold text-base text-(--nav-fg) transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-(--nav-accent) after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-(--nav-accent) hover:after:origin-left hover:after:scale-x-100 focus-visible:text-(--nav-accent) focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:after:transition-none'

// Geometria da cápsula, em unidades do próprio cabeçalho (cqw), para a conta não depender da barra de rolagem:
// --row-x é a distância da borda da tela até o conteúdo da linha, --cap-x a distância até a cápsula já estreita
// (--cap-w de largura, com a margem --cap-m) e --inset a diferença entre as duas (negativa no celular, onde a
// cápsula é mais larga que o conteúdo).
const capsule = {
	'--cap-w': 'min(100cqw - 2 * var(--cap-m), 1240px)',
	'--row-x': 'calc((100cqw - min(100cqw, 1440px)) / 2 + var(--gutter))',
	'--cap-x': 'calc((100cqw - var(--cap-w)) / 2)',
	'--inset': 'calc(var(--cap-x) - var(--row-x))',
} as CSSProperties

/**
 * Cabeçalho fixo, montado uma vez no layout. No topo da página fica transparente sobre o bloco escuro
 * (o hero ou a faixa das páginas legais), com logo em lime e menu claro. Depois de rolar (data-scrolled no
 * <html>, ver scroll-state.tsx) vira uma cápsula flutuante de vidro fosco claro e as cores passam para o ink.
 * O botão também escurece, porque o lime só entra sobre verde-escuro.
 *
 * A cápsula surge em volta do logo e do menu onde eles já estão (mesma altura, bordas a --pad-l e --pad-r
 * deles) e só então estreita até --cap-w, com o logo e o menu deslizando para dentro no mesmo tempo e na mesma
 * curva: a distância deles até as bordas da cápsula não muda durante a transição. Nada se move na vertical.
 */
export function SiteHeader() {
	return (
		<header
			style={capsule}
			className='pointer-events-none fixed inset-x-0 top-0 z-40 pt-8 [--cap-m:12px] [--gutter:20px] [--nav-accent:var(--color-lime)] [--nav-fg:var(--color-soft)] [--pad-l:18px] [--pad-r:8px] [container-type:inline-size] in-data-scrolled:[--nav-accent:var(--color-ink)] in-data-scrolled:[--nav-fg:var(--color-ink)] in-data-scrolled:[--primary-foreground:var(--color-soft)] in-data-scrolled:[--primary:var(--color-ink)] md:[--gutter:40px] md:[--pad-l:28px] lg:[--cap-m:20px] xl:[--cap-m:48px] xl:[--gutter:80px]'
		>
			{/* Fundo da cápsula: 60px de altura, centrado na linha (que fica a 32px do topo e tem 44px) */}
			<div
				aria-hidden
				className={`absolute top-6 right-[calc(var(--row-x)-var(--pad-r))] left-[calc(var(--row-x)-var(--pad-l))] h-[60px] rounded-full border border-ink/10 bg-paper/55 opacity-0 shadow-[0_14px_36px_-18px_rgb(23_27_24/0.45)] backdrop-blur-2xl backdrop-saturate-[1.8] transition-[opacity,left,right] duration-500 ${ease} in-data-scrolled:pointer-events-auto in-data-scrolled:right-(--cap-x) in-data-scrolled:left-(--cap-x) in-data-scrolled:opacity-100 motion-reduce:transition-none`}
			/>
			<div className='relative mx-auto flex h-11 max-w-[1440px] items-center justify-between px-(--gutter)'>
				<a
					href='/'
					aria-label='Monocode, início'
					className={`pointer-events-auto relative block w-[168px] in-data-scrolled:translate-x-[calc(var(--inset)+var(--pad-l))] ${move}`}
				>
					<Wordmark className='h-auto w-full in-data-scrolled:opacity-0 transition-opacity duration-300' />
					{/* o mesmo logo em ink, recortado por máscara, entra por cima quando a cápsula aparece */}
					<span
						aria-hidden
						className='absolute inset-0 bg-ink in-data-scrolled:opacity-100 opacity-0 transition-opacity duration-300 [mask:url(/brand/wordmark.svg)_center/contain_no-repeat]'
					/>
				</a>
				<nav
					className={`pointer-events-auto flex in-data-scrolled:-translate-x-[calc(var(--inset)+var(--pad-r))] items-center gap-6 lg:gap-9 ${move}`}
					aria-label='Principal'
				>
					<ul className='hidden items-center gap-6 md:flex lg:gap-9'>
						{navLinks.map(link => (
							<li key={link.href}>
								<a href={link.href} className={navLink}>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<WhatsAppButton
						size='pill'
						className='hidden transition-[scale,background-color,color] duration-300 md:inline-flex'
					>
						Falar no WhatsApp
					</WhatsAppButton>
					<MobileMenu />
				</nav>
			</div>
		</header>
	)
}

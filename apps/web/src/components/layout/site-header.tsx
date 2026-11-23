import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { Wordmark } from '@/components/brand/wordmark'
import { MobileMenu } from '@/components/layout/mobile-menu'
import { navLinks } from '@/lib/site'

// Item do menu: no hover a cor vai para o lime e um traço se desenha da esquerda para a direita;
// ao sair, o traço recolhe para a direita (a origem do transform troca de lado).
const navLink =
	'relative py-1 font-semibold text-base text-soft transition-colors duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-right after:scale-x-0 after:bg-lime after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.32,0.72,0,1)] hover:text-lime hover:after:origin-left hover:after:scale-x-100 focus-visible:text-lime focus-visible:after:origin-left focus-visible:after:scale-x-100 motion-reduce:after:transition-none'

/**
 * Cabeçalho fixo, montado uma vez no layout. No topo da página fica transparente sobre o bloco escuro
 * (o hero ou a faixa das páginas legais). Depois de rolar (data-scrolled no <html>, ver scroll-state.tsx)
 * a linha sobe e uma barra verde-escura aparece atrás dela, o que mantém logo e menu legíveis sobre as
 * seções claras. Só opacity e transform mudam; a altura do cabeçalho não é animada.
 */
export function SiteHeader() {
	return (
		<header className='pointer-events-none fixed inset-x-0 top-0 z-40 pt-8'>
			<div
				aria-hidden
				className='in-data-scrolled:pointer-events-auto absolute inset-x-0 top-0 h-16 border-soft/10 border-b bg-move-deep/90 in-data-scrolled:opacity-100 opacity-0 backdrop-blur-md transition-opacity duration-300 motion-reduce:transition-none'
			/>
			{/* 22px: leva a linha de 32px do topo para o centro da barra de 64px */}
			<div className='pointer-events-auto relative mx-auto flex h-11 max-w-[1440px] in-data-scrolled:-translate-y-[22px] items-center justify-between px-5 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none md:px-10 xl:px-20'>
				<a href='/' aria-label='Monocode, início'>
					<Wordmark className='h-auto w-[168px]' />
				</a>
				<nav className='flex items-center gap-9' aria-label='Principal'>
					<ul className='hidden items-center gap-9 md:flex'>
						{navLinks.map(link => (
							<li key={link.href}>
								<a href={link.href} className={navLink}>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<WhatsAppButton size='pill' className='hidden md:inline-flex'>
						Falar no WhatsApp
					</WhatsAppButton>
					<MobileMenu />
				</nav>
			</div>
		</header>
	)
}

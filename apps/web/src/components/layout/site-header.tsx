import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { Wordmark } from '@/components/brand/wordmark'
import { navLinks } from '@/lib/site'

export function SiteHeader() {
	return (
		<header className='absolute inset-x-0 top-0 z-20 pt-8'>
			<div className='mx-auto flex h-11 max-w-[1440px] items-center justify-between px-5 md:px-10 xl:px-20'>
				<a href='/' aria-label='Monocode, início'>
					<Wordmark className='h-auto w-[168px]' />
				</a>
				<nav className='flex items-center gap-9'>
					<ul className='hidden items-center gap-9 md:flex'>
						{navLinks.map(link => (
							<li key={link.href}>
								<a
									href={link.href}
									className='font-semibold text-base text-soft transition-colors hover:text-lime'
								>
									{link.label}
								</a>
							</li>
						))}
					</ul>
					<WhatsAppButton size='pill'>Falar no WhatsApp</WhatsAppButton>
				</nav>
			</div>
		</header>
	)
}

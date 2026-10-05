'use client'

import { Menu, X } from 'lucide-react'
import { useRef } from 'react'

import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { Wordmark } from '@/components/brand/wordmark'
import { navLinks } from '@/lib/site'

// Menu do celular: popover nativo (camada do topo, Esc e foco já resolvidos pelo navegador)
export function MobileMenu() {
	const panel = useRef<HTMLDivElement>(null)
	const close = () => panel.current?.hidePopover()

	return (
		<>
			<button
				type='button'
				popoverTarget='mobile-menu'
				aria-label='Abrir menu'
				className='flex size-11 items-center justify-center rounded-full border border-soft/30 text-soft md:hidden'
			>
				<Menu className='size-5' />
			</button>
			<div
				ref={panel}
				id='mobile-menu'
				popover='auto'
				className='m-0 h-dvh max-h-none w-full max-w-none border-0 bg-move-deep p-0 text-soft'
			>
				<div className='flex h-full flex-col px-5 pt-8 pb-10'>
					<div className='flex h-11 items-center justify-between'>
						<Wordmark className='h-auto w-[168px]' />
						<button
							type='button'
							popoverTarget='mobile-menu'
							popoverTargetAction='hide'
							aria-label='Fechar menu'
							className='flex size-11 items-center justify-center rounded-full border border-soft/30'
						>
							<X className='size-5' />
						</button>
					</div>
					<nav className='mt-16 flex-1'>
						<ul className='flex flex-col'>
							{navLinks.map((link, i) => (
								<li key={link.href} className='border-soft/15 border-b'>
									<a
										href={link.href}
										onClick={close}
										className='flex items-baseline gap-4 py-5 font-semibold text-4xl tracking-[-0.03em] transition-colors hover:text-lime'
									>
										<span className='font-mono font-normal text-lime text-xs'>
											{String(i + 1).padStart(2, '0')}
										</span>
										{link.label}
									</a>
								</li>
							))}
						</ul>
					</nav>
					<WhatsAppButton className='w-full' />
				</div>
			</div>
		</>
	)
}

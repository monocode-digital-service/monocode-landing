import Link from 'next/link'

import { WordmarkOutline } from '@/components/brand/wordmark-outline'
import { legalLinks, site } from '@/lib/site'

const label = 'font-mono text-lime text-xs uppercase tracking-[0.08em]'
const link = 'transition-colors hover:text-soft'

export function SiteFooter() {
	return (
		<footer className='text-sm text-soft/75'>
			<div className='mx-auto max-w-[1440px] px-5 md:px-10 xl:px-20'>
				<div className='grid gap-8 border-soft/20 border-t pt-8 sm:grid-cols-2 lg:grid-cols-4'>
					<div className='flex flex-col gap-2.5' data-reveal='up'>
						<span className={label}>Estúdio</span>
						<p className='leading-[1.6]'>
							Estúdio de agentes de IA, automações e aplicações sob medida.
							<br />
							São Paulo, Brasil.
						</p>
					</div>
					<div className='flex flex-col gap-2.5' data-reveal='up'>
						<span className={label}>Contato</span>
						<ul className='flex flex-col gap-1 leading-[1.6]'>
							<li>
								<a href={`mailto:${site.email}`} className={link}>
									{site.email}
								</a>
							</li>
							<li>
								<a
									href={site.linkedinUrl}
									target='_blank'
									rel='noopener noreferrer'
									className={link}
								>
									LinkedIn
								</a>
							</li>
						</ul>
					</div>
					<div className='flex flex-col gap-2.5' data-reveal='up'>
						<span className={label}>Legal</span>
						<ul className='flex flex-col gap-1 leading-[1.6]'>
							{legalLinks.map(l => (
								<li key={l.href}>
									<Link href={l.href} className={link}>
										{l.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='flex flex-col gap-2.5' data-reveal='up'>
						<span className={label}>Empresa</span>
						<p className='leading-[1.6]'>
							{site.legalName}
							<br />
							CNPJ {site.cnpj} · © 2026
						</p>
					</div>
				</div>
			</div>
			{/* Wordmark em contorno, cortado pela base do bloco */}
			<div className='mx-auto mt-16 max-w-[1440px] overflow-hidden px-5 md:px-10 xl:px-[70px]'>
				<WordmarkOutline className='-mb-[3%] h-auto w-full' />
			</div>
		</footer>
	)
}

import { Wordmark } from '@/components/brand/wordmark'
import { site } from '@/lib/site'

export function SiteFooter() {
	return (
		<footer className='bg-move-deep text-sm text-soft/70'>
			<div className='mx-auto grid max-w-[1440px] gap-8 px-5 py-12 sm:grid-cols-2 md:px-10 lg:flex lg:justify-between xl:px-20'>
				<p className='leading-[1.5]'>
					Estúdio de soluções com IA.
					<br />
					São Paulo, Brasil.
				</p>
				<ul className='flex flex-col gap-2'>
					<li>
						<a href={`mailto:${site.email}`} className='hover:text-soft'>
							{site.email}
						</a>
					</li>
					<li>
						<a
							href={site.linkedinUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='hover:text-soft'
						>
							LinkedIn
						</a>
					</li>
				</ul>
				{/* TODO: páginas de política de privacidade e termos de uso */}
				<ul className='flex flex-col gap-2'>
					<li>Política de privacidade</li>
					<li>Termos de uso</li>
				</ul>
				<p className='leading-[1.5]'>
					{site.legalName}
					<br />
					CNPJ {site.cnpj}
					<br />© 2026
				</p>
			</div>
			<div className='mx-auto max-w-[1440px] px-5 pt-9 pb-4 md:px-10 xl:px-[70px]'>
				<Wordmark size='lg' className='h-auto w-full' />
			</div>
		</footer>
	)
}

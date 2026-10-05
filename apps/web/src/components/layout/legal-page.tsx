import { SiteFooter } from '@/components/layout/site-footer'
import { SiteHeader } from '@/components/layout/site-header'

// Página de texto legal: faixa do header, texto corrido e o footer do site.
export function LegalPage({
	title,
	updated,
	children,
}: {
	title: string
	updated: string
	children: React.ReactNode
}) {
	return (
		<>
			<div className='relative h-[108px] bg-move-deep'>
				<SiteHeader />
			</div>
			<main className='bg-soft text-move'>
				<article className='mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
					<header className='flex flex-col gap-4'>
						<h1 className='font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'>
							{title}
						</h1>
						<p className='font-mono text-[13px] text-sage'>
							Última atualização: {updated}
						</p>
					</header>
					<div className='flex max-w-[760px] flex-col gap-4 text-[17px] text-move/85 leading-[1.6] [&_a]:underline [&_a]:hover:no-underline [&_h2]:mt-8 [&_h2]:font-semibold [&_h2]:text-2xl [&_h2]:text-move [&_h2]:tracking-[-0.01em] [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2'>
						{children}
					</div>
				</article>
			</main>
			<div className='bg-move pt-16 text-soft'>
				<SiteFooter />
			</div>
		</>
	)
}

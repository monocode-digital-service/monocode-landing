import type { Metadata } from 'next'
import Link from 'next/link'

import { SectionLabel } from '@/components/brand/section-label'
import { SiteFooter } from '@/components/layout/site-footer'

export const metadata: Metadata = { title: 'Página não encontrada' }

// Endereço que não existe. Tem a mesma faixa escura das páginas legais no topo: o cabeçalho vem do layout
// e começa com menu claro, então precisa de um bloco escuro atrás dele.
export default function NotFound() {
	return (
		<>
			<div className='h-[108px] bg-move-deep' />
			<main className='bg-soft text-ink'>
				<div className='mx-auto flex min-h-[50svh] max-w-[1440px] flex-col gap-10 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
					<SectionLabel path='404' />
					<div className='flex flex-col items-start gap-6'>
						<h1 className='font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'>
							Página não encontrada.
						</h1>
						<p className='max-w-[520px] text-[17px] text-ink/85 leading-[1.6]'>
							O endereço pode ter mudado ou não existe mais.
						</p>
						<Link
							href='/'
							className='py-2.5 font-semibold text-base underline underline-offset-[5px] hover:no-underline'
						>
							Voltar para o início
						</Link>
					</div>
				</div>
			</main>
			<div className='bg-move pt-16 text-soft'>
				<SiteFooter />
			</div>
		</>
	)
}

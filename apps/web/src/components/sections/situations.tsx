import { SectionLabel } from '@/components/brand/section-label'
import { SituationsExplorer } from '@/components/sections/situations-explorer'
import { fronts } from '@/lib/situations'

export function Situations() {
	return (
		<section id='o-que-muda' className='scroll-mt-4 bg-soft text-ink'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
				<SectionLabel path='o-que-muda' />
				<div className='flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16'>
					<h2
						data-reveal='lines'
						className='max-w-[700px] text-balance font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'
					>
						O que muda quando a IA entra.
					</h2>
					<p
						data-reveal='up'
						className='max-w-[420px] text-[17px] text-ink/80 leading-[1.55]'
					>
						Escolha a frente e uma situação que você reconhece. Veja como o
						trabalho passa a acontecer.
					</p>
				</div>
				<SituationsExplorer fronts={fronts} />
			</div>
		</section>
	)
}

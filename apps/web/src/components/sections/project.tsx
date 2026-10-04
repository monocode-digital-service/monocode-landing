import { Separator } from '@monocode-landing/ui/components/separator'
import Image from 'next/image'

import { SectionLabel } from '@/components/brand/section-label'
import { TagList } from '@/components/brand/tag-list'

const facts = [
	{ label: 'Cliente', value: 'Inctech' },
	{ label: 'Produto', value: 'Movvai' },
	{ label: 'Tipo', value: 'SaaS multiempresa' },
] as const

const flow = [
	{ title: 'Pedido ao agente', icon: '/brand/icon-chat.svg' },
	{ title: 'Produção com a base da marca', icon: '/brand/icon-layers.svg' },
	{ title: 'Revisão · nota de 0 a 100', icon: '/brand/icon-gauge.svg' },
	{ title: 'Aprovação humana', icon: '/brand/icon-shield.svg', accent: true },
] as const

export function Project() {
	return (
		<section id='projeto' className='scroll-mt-4 bg-soft text-move'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 lg:flex-row xl:px-20 xl:py-[120px]'>
				<div className='flex flex-col gap-[22px] lg:w-[460px] lg:shrink-0'>
					<SectionLabel path='projetos/movvai' />
					<h2 className='font-semibold text-[clamp(2.25rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em]'>
						A Monocode construiu uma agência de marketing operada por agentes de
						IA.
					</h2>
					<dl>
						{facts.map(f => (
							<div
								key={f.label}
								className='flex gap-4 border-move/20 border-b py-2.5'
							>
								<dt className='w-[110px] font-mono text-[13px] text-sage uppercase tracking-[0.06em]'>
									{f.label}
								</dt>
								<dd className='font-semibold text-base'>{f.value}</dd>
							</div>
						))}
					</dl>
					<p className='text-base text-move/80 leading-[1.6]'>
						Seis agentes, cada um com um papel (atendimento, estratégia,
						pesquisa, redação, revisão e marca), produzem conteúdo a partir da
						base de conhecimento da própria marca. Toda peça mostra de qual
						documento saiu, recebe nota de qualidade e só é publicada depois que
						uma pessoa aprova.
					</p>
					<TagList
						tags={['agentes de ia', 'base de conhecimento', 'aprovação humana']}
						tone='mint'
					/>
				</div>

				{/* Fluxo Movvai */}
				<div className='relative w-full max-w-[720px] px-5 py-12 sm:px-20 sm:pt-16 sm:pb-3'>
					<Image src='/brand/hatch-flow.svg' alt='' fill unoptimized />
					<Image src='/brand/corners-flow.svg' alt='' fill unoptimized />

					<div className='relative flex flex-wrap items-center gap-x-5 gap-y-1 text-xl'>
						<p className='font-medium'>Uma demanda no Movvai</p>
						<Separator className='bg-move/40 data-horizontal:w-12' />
						<p className='text-move/55'>Fluxo real da plataforma</p>
					</div>

					<ol className='relative mt-[66px] flex flex-col items-center'>
						{flow.map((step, i) => (
							<li
								key={step.title}
								className='flex w-full flex-col items-center'
							>
								{i > 0 && (
									<Image
										src='/brand/arrow-down.svg'
										width={24}
										height={48}
										alt=''
										className='my-1.5'
									/>
								)}
								<div className='relative flex h-24 w-full items-center gap-6 border border-line bg-white px-[31px] sm:gap-12'>
									<Image
										src={
											'accent' in step
												? '/brand/corners-step-accent.svg'
												: '/brand/corners-step.svg'
										}
										alt=''
										fill
										className='-inset-px! size-[calc(100%+2px)]!'
									/>
									<span className='font-semibold text-[22px] text-move/40'>
										{String(i + 1).padStart(2, '0')}
									</span>
									<span className='flex-1 font-bold text-base uppercase tracking-[0.02em] sm:text-lg'>
										{step.title}
									</span>
									<Image src={step.icon} width={30} height={30} alt='' />
								</div>
							</li>
						))}
					</ol>

					<p className='relative mt-9 font-mono text-[13px]'>
						Nada é publicado sem aprovação humana.
					</p>
				</div>
			</div>
		</section>
	)
}

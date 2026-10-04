import Image from 'next/image'
import DotField from '@/components/backgrounds/dot-field'
import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'

const steps = [
	{
		title: 'Análise',
		image: '/illustrations/method-analysis.webp',
		body: 'Você conta o problema do jeito que ele aparece no dia a dia. A Monocode estuda a operação, os sistemas e os números, e diz onde a tecnologia ajuda. Inclusive quando a resposta é não precisar de IA.',
	},
	{
		title: 'Proposta',
		image: '/illustrations/method-proposal.webp',
		body: 'Escopo, investimento, cronograma e cuidado com os seus dados, tudo por escrito. Você decide com o mapa inteiro na mão.',
	},
	{
		title: 'Construção e evolução',
		image: '/illustrations/method-build.webp',
		body: 'Entregas em etapas, testadas, com o seu time acompanhando cada uma. Depois de entrar em produção, a solução pode seguir evoluindo junto com a empresa.',
	},
] as const

export function Method() {
	return (
		<section
			id='metodo'
			className='relative isolate scroll-mt-4 overflow-hidden bg-move text-soft'
		>
			<div className='absolute inset-0 -z-10' aria-hidden>
				<DotField
					gradientFrom='#92FF5F'
					gradientTo='#0F3B27'
					dotRadius={1}
					glowRadius={0}
				/>
			</div>

			<div className='pointer-events-none mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 xl:gap-20 xl:px-20 xl:py-[110px]'>
				<div className='flex max-w-[640px] flex-col gap-5'>
					<SectionLabel tone='light' path='como-trabalhamos' />
					<h2 className='font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'>
						Primeiro entender.
						<br />
						Depois construir.
					</h2>
				</div>

				<ol className='grid border-soft/15 border-t md:-mx-8 md:grid-cols-3'>
					{steps.map((step, i) => (
						<li
							key={step.title}
							className='flex flex-col gap-6 border-soft/15 border-b py-8 md:border-b-0 md:not-first:border-l md:px-8'
						>
							<div className='flex items-baseline justify-between gap-4'>
								<h3 className='font-semibold text-[26px] tracking-[-0.01em]'>
									{step.title}
								</h3>
								<span className='font-mono text-[13px] text-lime'>
									{String(i + 1).padStart(2, '0')}
								</span>
							</div>
							<CornerFrame className='aspect-square w-full bg-[#0f3d29] text-lime/70'>
								<Image
									src={step.image}
									alt=''
									fill
									sizes='(min-width: 768px) 33vw, 100vw'
									className='object-contain p-3'
								/>
							</CornerFrame>
							<p className='text-base text-soft/75 leading-[1.6]'>
								{step.body}
							</p>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}

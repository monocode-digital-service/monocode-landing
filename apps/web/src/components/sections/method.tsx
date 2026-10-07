import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { WaveBackground } from '@/components/brand/wave-background'
import { HairlineFigure } from '@/components/hairline/hairline-figure'

const steps = [
	{
		title: 'Análise',
		figure: 'raiox',
		figureLabel: 'Scanner sobre a operação revelando o gargalo',
		body: 'Você conta o problema do jeito que ele aparece no dia a dia. Depois vem o estudo da operação, dos sistemas e dos dados, para apontar onde um agente ou uma automação resolve. E onde a IA não é necessária.',
	},
	{
		title: 'Proposta',
		figure: 'pasta',
		figureLabel: 'Pasta com escopo, investimento, cronograma e dados',
		body: 'Escopo, investimento, cronograma, tratamento dos seus dados e o que fica com a sua empresa, tudo por escrito. Você decide sabendo de tudo antes de começar.',
	},
	{
		title: 'Construção e evolução',
		figure: 'esteira',
		figureLabel: 'Esteira de entregas passando pelo teste até a produção',
		body: 'Entregas em etapas, cada uma demonstrada e testada com o seu time. Onde a IA decide algo que importa, uma pessoa aprova. Depois que entra em produção, a solução continua recebendo ajustes conforme a empresa muda.',
	},
] as const

export function Method() {
	return (
		<section id='metodo' className='relative isolate scroll-mt-4 text-soft'>
			<WaveBackground className='bg-move' />
			<div className='mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 xl:gap-20 xl:px-20 xl:py-[110px]'>
				<div className='flex flex-col gap-8'>
					<SectionLabel tone='light' path='como-trabalhamos' />
					<h2
						data-reveal='lines'
						className='max-w-[640px] font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'
					>
						Primeiro entender.
						<br />
						Depois construir.
					</h2>
				</div>

				<ol className='grid border-soft/15 border-t md:-mx-8 md:grid-cols-3'>
					{steps.map((step, i) => (
						<li
							key={step.title}
							data-reveal='up'
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
							<CornerFrame className='flex aspect-[5/4] w-full items-center bg-hatch-dark text-lime/70'>
								<HairlineFigure
									name={step.figure}
									label={step.figureLabel}
									palette='dark'
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

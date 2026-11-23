import { cn } from '@monocode-landing/ui/lib/utils'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { WaveBackground } from '@/components/brand/wave-background'
import { HairlineFigure } from '@/components/hairline/hairline-figure'

const steps = [
	{
		title: 'Diagnóstico',
		figure: 'raiox',
		figureLabel: 'Scanner sobre a operação revelando o gargalo',
		body: 'Estudamos a sua operação, os sistemas e os dados para apontar onde um agente ou uma automação resolve. E onde a IA não é necessária.',
	},
	{
		title: 'Proposta',
		figure: 'pasta',
		figureLabel: 'Pasta com escopo, investimento, cronograma e dados',
		body: 'Escopo, investimento, cronograma, tratamento dos seus dados e o que fica com a sua empresa, por escrito. Você decide sabendo de tudo.',
	},
	{
		title: 'Construção',
		figure: 'esteira',
		figureLabel: 'Esteira de entregas passando pelo teste até a produção',
		body: 'Entregas em etapas, cada uma demonstrada e testada com o seu time. Onde a IA decide algo que importa, uma pessoa aprova.',
	},
	{
		title: 'Evolução',
		figure: 'evolucao',
		figureLabel:
			'Solução entregue dentro de um ciclo contínuo de acompanhamento e ajuste',
		body: 'A entrega não encerra o trabalho. Acompanhamos a solução no dia a dia e ajustamos conforme a sua empresa muda.',
	},
] as const

// Até onde cada tipo de fornecedor vai, nas quatro etapas acima (colunas 1 a 4 da grade)
const reach = [
	{ who: 'Consultoria de IA', from: 1, to: 2, label: 'vai até o plano' },
	{ who: 'Software house', from: 2, to: 3, label: 'vai até a entrega' },
	{
		who: 'Monocode',
		from: 1,
		to: 4,
		label: 'continua depois da entrega',
		own: true,
	},
] as const

const pad = (n: number) => String(n).padStart(2, '0')
// As barras ocupam as colunas das etapas (1 a 4). No desktop a grade ganha uma coluna à esquerda, para o nome,
// e tudo anda uma casa; no celular o nome vai numa linha própria, acima da barra.
const span = (from: number, to: number) =>
	({ '--from': from, '--to': to }) as React.CSSProperties
const cell =
	'[grid-column:var(--from)_/_calc(var(--to)_+_1)] lg:[grid-column:calc(var(--from)_+_1)_/_calc(var(--to)_+_2)]'

// Divisórias entre os cartões, pela posição de cada um na grade de 1, 2 e 4 colunas. Ficam no próprio cartão
// (e não num fundo da grade aparecendo pelos vãos) porque os cartões entram escondidos: o fundo da grade
// apareceria sozinho, como uma placa clara, antes deles.
const dividers = [
	'',
	'border-t md:border-t-0 md:border-l',
	'border-t xl:border-t-0 xl:border-l',
	'border-t md:border-l xl:border-t-0',
]

export function Method() {
	return (
		<section id='metodo' className='relative isolate scroll-mt-4 text-soft'>
			<WaveBackground className='bg-move' />
			<div className='mx-auto flex max-w-[1440px] flex-col gap-14 px-5 py-20 md:px-10 xl:px-20 xl:py-[110px]'>
				<div className='flex flex-col gap-8'>
					<SectionLabel tone='light' path='como-trabalhamos' />
					<h2
						data-reveal='lines'
						className='font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'
					>
						Entender antes de construir.
						<br />
						<span className='text-lime'>Continuar depois de entregar.</span>
					</h2>
				</div>

				<ol className='grid overflow-hidden rounded-lg border border-soft/15 md:grid-cols-2 xl:grid-cols-4'>
					{steps.map((step, i) => (
						<li
							key={step.title}
							data-reveal='up'
							className={cn(
								'flex flex-col gap-[22px] border-soft/15 bg-move px-6 pt-[26px] pb-7',
								dividers[i]
							)}
						>
							<h3 className='font-semibold text-[28px] leading-[1.1] tracking-[-0.02em]'>
								<span className='mr-[0.22em] text-lime'>{pad(i + 1)}</span>{' '}
								{step.title}
							</h3>
							<CornerFrame className='flex aspect-[5/4] w-full items-center bg-hatch-dark text-lime/70'>
								<HairlineFigure
									name={step.figure}
									label={step.figureLabel}
									palette='dark'
								/>
							</CornerFrame>
							<p className='text-base text-soft/80 leading-[1.6]'>
								{step.body}
							</p>
						</li>
					))}
				</ol>

				<div data-reveal='up' className='flex flex-col gap-7 pt-4'>
					<div className='flex flex-col gap-3 lg:flex-row lg:items-baseline lg:justify-between lg:gap-12'>
						<h3 className='font-semibold text-[32px] tracking-[-0.02em]'>
							Até onde cada um vai.
						</h3>
						<p className='max-w-[520px] text-base text-soft/80 leading-[1.6]'>
							Cada modelo tem o seu papel, e o nosso inclui acompanhar a solução
							em uso.
						</p>
					</div>

					<div className='grid grid-cols-4 items-center gap-y-3.5 font-mono text-[10px] tracking-[0.04em] sm:text-xs lg:grid-cols-[190px_repeat(4,minmax(0,1fr))]'>
						<span aria-hidden className='max-lg:hidden' />
						{steps.map(step => (
							<span
								key={step.title}
								aria-hidden
								className='border-soft/25 border-l pb-1.5 pl-2 text-soft/70 lowercase sm:pl-3'
							>
								{step.title}
							</span>
						))}

						{reach.map(row => {
							const own = 'own' in row
							return (
								<div key={row.who} className='contents'>
									<span
										className={cn(
											'col-span-4 font-sans font-semibold text-[17px] tracking-normal max-lg:mt-2 lg:col-span-1',
											own && 'text-lime'
										)}
									>
										{row.who}
									</span>
									{row.from > 1 && (
										<span
											aria-hidden
											style={span(1, row.from - 1)}
											className={cn(
												cell,
												'h-10 border-soft/30 border-b border-dashed'
											)}
										/>
									)}
									<span
										style={span(row.from, row.to)}
										className={cn(
											cell,
											'flex h-10 items-center justify-end rounded-md px-3.5 text-xs',
											own
												? 'bg-lime font-medium text-move-deep'
												: 'border-soft border-r-[3px] bg-soft/15'
										)}
									>
										{row.label}
									</span>
									{row.to < steps.length && (
										<span
											aria-hidden
											style={span(row.to + 1, steps.length)}
											className={cn(
												cell,
												'h-10 border-soft/30 border-b border-dashed'
											)}
										/>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}

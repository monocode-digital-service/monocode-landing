import DotField from '@/components/backgrounds/dot-field'
import { SectionLabel } from '@/components/brand/section-label'

const steps = [
	{
		title: 'Análise',
		body: 'Você conta o problema do jeito que ele aparece no dia a dia. A Monocode estuda a operação, os sistemas e os números, e diz onde a tecnologia ajuda. Inclusive quando a resposta é não precisar de IA.',
	},
	{
		title: 'Proposta',
		body: 'Escopo, investimento, cronograma e cuidado com os seus dados, tudo por escrito. Você decide com o mapa inteiro na mão.',
	},
	{
		title: 'Construção e evolução',
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
				<DotField gradientFrom='#92FF5F' gradientTo='#0F3B27' dotRadius={1} />
			</div>

			<div className='pointer-events-none mx-auto flex min-h-[860px] max-w-[1440px] flex-col justify-between gap-24 px-5 py-20 md:px-10 xl:px-20 xl:pt-[110px] xl:pb-[74px]'>
				<div className='flex max-w-[640px] flex-col gap-5'>
					<SectionLabel tone='light'>Como trabalhamos</SectionLabel>
					<h2 className='font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'>
						Primeiro entender.
						<br />
						Depois construir.
					</h2>
				</div>

				<ol className='pointer-events-auto grid gap-10 md:grid-cols-3'>
					{steps.map((step, i) => (
						<li
							key={step.title}
							className='flex flex-col gap-3 border-lime/50 border-t pt-5'
						>
							<span className='font-mono text-[13px] text-lime'>
								{String(i + 1).padStart(2, '0')}
							</span>
							<h3 className='font-semibold text-[26px] tracking-[-0.01em]'>
								{step.title}
							</h3>
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

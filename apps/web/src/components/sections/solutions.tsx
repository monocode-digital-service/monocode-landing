import { cn } from '@monocode-landing/ui/lib/utils'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { TagList } from '@/components/brand/tag-list'
import { HairlineFigure } from '@/components/hairline/hairline-figure'

// As cenas do dia a dia ficam na seção "O que muda quando a IA entra" (lib/situations.ts).
// Aqui cada peça é explicada em poucas linhas, para não contar a mesma história duas vezes.
const solutions = [
	{
		title: 'Automações',
		figure: 'turno',
		figureLabel: 'Braço robótico empilhando blocos de dados',
		lead: 'O trabalho repetido roda sozinho, na regra que o seu time definiu.',
		body: 'CRM, ERP e planilha ficam sincronizados, sem ninguém redigitar nada.',
		tags: ['integrações', 'follow-up', 'relatórios', 'backoffice'],
	},
	{
		title: 'Agentes de IA',
		figure: 'sinal',
		figureLabel: 'Agente central ligado a WhatsApp, time, dados e políticas',
		lead: 'Conhecem a sua empresa, decidem o próximo passo e chamam uma pessoa quando precisa.',
		body: 'Trabalham onde o time já está: no Slack, no Notion, no WhatsApp, no CRM. O que sai para fora passa antes por uma pessoa.',
		tags: [
			'base de conhecimento',
			'classificação',
			'conteúdo',
			'agente interno',
		],
	},
	{
		title: 'Aplicações sob medida',
		figure: 'encaixe',
		figureLabel: 'Peças sob medida encaixando numa janela de aplicativo',
		lead: 'Ferramentas pensadas para ser inteligentes e fáceis de usar todo dia.',
		body: 'A tela mostra só o que importa naquele momento e conversa com o CRM, o Notion e o Slack que a empresa já usa.',
		tags: ['aplicativo', 'sistema interno', 'saas', 'primeira versão'],
	},
] as const

export function Solutions() {
	return (
		<section id='solucoes' className='scroll-mt-4 bg-soft text-ink'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 xl:gap-20 xl:px-20 xl:py-[120px]'>
				<div className='flex flex-col gap-8'>
					<SectionLabel path='solucoes' />
					<h2
						data-reveal='lines'
						className='max-w-[640px] font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'
					>
						O que construímos para a sua operação.
					</h2>
				</div>

				<ol className='border-ink/25 border-b'>
					{solutions.map((s, i) => (
						<li
							key={s.title}
							className={cn(
								'flex flex-col gap-8 border-ink/25 border-t py-10 lg:flex-row lg:items-center lg:gap-[72px]',
								i % 2 === 1 && 'lg:flex-row-reverse'
							)}
						>
							<figure
								data-reveal='scale'
								className='w-full shrink-0 lg:w-[min(640px,48%)]'
							>
								<CornerFrame className='flex aspect-[5/4] w-full items-center bg-hatch text-ink [background-color:var(--color-panel)]'>
									<HairlineFigure name={s.figure} label={s.figureLabel} />
								</CornerFrame>
							</figure>

							<div className='flex flex-1 flex-col gap-4'>
								<h3
									data-reveal='up'
									className='text-balance font-semibold text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.04em]'
								>
									<span className='mr-[0.19em] text-numeral'>
										{String(i + 1).padStart(2, '0')}
									</span>{' '}
									{s.title}
								</h3>
								<p data-reveal='up' className='mt-2 font-semibold text-xl'>
									{s.lead}
								</p>
								<p
									data-reveal='up'
									className='text-base text-ink/80 leading-[1.6]'
								>
									{s.body}
								</p>
								<TagList tags={s.tags} />
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}

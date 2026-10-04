import { cn } from '@monocode-landing/ui/lib/utils'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { TagList } from '@/components/brand/tag-list'
import { HairlineFigure } from '@/components/hairline/hairline-figure'

const solutions = [
	{
		title: 'Automações',
		figure: 'turno',
		figureLabel: 'Braço robótico empilhando blocos de dados',
		lead: 'O trabalho repetido sai da mão do seu time.',
		body: 'O lead chega e já está qualificado e distribuído. O follow-up acontece sem ninguém lembrar. O relatório de segunda-feira se monta sozinho. E CRM, ERP e planilha passam a falar a mesma língua, sem ninguém redigitar nada.',
		tags: ['integrações', 'follow-up', 'relatórios', 'backoffice'],
		tone: 'peach',
	},
	{
		title: 'Agentes de IA',
		figure: 'sinal',
		figureLabel: 'Agente central ligado a WhatsApp, time, dados e políticas',
		lead: 'Atendem com a voz da sua empresa e sabem quando chamar alguém.',
		body: 'No WhatsApp, um agente atende, entende o pedido e qualifica o contato antes de passar para o time. Por dentro, outro consulta estoque, políticas, histórico e prazos, e executa a tarefa que antes dependia de alguém procurar a informação.',
		tags: ['atendimento', 'qualificação', 'agente interno', 'whatsapp'],
		tone: 'mint',
	},
	{
		title: 'Soluções sob medida',
		figure: 'encaixe',
		figureLabel: 'Peças sob medida encaixando numa janela de aplicativo',
		lead: 'Para quando nada pronto encaixa.',
		body: 'Aplicativos, sistemas internos e plataformas SaaS desenhados em volta do seu processo e ligados às ferramentas que você já paga. Primeiras versões para testar uma ideia antes do investimento grande. E, se o problema estiver no mundo físico, sensores e dispositivos conectados aos seus sistemas.',
		tags: ['aplicativo', 'saas', 'sistema interno', 'primeira versão', 'iot'],
		tone: 'ice',
	},
] as const

export function Solutions() {
	return (
		<section id='solucoes' className='scroll-mt-4 bg-soft text-move'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-6 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
				<SectionLabel path='solucoes' />
				<h2 className='font-semibold text-move/60 text-xl'>
					Onde a Monocode entra na sua operação.
				</h2>

				<ol className='border-move border-b'>
					{solutions.map((s, i) => (
						<li
							key={s.title}
							className={cn(
								'flex flex-col gap-8 border-move border-t py-10 lg:flex-row lg:items-center lg:gap-[72px]',
								i % 2 === 1 && 'lg:flex-row-reverse'
							)}
						>
							<figure className='w-full shrink-0 lg:w-[min(640px,48%)]'>
								<CornerFrame className='flex aspect-[5/4] w-full items-center bg-[#f5f8f5] bg-hatch text-move'>
									<HairlineFigure name={s.figure} label={s.figureLabel} />
								</CornerFrame>
							</figure>

							<div className='flex flex-1 flex-col gap-4'>
								<span className='font-mono text-[13px] text-move/50'>
									{String(i + 1).padStart(3, '0')}
								</span>
								<h3 className='font-semibold text-[clamp(2.75rem,4.5vw,4rem)] leading-none tracking-[-0.04em]'>
									{s.title}
								</h3>
								<p className='mt-2 font-semibold text-xl'>{s.lead}</p>
								<p className='text-base text-move/80 leading-[1.6]'>{s.body}</p>
								<TagList tags={s.tags} tone={s.tone} />
							</div>
						</li>
					))}
				</ol>
			</div>
		</section>
	)
}

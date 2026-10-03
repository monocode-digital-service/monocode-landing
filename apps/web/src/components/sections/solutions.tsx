import Image from 'next/image'
import { SectionLabel } from '@/components/brand/section-label'
import { TagList } from '@/components/brand/tag-list'

const solutions = [
	{
		title: 'Automações',
		figure: '/brand/figure-automations.svg',
		lead: 'O trabalho repetido sai da mão do seu time.',
		body: 'O lead chega e já está qualificado e distribuído. O follow-up acontece sem ninguém lembrar. O relatório de segunda-feira se monta sozinho. E CRM, ERP e planilha passam a falar a mesma língua, sem ninguém redigitar nada.',
		tags: ['integrações', 'follow-up', 'relatórios', 'backoffice'],
		tone: 'peach',
	},
	{
		title: 'Agentes de IA',
		figure: '/brand/figure-agents.svg',
		lead: 'Atendem com a voz da sua empresa e sabem quando chamar alguém.',
		body: 'No WhatsApp, um agente atende, entende o pedido e qualifica o contato antes de passar para o time. Por dentro, outro consulta estoque, políticas, histórico e prazos, e executa a tarefa que antes dependia de alguém procurar a informação.',
		tags: ['atendimento', 'qualificação', 'agente interno', 'whatsapp'],
		tone: 'mint',
	},
	{
		title: 'Soluções sob medida',
		figure: '/brand/figure-custom.svg',
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
				<SectionLabel>Soluções que construímos</SectionLabel>
				<h2 className='font-semibold text-move/60 text-xl'>
					Onde a Monocode entra na sua operação.
				</h2>

				<ol className='border-move border-b'>
					{solutions.map((s, i) => (
						<li
							key={s.title}
							className='grid gap-8 border-move border-t py-9 lg:grid-cols-[minmax(0,520px)_220px_minmax(0,1fr)] lg:gap-10'
						>
							<h3 className='font-semibold text-[clamp(2.75rem,5vw,4.5rem)] leading-none tracking-[-0.04em]'>
								{s.title}
							</h3>

							<figure className='flex flex-col gap-2.5'>
								<figcaption className='font-mono text-[13px] text-move/50'>
									{String(i + 1).padStart(3, '0')}
								</figcaption>
								<div className='relative size-[220px]'>
									{[
										'/brand/hatch-square.svg',
										'/brand/corners-square.svg',
										s.figure,
									].map(src => (
										<Image
											key={src}
											src={src}
											width={220}
											height={220}
											alt=''
											className='absolute inset-0'
										/>
									))}
								</div>
							</figure>

							<div className='flex flex-col gap-3.5 lg:pt-3'>
								<p className='font-semibold text-lg'>{s.lead}</p>
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

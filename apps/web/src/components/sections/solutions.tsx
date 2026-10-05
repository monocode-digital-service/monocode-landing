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
		lead: 'O trabalho repetido roda sozinho, na regra que o seu time definiu.',
		body: 'O lead que chega vai para o vendedor certo, com aviso no Slack. O follow-up sai na hora combinada. O relatório de segunda-feira se monta com os dados da semana e aparece no Notion. E CRM, ERP e planilha ficam sincronizados, sem ninguém redigitar nada.',
		tags: ['integrações', 'follow-up', 'relatórios', 'backoffice'],
		tone: 'peach',
	},
	{
		title: 'Agentes de IA',
		figure: 'sinal',
		figureLabel: 'Agente central ligado a WhatsApp, time, dados e políticas',
		lead: 'Conhecem a sua empresa, decidem o próximo passo e chamam uma pessoa quando precisa.',
		body: 'Cada agente aprende sobre a sua empresa a partir dos documentos, produtos e histórico, e trabalha onde o time já está: no Slack, no Notion, no WhatsApp, no CRM. Um classifica os contatos que chegam e avisa o vendedor quando vale a pena. Outro sugere pautas, escreve no tom da marca e monta as imagens a partir dos seus modelos. Outro responde ao time sobre contratos, estoque e políticas. O que sai para fora passa antes por uma pessoa.',
		tags: [
			'base de conhecimento',
			'classificação',
			'conteúdo',
			'agente interno',
		],
		tone: 'mint',
	},
	{
		title: 'Aplicações sob medida',
		figure: 'encaixe',
		figureLabel: 'Peças sob medida encaixando numa janela de aplicativo',
		lead: 'Ferramentas pensadas para ser inteligentes e fáceis de usar todo dia.',
		body: 'Ferramentas internas feitas para um processo específico, com agentes trabalhando dentro: um estúdio de conteúdo que lê sobre a marca e produz a partir de modelos, um painel que classifica pedidos e sugere o próximo passo, uma primeira versão para testar uma ideia antes do investimento grande. A tela mostra só o que importa naquele momento e conversa com o CRM, o Notion e o Slack que a empresa já usa.',
		tags: ['aplicativo', 'sistema interno', 'saas', 'primeira versão'],
		tone: 'ice',
	},
] as const

export function Solutions() {
	return (
		<section id='solucoes' className='scroll-mt-4 bg-soft text-move'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-20 md:px-10 xl:gap-20 xl:px-20 xl:py-[120px]'>
				<div className='flex flex-col gap-8'>
					<SectionLabel path='solucoes' />
					<h2 className='max-w-[640px] font-semibold text-[clamp(2.5rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.03em]'>
						O que construímos para a sua operação.
					</h2>
				</div>

				<ol className='border-move/25 border-b'>
					{solutions.map((s, i) => (
						<li
							key={s.title}
							className={cn(
								'flex flex-col gap-8 border-move/25 border-t py-10 lg:flex-row lg:items-center lg:gap-[72px]',
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
									{String(i + 1).padStart(2, '0')}
								</span>
								<h3 className='font-semibold text-[clamp(2rem,3.6vw,3.25rem)] leading-none tracking-[-0.04em] lg:whitespace-nowrap'>
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

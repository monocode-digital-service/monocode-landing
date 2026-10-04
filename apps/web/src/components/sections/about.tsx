import { SectionLabel } from '@/components/brand/section-label'
import { site } from '@/lib/site'

export function About() {
	return (
		<section
			id='sobre'
			className='scroll-mt-4 border-move/15 border-t bg-soft text-move'
		>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-20 md:px-10 lg:flex-row lg:items-center lg:gap-[72px] xl:px-20 xl:py-[120px]'>
				{/* TODO: substituir pela foto do fundador (1:1) */}
				<div className='relative aspect-square w-full max-w-[520px] shrink-0 rounded-lg border border-move/40 border-dashed bg-white'>
					<p className='absolute bottom-6 left-6 font-mono text-[11px] text-sage'>
						foto do fundador · 1:1
					</p>
				</div>

				<div className='flex flex-1 flex-col gap-5'>
					<SectionLabel path='quem-esta-por-tras' />
					<h2 className='font-semibold text-[clamp(2.5rem,4.2vw,3.25rem)] leading-[1.02] tracking-[-0.03em]'>
						Engenharia testada em marcas globais, agora dentro da sua operação.
					</h2>
					<div className='flex flex-col gap-5 text-[17px] leading-[1.6]'>
						<p>
							Por trás da Monocode está Vanderson Arruda, engenheiro de software
							que passou 25 anos construindo onde o erro aparece em público:
							experiências para Netflix, Google, Microsoft, Amazon e Samsung,
							plataformas de mídia que decidem em milissegundos e instalações em
							que o código move objetos físicos.
						</p>
						<p>
							Desse caminho vieram mais de 100 prêmios internacionais, entre
							eles 13 Leões em Cannes. E um critério que a Monocode leva para
							cada projeto: entender o problema antes de escrever a primeira
							linha.
						</p>
						<p>O nome vem daí. Um problema por vez, resolvido com código.</p>
					</div>
					<div className='flex gap-7 font-semibold text-base'>
						<a
							href={site.founderLinkedinUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='underline hover:no-underline'
						>
							LinkedIn
						</a>
						<a
							href={site.portfolioUrl}
							target='_blank'
							rel='noopener noreferrer'
							className='underline hover:no-underline'
						>
							Portfólio
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

import Image from 'next/image'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { WaveBackground } from '@/components/brand/wave-background'
import { site } from '@/lib/site'

export function About() {
	return (
		<section id='sobre' className='relative isolate scroll-mt-4 text-move'>
			<WaveBackground className='bg-[#dbe9dd]' bottom={false} />
			<div className='mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-20 md:px-10 lg:flex-row lg:items-start lg:gap-[72px] xl:px-20 xl:py-[120px]'>
				{/* cantoneiras por fora: a imagem fica na coluna do grid e no topo da linha do rótulo */}
				<CornerFrame className='-m-2 w-[calc(100%+1rem)] max-w-[536px] shrink-0 p-2 text-move'>
					<Image
						src='/team/vanderson.webp'
						alt='Vanderson Arruda, fundador da Monocode'
						width={1200}
						height={1200}
						sizes='(min-width: 1024px) 520px, 100vw'
						className='aspect-square h-auto w-full object-cover'
					/>
				</CornerFrame>

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

import Image from 'next/image'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { WaveBackground } from '@/components/brand/wave-background'
import { site } from '@/lib/site'

export function About() {
	return (
		<section id='sobre' className='relative isolate scroll-mt-4 text-move'>
			<WaveBackground className='bg-[#dbe9dd]' bottom={false} />
			{/* continua por baixo do fechamento: quando a onda dele afunda, aparece este tom e não o branco */}
			<div
				aria-hidden
				className='absolute inset-x-0 top-full -z-10 h-[300px] bg-[#dbe9dd]'
			/>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-12 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
				<SectionLabel path='quem-esta-por-tras' />
				<div className='flex flex-col gap-12 lg:flex-row lg:gap-[72px]'>
					{/* cantoneiras por fora; no desktop a foto acompanha a altura do texto */}
					<CornerFrame className='-m-2 w-[calc(100%+1rem)] max-w-[536px] shrink-0 p-2 text-move lg:w-[min(536px,42%)]'>
						<div className='relative aspect-square lg:aspect-auto lg:h-full'>
							<Image
								src='/team/vanderson.webp'
								alt='Vanderson Arruda, fundador da Monocode'
								fill
								sizes='(min-width: 1024px) 520px, 100vw'
								className='object-cover'
							/>
						</div>
					</CornerFrame>

					<div className='flex flex-1 flex-col gap-5'>
						<h2 className='font-semibold text-[clamp(2.5rem,4.2vw,3.25rem)] leading-[1.02] tracking-[-0.03em]'>
							25 anos de engenharia, agora dedicados a IA aplicada.
						</h2>
						<div className='flex flex-col gap-5 text-[17px] leading-[1.6]'>
							<p>
								Por trás da Monocode está Vanderson Arruda, engenheiro de
								software há 25 anos. Boa parte desse tempo foi em agências como
								JWT e Monks, construindo campanhas e plataformas para marcas
								como Netflix, Google, Microsoft, Amazon e Samsung, onde o prazo
								é curto e o erro aparece em público. Os projetos desse período
								somaram mais de 100 prêmios internacionais.
							</p>
							<p>
								Hoje esse repertório está em IA aplicada: agentes, automações e
								aplicações que funcionam dentro da operação de empresas sem time
								técnico próprio. A própria Monocode funciona assim, e cada
								ferramenta é testada em casa antes de chegar ao cliente.
							</p>
							<p>
								O critério continua o mesmo: entender o problema antes de
								escrever a primeira linha. Daí o nome: um problema por vez,
								resolvido com código.
							</p>
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
			</div>
		</section>
	)
}

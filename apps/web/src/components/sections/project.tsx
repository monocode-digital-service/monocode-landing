'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import Image from 'next/image'
import { useState } from 'react'

import { CornerFrame } from '@/components/brand/corner-frame'
import { SectionLabel } from '@/components/brand/section-label'
import { type Project as ProjectData, projects } from '@/lib/projects'

const pad = (n: number) => String(n).padStart(2, '0')

const flow = [
	{ title: 'Pedido ao agente', icon: '/brand/icon-chat.svg' },
	{ title: 'Produção com a base da marca', icon: '/brand/icon-layers.svg' },
	{ title: 'Revisão · nota de 0 a 100', icon: '/brand/icon-gauge.svg' },
	{ title: 'Aprovação humana', icon: '/brand/icon-shield.svg', accent: true },
] as const

// Fluxo do Movvai como slide da galeria
function FlowSlide() {
	return (
		<div className='flex size-full flex-col justify-center bg-[#f5f8f5] bg-hatch px-6 py-8 sm:px-14'>
			<ol className='flex flex-col'>
				{flow.map((step, i) => (
					<li key={step.title} className='flex flex-col items-center'>
						{i > 0 && <span aria-hidden className='h-4 w-px bg-move/40' />}
						<div
							className={cn(
								'flex h-14 w-full items-center gap-5 border bg-white px-5 sm:gap-8',
								'accent' in step ? 'border-orange' : 'border-line'
							)}
						>
							<span className='font-semibold text-lg text-move/40'>
								{pad(i + 1)}
							</span>
							<span className='flex-1 font-bold text-sm uppercase tracking-[0.02em] sm:text-base'>
								{step.title}
							</span>
							<Image src={step.icon} width={24} height={24} alt='' />
						</div>
					</li>
				))}
			</ol>
		</div>
	)
}

function Gallery({ project }: { project: ProjectData }) {
	const [index, setIndex] = useState(0)
	const total = project.media.length
	const media = project.media[index]
	const go = (step: number) => setIndex(i => (i + step + total) % total)
	const arrow =
		'absolute top-1/2 z-10 flex size-12 -translate-y-1/2 items-center justify-center rounded-full border border-lime/50 bg-move/80 font-mono text-lg text-lime transition-colors hover:bg-move'

	return (
		<figure className='flex w-full flex-col gap-4'>
			<CornerFrame className='overflow-hidden bg-move text-move lg:aspect-[16/10]'>
				{media.kind === 'flow' && <FlowSlide />}
				{media.kind === 'image' && (
					<Image
						src={media.src}
						alt={media.alt}
						fill
						sizes='(min-width: 1024px) 760px, 100vw'
						className='object-cover'
					/>
				)}
				{media.kind === 'video' && (
					// biome-ignore lint/a11y/useMediaCaption: demonstração sem fala
					<video
						key={media.src}
						src={media.src}
						poster={media.poster}
						controls
						playsInline
						className='size-full object-cover'
					/>
				)}
				{total > 1 && (
					<>
						<button
							type='button'
							aria-label='Mídia anterior'
							onClick={() => go(-1)}
							className={cn(arrow, 'left-5')}
						>
							←
						</button>
						<button
							type='button'
							aria-label='Próxima mídia'
							onClick={() => go(1)}
							className={cn(arrow, 'right-5')}
						>
							→
						</button>
					</>
				)}
			</CornerFrame>
			{(media.caption || total > 1) && (
				<figcaption className='flex justify-between gap-4 font-mono text-sage text-xs'>
					<span>{media.caption}</span>
					{total > 1 && (
						<span className='text-move'>
							{pad(index + 1)} / {pad(total)}
						</span>
					)}
				</figcaption>
			)}
		</figure>
	)
}

export function Project() {
	const [active, setActive] = useState(0)
	const project = projects[active]
	const others = projects.filter((_, i) => i !== active)

	return (
		<section id='projeto' className='scroll-mt-4 bg-soft text-move'>
			<div className='mx-auto flex max-w-[1440px] flex-col gap-10 px-5 py-20 md:px-10 xl:px-20 xl:py-[120px]'>
				<SectionLabel path='projetos' />

				<article className='flex flex-col gap-7'>
					<div className='flex justify-between font-mono text-[13px] text-sage'>
						<span>
							{pad(active + 1)} / {pad(projects.length)}
						</span>
						<span>
							{project.type} · {project.year}
						</span>
					</div>
					<div className='flex flex-col gap-12 lg:flex-row lg:gap-16'>
						<div className='flex flex-col gap-[22px] lg:w-[460px] lg:shrink-0'>
							<h2 className='font-semibold text-[clamp(2.25rem,3.5vw,2.75rem)] leading-[1.08] tracking-[-0.03em]'>
								{project.title}
							</h2>
							<dl>
								{project.facts.map(f => (
									<div
										key={f.label}
										className='flex gap-4 border-move/20 border-b py-2.5'
									>
										<dt className='w-[110px] font-mono text-[13px] text-sage uppercase tracking-[0.06em]'>
											{f.label}
										</dt>
										<dd className='font-semibold text-base'>{f.value}</dd>
									</div>
								))}
							</dl>
							<p className='text-base text-move/80 leading-[1.6]'>
								{project.body}
							</p>
						</div>
						<Gallery key={project.slug} project={project} />
					</div>
				</article>

				{others.length > 0 && (
					<ul className='border-move/25 border-b'>
						{others.map(p => (
							<li key={p.slug} className='border-move/25 border-t'>
								<button
									type='button'
									onClick={() => setActive(projects.indexOf(p))}
									className='flex w-full items-center gap-6 py-5 text-left transition-colors hover:bg-move/5'
								>
									<span className='w-14 font-mono text-[13px]'>
										{pad(projects.indexOf(p) + 1)}
									</span>
									<span className='flex-1 font-semibold text-[22px]'>
										{p.name}
									</span>
									<span className='hidden w-36 font-mono text-[13px] text-sage sm:block'>
										{p.type}
									</span>
									<span className='hidden w-40 md:block'>{p.client}</span>
									<span className='font-mono text-[13px]'>abrir +</span>
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</section>
	)
}

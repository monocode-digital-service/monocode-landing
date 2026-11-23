'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useLenis } from 'lenis/react'
import { ArrowRight } from 'lucide-react'
import { useLayoutEffect, useRef, useState } from 'react'

import { CornerFrame } from '@/components/brand/corner-frame'
import type { Actor, Front, Situation } from '@/lib/situations'

const pad = (n: number) => String(n).padStart(2, '0')

// A caixa do item escolhido desliza de um item para o outro, sempre só com transform
const slide =
	'pointer-events-none absolute bg-ink transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] motion-reduce:transition-none'
// altura de referência da caixa da lista: a altura real vem por scaleY, para não animar height
const BAR = 100

// Cor da etiqueta de quem faz cada passo; quem não está aqui usa o tom neutro
const actorTone: Partial<Record<Actor, string>> = {
	agente: 'bg-lime text-ink',
	automação: 'bg-ochre text-ink',
	integração: 'bg-petrol text-ink',
	aplicação: 'bg-petrol text-ink',
	pessoa: 'bg-orange text-ink',
}

/** Passos de uma situação: quem faz o quê, as etiquetas e, quando há, o projeto que mostra aquilo na prática. */
function Steps({
	situation,
	className,
}: {
	situation: Situation
	className?: string
}) {
	return (
		<div
			className={cn(
				'flex w-full flex-col bg-ink-deep px-5 pt-[26px] pb-6 font-mono text-sm text-soft leading-normal sm:px-7',
				className
			)}
		>
			<div className='flex flex-wrap justify-between gap-x-4 gap-y-2 border-soft/15 border-b pb-4'>
				<span className='text-lime'>{situation.area}</span>
				<span className='text-soft/65'>como o trabalho passa a acontecer</span>
			</div>
			<ol className='mt-[26px] flex flex-col gap-5'>
				{situation.steps.map(([actor, text], i) => (
					<li
						key={text}
						className='flex animate-rise flex-wrap items-baseline gap-x-4 gap-y-2 motion-reduce:animate-none'
						style={{ animationDelay: `${80 + i * 120}ms` }}
					>
						<span
							className={cn(
								'w-[104px] shrink-0 rounded-[6px] px-2 py-1 text-center text-[11px] uppercase tracking-[0.06em]',
								actorTone[actor] ?? 'bg-soft/15 text-soft'
							)}
						>
							{actor}
						</span>
						<span className='min-w-[220px] flex-1 font-sans text-[17px] leading-[1.45]'>
							{text}
						</span>
					</li>
				))}
			</ol>
			{situation.project && (
				<a
					href={situation.project.href}
					className='mt-5 self-start py-2.5 font-sans font-semibold text-base text-lime underline underline-offset-[5px] hover:no-underline'
				>
					{situation.project.label}
				</a>
			)}
			<ul className='mt-auto flex flex-wrap gap-1.5 pt-7'>
				{situation.tags.map(tag => (
					<li
						key={tag}
						className='rounded-[6px] border border-soft/30 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.06em]'
					>
						{tag}
					</li>
				))}
			</ul>
			<p className='mt-[18px] border-soft/15 border-t pt-3.5 text-[11px] text-soft/65 uppercase tracking-[0.04em]'>
				Exemplos ilustrativos · cada empresa tem o seu fluxo
			</p>
		</div>
	)
}

/**
 * Abas das frentes, lista de situações e os passos da situação escolhida.
 * No desktop os passos ficam num painel ao lado da lista; no celular abrem logo abaixo da situação tocada,
 * para a troca acontecer onde a pessoa está olhando.
 */
export function SituationsExplorer({ fronts }: { fronts: readonly Front[] }) {
	const [frontIndex, setFrontIndex] = useState(0)
	const [index, setIndex] = useState(0)
	const front = fronts[frontIndex]
	const current = front.situations[index]
	// remonta os passos a cada troca, para as linhas entrarem de novo
	const stepsKey = `${front.id}-${index}`
	const tabs = useRef<(HTMLButtonElement | null)[]>([])
	const selectFront = (i: number) => {
		// a frente já escolhida não reinicia a situação
		if (i === frontIndex) return
		setFrontIndex(i)
		setIndex(0)
	}

	// Caixa da situação escolhida (desktop): mede a linha escolhida e leva a caixa até ela.
	// As linhas têm alturas diferentes, então a medida é refeita quando a lista muda de tamanho.
	const list = useRef<HTMLUListElement>(null)
	const rows = useRef<(HTMLButtonElement | null)[]>([])
	const [bar, setBar] = useState<{ y: number; h: number } | null>(null)
	// biome-ignore lint/correctness/useExhaustiveDependencies: a troca de frente muda as linhas medidas
	useLayoutEffect(() => {
		const measure = () => {
			const row = rows.current[index]
			if (row) setBar({ y: row.offsetTop, h: row.offsetHeight })
		}
		measure()
		if (!list.current) return
		const observer = new ResizeObserver(measure)
		observer.observe(list.current)
		return () => observer.disconnect()
	}, [index, frontIndex])

	// No celular os passos abrem logo abaixo da situação tocada e os da anterior somem. Quando a anterior
	// está acima, a lista encolhe antes do ponto do toque e a linha tocada subiria para fora da tela.
	// Guarda onde a linha estava e, depois da troca, rola a diferença: ela fica onde o dedo a deixou.
	// No desktop os passos ficam no painel ao lado, a linha não sai do lugar e nada é rolado.
	const lenis = useLenis()
	const anchor = useRef<{ row: HTMLElement; top: number } | null>(null)
	const select = (i: number) => {
		const row = rows.current[i]
		if (row) anchor.current = { row, top: row.getBoundingClientRect().top }
		setIndex(i)
	}
	// biome-ignore lint/correctness/useExhaustiveDependencies: roda depois de cada troca de situação
	useLayoutEffect(() => {
		const from = anchor.current
		anchor.current = null
		if (!from) return
		const delta = from.row.getBoundingClientRect().top - from.top
		if (Math.abs(delta) < 1) return
		if (lenis) lenis.scrollTo(window.scrollY + delta, { immediate: true })
		else window.scrollBy(0, delta)
	}, [index, lenis])

	return (
		<div className='flex flex-col'>
			<div
				data-reveal='up'
				role='tablist'
				aria-label='Frentes'
				className='relative grid grid-cols-2 gap-1.5 rounded-lg border border-ink/20 bg-paper p-1.5'
			>
				<span
					aria-hidden
					className={cn(slide, 'inset-y-1.5 left-1.5 rounded-md')}
					style={{
						// largura de uma aba: o espaço interno menos os vãos, dividido pelas abas
						width: `calc((100% - 12px - ${(fronts.length - 1) * 6}px) / ${fronts.length})`,
						transform: `translateX(calc(${frontIndex} * (100% + 6px)))`,
					}}
				/>
				{fronts.map((f, i) => {
					const selected = i === frontIndex
					return (
						<button
							key={f.id}
							type='button'
							role='tab'
							id={`frente-${f.id}`}
							aria-selected={selected}
							aria-controls='frente-conteudo'
							ref={el => {
								tabs.current[i] = el
							}}
							tabIndex={selected ? 0 : -1}
							onClick={() => selectFront(i)}
							// setas trocam de aba, como se espera de um conjunto de abas
							onKeyDown={e => {
								if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
								e.preventDefault()
								const step = e.key === 'ArrowRight' ? 1 : fronts.length - 1
								const next = (i + step) % fronts.length
								selectFront(next)
								tabs.current[next]?.focus()
							}}
							className={cn(
								'relative flex items-center justify-between gap-5 rounded-md px-4 py-4 text-left transition-colors duration-300 md:px-6 md:py-5',
								selected ? 'text-soft' : 'text-ink hover:bg-ink/8'
							)}
						>
							<span className='flex min-w-0 flex-col gap-1.5'>
								<span className='font-semibold text-lg leading-[1.15] tracking-[-0.02em] md:text-[26px] md:leading-[1.1]'>
									{f.name}
								</span>
								<span
									className={cn(
										'font-mono text-xs uppercase tracking-[0.04em] transition-colors duration-300 max-md:hidden',
										selected ? 'text-lime' : 'text-ink-soft'
									)}
								>
									{f.line}
								</span>
							</span>
							{!selected && (
								<span className='flex shrink-0 items-center gap-2.5 font-mono text-xs uppercase tracking-[0.04em] max-lg:hidden'>
									ver situações
									<ArrowRight aria-hidden className='size-[18px]' />
								</span>
							)}
						</button>
					)
				})}
			</div>

			<div
				data-reveal='up'
				role='tabpanel'
				id='frente-conteudo'
				aria-labelledby={`frente-${front.id}`}
				className='flex flex-col gap-8 pt-8'
			>
				<p className='max-w-[860px] text-[17px] text-ink/80 leading-[1.55]'>
					{front.body}
				</p>

				<div className='flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-10'>
					<ul
						ref={list}
						className='relative flex-1 self-start border-ink/25 border-b max-lg:w-full'
					>
						{bar && (
							<span
								aria-hidden
								className={cn(
									slide,
									'top-0 left-0 w-full origin-top max-lg:hidden'
								)}
								style={{
									height: BAR,
									transform: `translateY(${bar.y}px) scaleY(${bar.h / BAR})`,
								}}
							/>
						)}
						{front.situations.map((s, i) => {
							const selected = i === index
							return (
								<li key={s.area} className='border-ink/25 border-t'>
									<button
										type='button'
										aria-pressed={selected}
										ref={el => {
											rows.current[i] = el
										}}
										onClick={() => select(i)}
										className={cn(
											'relative flex w-full items-start gap-[22px] px-5 pt-5 pb-[22px] text-left transition-colors duration-300',
											// antes da primeira medida a própria linha leva o fundo, para o texto claro nunca ficar sem ele
											selected
												? cn('text-soft', bar ? 'max-lg:bg-ink' : 'bg-ink')
												: 'hover:bg-ink/5'
										)}
									>
										<span
											className={cn(
												'pt-0.5 font-mono text-[13px] transition-colors duration-300',
												selected ? 'text-lime' : 'text-ink-soft'
											)}
										>
											{pad(i + 1)}
										</span>
										<span className='flex min-w-0 flex-col gap-1.5'>
											<span
												className={cn(
													'font-mono text-xs uppercase tracking-[0.06em] transition-colors duration-300',
													selected ? 'text-lime' : 'text-ink-soft'
												)}
											>
												{s.area}
											</span>
											<span className='text-pretty font-semibold text-xl leading-[1.3] tracking-[-0.01em]'>
												{s.situation}
											</span>
										</span>
									</button>
									{selected && (
										<Steps key={stepsKey} situation={s} className='lg:hidden' />
									)}
								</li>
							)
						})}
					</ul>

					<CornerFrame className='-m-2 flex-1 p-2 text-ink max-lg:hidden lg:flex'>
						<div aria-live='polite' className='flex w-full'>
							<Steps
								key={stepsKey}
								situation={current}
								className='min-h-[460px] rounded-lg'
							/>
						</div>
					</CornerFrame>
				</div>
			</div>
		</div>
	)
}

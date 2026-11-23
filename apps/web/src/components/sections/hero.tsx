import { WaveBottomEdge } from '@/components/brand/wave-background'
import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { HeroBackground } from '@/components/layout/backgrounds'

export function Hero() {
	return (
		// no desktop o hero acompanha a altura da tela (até 960px), para os botões caberem na primeira dobra
		<section className='relative isolate -mb-(--bend) flex min-h-[calc(max(640px,100svh)+var(--bend))] flex-col overflow-hidden bg-move-deep pb-(--bend) text-soft [--bend:80px] xl:min-h-[calc(clamp(720px,100svh,960px)+var(--bend))] md:[--bend:200px] lg:[--bend:300px]'>
			<WaveBottomEdge />
			<div className='absolute inset-0 -z-10' aria-hidden>
				<HeroBackground />
				{/* Véu de leitura */}
				<div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(10_31_22/0.88)_0%,rgb(10_31_22/0.5)_45%,rgb(10_31_22/0)_72%)]' />
			</div>

			<div
				data-parallax
				className='pointer-events-none mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-40 pb-16 md:px-10 xl:px-20 xl:pb-[110px]'
			>
				<h1
					data-reveal='lines'
					className='max-w-[980px] font-semibold text-[clamp(3rem,7.2vw,6.5rem)] leading-[0.94] tracking-[-0.05em]'
				>
					Colocamos a IA para trabalhar na sua empresa.
				</h1>
				{/* subtítulo e botões entram juntos: o gatilho é o topo do bloco, que já está na primeira dobra */}
				<div data-reveal='up' className='mt-10 flex flex-col gap-9 xl:mt-14'>
					<p className='max-w-[480px] text-soft/85 text-xl leading-[1.45]'>
						Entendemos a operação, construímos a solução e seguimos com você
						depois da entrega.
					</p>
					<div className='pointer-events-auto flex flex-wrap items-center gap-x-7 gap-y-4'>
						<WhatsAppButton />
						<a
							href='/#metodo'
							className='py-2.5 font-semibold text-base underline underline-offset-[5px] hover:no-underline'
						>
							Ver como trabalhamos
						</a>
					</div>
				</div>
			</div>
		</section>
	)
}

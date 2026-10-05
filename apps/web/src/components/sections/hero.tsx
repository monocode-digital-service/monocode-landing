import Topography from '@/components/backgrounds/topography'
import { SiteHeader } from '@/components/layout/site-header'

export function Hero() {
	return (
		<section className='relative isolate flex min-h-[max(640px,100svh)] flex-col overflow-hidden bg-move-deep text-soft xl:min-h-[960px]'>
			<div className='absolute inset-0 -z-10' aria-hidden>
				<Topography
					lowColor='#92FF5F'
					midColor='#0F3B27'
					highColor='#FF7036'
					speed={0.75}
					fillBands
				/>
				{/* Véu de leitura */}
				<div className='pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgb(10_31_22/0.88)_0%,rgb(10_31_22/0.5)_45%,rgb(10_31_22/0)_72%)]' />
			</div>

			<SiteHeader />

			<div className='pointer-events-none mx-auto flex w-full max-w-[1440px] flex-1 flex-col justify-end px-5 pt-40 pb-16 md:px-10 xl:px-20 xl:pb-[110px]'>
				<h1 className='max-w-[980px] font-semibold text-[clamp(3rem,7.2vw,6.5rem)] leading-[0.94] tracking-[-0.05em]'>
					Soluções com IA para quem leva a operação a sério.
				</h1>
				<p className='mt-12 max-w-[520px] text-[17px] text-soft/82 leading-[1.55] xl:mt-[90px]'>
					A Monocode desenha e constrói automações, agentes de IA e sistemas sob
					medida a partir de como a sua empresa já trabalha. Do software ao
					dispositivo físico.
				</p>
			</div>
		</section>
	)
}

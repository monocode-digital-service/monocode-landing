import PixelBlast from '@/components/backgrounds/pixel-blast'
import { WhatsAppButton } from '@/components/brand/whatsapp-button'

export function Closing() {
	return (
		<section className='relative isolate overflow-hidden bg-move text-soft'>
			<div className='absolute inset-0 -z-10' aria-hidden>
				<PixelBlast
					color='#92FF5F'
					variant='square'
					patternScale={3}
					speed={1.5}
				/>
			</div>
			<div className='pointer-events-none mx-auto flex min-h-[620px] max-w-[1440px] flex-col items-start gap-9 px-5 pt-[130px] pb-20 md:px-10 xl:px-20'>
				<h2 className='max-w-[760px] font-semibold text-[clamp(3rem,5.6vw,5rem)] text-soft leading-[0.98] tracking-[-0.04em]'>
					Conte onde a sua operação trava.
				</h2>
				<WhatsAppButton className='pointer-events-auto' />
			</div>
		</section>
	)
}

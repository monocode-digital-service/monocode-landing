import { WhatsAppButton } from '@/components/brand/whatsapp-button'

export function Closing() {
	return (
		<section className='mx-auto flex max-w-[1440px] flex-col items-start gap-9 px-5 pt-[120px] pb-[72px] md:px-10 xl:px-20'>
			<h2
				data-reveal='lines'
				className='max-w-[900px] font-semibold text-[clamp(3rem,6.6vw,6rem)] text-soft leading-[0.96] tracking-[-0.045em]'
			>
				Conte onde a sua operação trava.
			</h2>
			<p
				data-reveal='up'
				className='max-w-[520px] text-[17px] text-soft/82 leading-[1.55]'
			>
				Cada operação tem o seu jeito. Vamos conversar e descobrir juntos o que
				faz sentido para a sua.
			</p>
			<div data-reveal='up'>
				<WhatsAppButton />
			</div>
		</section>
	)
}

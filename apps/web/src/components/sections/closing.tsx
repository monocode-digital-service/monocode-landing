import Image from 'next/image'
import { WhatsAppButton } from '@/components/brand/whatsapp-button'
import { site } from '@/lib/site'

export function Closing() {
	return (
		<section className='relative isolate overflow-hidden bg-move text-soft'>
			<Image
				src='/brand/rings.svg'
				width={1440}
				height={620}
				alt=''
				className='absolute top-0 left-1/2 -z-10 h-full w-auto max-w-none -translate-x-1/2 xl:left-0 xl:w-full xl:translate-x-0'
			/>
			<div className='mx-auto flex min-h-[620px] max-w-[1440px] flex-col gap-9 px-5 pt-[130px] pb-20 md:px-10 xl:px-20'>
				<h2 className='max-w-[760px] font-semibold text-[clamp(3rem,5.6vw,5rem)] text-lime leading-[0.98] tracking-[-0.04em]'>
					Conte onde a sua operação trava.
				</h2>
				<div className='flex flex-wrap items-center gap-7'>
					<WhatsAppButton />
					<a
						href={`mailto:${site.email}`}
						className='text-[17px] underline hover:no-underline'
					>
						{site.email}
					</a>
				</div>
			</div>
		</section>
	)
}

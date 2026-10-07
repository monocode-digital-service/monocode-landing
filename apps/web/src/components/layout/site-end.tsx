import { WaveBackground } from '@/components/brand/wave-background'
import { SiteFooter } from '@/components/layout/site-footer'
import { Closing } from '@/components/sections/closing'

/** Fechamento e footer num bloco só, sobre uma hachura que some de cima para baixo. */
export function SiteEnd() {
	return (
		<div className='relative isolate text-soft'>
			<WaveBackground className='bg-move' bottom={false}>
				<div className='absolute inset-0 bg-hatch-lime [mask-image:linear-gradient(180deg,#000,transparent_85%)]' />
			</WaveBackground>
			<Closing />
			<SiteFooter />
		</div>
	)
}

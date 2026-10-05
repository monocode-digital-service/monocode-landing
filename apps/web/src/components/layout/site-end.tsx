import { WaveBackground } from '@/components/brand/wave-background'
import { ClosingBackground } from '@/components/layout/backgrounds'
import { SiteFooter } from '@/components/layout/site-footer'
import { Closing } from '@/components/sections/closing'

/** Fechamento e footer num bloco só, sobre o mesmo fundo de pontos que some de cima para baixo. */
export function SiteEnd() {
	return (
		<div className='relative isolate text-soft'>
			<WaveBackground className='bg-move' bottom={false} />
			<div className='absolute inset-0 -z-10 overflow-hidden' aria-hidden>
				<ClosingBackground />
			</div>
			<Closing />
			<SiteFooter />
		</div>
	)
}

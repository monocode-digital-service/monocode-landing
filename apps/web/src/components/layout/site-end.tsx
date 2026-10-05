import DotField from '@/components/backgrounds/dot-field'
import { WaveBackground } from '@/components/brand/wave-background'
import { SiteFooter } from '@/components/layout/site-footer'
import { Closing } from '@/components/sections/closing'

/** Fechamento e footer num bloco só, sobre o mesmo fundo de pontos que some de cima para baixo. */
export function SiteEnd() {
	return (
		<div className='relative isolate text-soft'>
			<WaveBackground className='bg-move' bottom={false} />
			<div className='absolute inset-0 -z-10 overflow-hidden' aria-hidden>
				<DotField
					gradientFrom='#92FF5F'
					gradientTo='#0F3B27'
					dotRadius={1}
					glowRadius={0}
				/>
			</div>
			<Closing />
			<SiteFooter />
		</div>
	)
}

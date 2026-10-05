'use client'

import dynamic from 'next/dynamic'

import { AfterLoad } from '@/components/brand/after-load'

// Fundos animados fora do bundle inicial: baixados e montados só depois do carregamento
const Topography = dynamic(
	() => import('@/components/backgrounds/topography'),
	{
		ssr: false,
	}
)
const DotField = dynamic(() => import('@/components/backgrounds/dot-field'), {
	ssr: false,
})

export function HeroBackground() {
	return (
		<AfterLoad className='absolute inset-0'>
			<Topography
				lowColor='#92FF5F'
				midColor='#0F3B27'
				highColor='#FF7036'
				speed={0.75}
				fillBands
			/>
		</AfterLoad>
	)
}

export function ClosingBackground() {
	return (
		<AfterLoad className='absolute inset-0'>
			<DotField
				gradientFrom='#92FF5F'
				gradientTo='#0F3B27'
				dotRadius={1}
				glowRadius={0}
			/>
		</AfterLoad>
	)
}

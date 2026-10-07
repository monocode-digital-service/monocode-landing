'use client'

import dynamic from 'next/dynamic'

import { AfterLoad } from '@/components/brand/after-load'

// Fundo animado fora do bundle inicial: baixado e montado só depois do carregamento
const Topography = dynamic(
	() => import('@/components/backgrounds/topography'),
	{
		ssr: false,
	}
)

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

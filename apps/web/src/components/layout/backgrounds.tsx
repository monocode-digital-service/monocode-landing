'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { AfterLoad } from '@/components/brand/after-load'

// Fundo animado fora do bundle inicial: baixado e montado só depois do carregamento
const Topography = dynamic(
	() => import('@/components/backgrounds/topography'),
	{
		ssr: false,
	}
)

// O fundo precisa de WebGL 2. Sem ele (aceleração desligada, navegador antigo, área de trabalho remota)
// o motor do fundo lança um erro e a página inteira cairia na tela de erro: melhor ficar sem o fundo.
const hasWebGL2 = () => {
	try {
		const gl = document.createElement('canvas').getContext('webgl2')
		gl?.getExtension('WEBGL_lose_context')?.loseContext()
		return gl !== null
	} catch {
		return false
	}
}

export function HeroBackground() {
	const [supported, setSupported] = useState(false)
	useEffect(() => setSupported(hasWebGL2()), [])

	if (!supported) return null
	return (
		<AfterLoad className='absolute inset-0'>
			{/* espelham os tokens lime, move e orange do globals.css: o fundo recebe hex, não variável CSS */}
			<Topography
				lowColor='#92FF5F'
				midColor='#0F3B27'
				highColor='#F1472B'
				speed={0.75}
				fillBands
			/>
		</AfterLoad>
	)
}

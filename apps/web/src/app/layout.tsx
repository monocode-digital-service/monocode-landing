import type { Metadata } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'

import '../index.css'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Monocode · Soluções com IA para quem leva a operação a sério',
	description:
		'A Monocode desenha e constrói automações, agentes de IA e sistemas sob medida a partir de como a sua empresa já trabalha. Do software ao dispositivo físico.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR' className='scroll-smooth'>
			<body className={`${manrope.variable} ${geistMono.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}

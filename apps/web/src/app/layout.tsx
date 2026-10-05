import type { Metadata } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'

import '../index.css'

import { SmoothScroll } from '@/components/layout/smooth-scroll'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'Monocode · Coloque a IA para trabalhar na sua empresa',
	description:
		'Agentes de IA que decidem o próximo passo, automações que rodam sozinhas e aplicações sob medida, ligadas aos sistemas que a sua empresa já usa.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR'>
			<body className={`${manrope.variable} ${geistMono.variable} antialiased`}>
				<SmoothScroll />
				{children}
			</body>
		</html>
	)
}

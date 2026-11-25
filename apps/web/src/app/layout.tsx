import type { Metadata } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'

import '../index.css'

import { BackToTop } from '@/components/layout/back-to-top'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteMotion } from '@/components/layout/site-motion'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
import { ENV } from '@/env'
import { openGraphBase } from '@/lib/metadata'
import { site } from '@/lib/site'

const manrope = Manrope({
	variable: '--font-manrope',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

// Roda antes da primeira pintura e fica ativo pela vida do documento (o layout não remonta entre páginas):
// - classe "js": o CSS esconde os elementos animados e fixa o cabeçalho só quando há JavaScript;
// - data-scrolled (saiu do topo: o cabeçalho vira cápsula) e data-scrolled-far (passou da primeira dobra:
//   aparece o botão de voltar ao topo), que o CSS lê pelas variantes in-data-scrolled: e in-data-scrolled-far:.
// Fica aqui, e não num efeito do React, para valer já quando o navegador devolve a rolagem num recarregamento.
const bootScript = `(() => {
	const root = document.documentElement
	root.classList.add('js')
	const update = () => {
		root.toggleAttribute('data-scrolled', scrollY > 24)
		root.toggleAttribute('data-scrolled-far', scrollY > innerHeight * 0.8)
	}
	addEventListener('scroll', update, { passive: true })
	addEventListener('resize', update)
	update()
})()`

export const metadata: Metadata = {
	metadataBase: new URL(site.url),
	title: { default: site.title, template: `%s · ${site.name}` },
	description: site.description,
	applicationName: site.name,
	alternates: { canonical: '/' },
	openGraph: {
		...openGraphBase,
		url: '/',
		title: site.title,
		description: site.description,
	},
	twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='pt-BR' suppressHydrationWarning>
			<body className={`${manrope.variable} ${geistMono.variable} antialiased`}>
				<script dangerouslySetInnerHTML={{ __html: bootScript }} />
				<SmoothScroll />
				<SiteHeader />
				{children}
				<BackToTop />
				<SiteMotion />
				{/* Medição de audiência (Cloudflare Web Analytics, sem cookies). O site não passa pelo proxy da
				    Cloudflare, então o script entra à mão, no formato que ela documenta, e só quando há token. */}
				{ENV.CLOUDFLARE_BEACON_TOKEN && (
					<script
						defer
						src='https://static.cloudflareinsights.com/beacon.min.js'
						data-cf-beacon={JSON.stringify({
							token: ENV.CLOUDFLARE_BEACON_TOKEN,
						})}
					/>
				)}
			</body>
		</html>
	)
}

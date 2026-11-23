import type { Metadata } from 'next'
import { Geist_Mono, Manrope } from 'next/font/google'

import '../index.css'

import { BackToTop } from '@/components/layout/back-to-top'
import { ScrollState } from '@/components/layout/scroll-state'
import { SiteHeader } from '@/components/layout/site-header'
import { SiteMotion } from '@/components/layout/site-motion'
import { SmoothScroll } from '@/components/layout/smooth-scroll'
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
				{/* marca que há JS antes da primeira pintura: o CSS esconde os elementos animados só nesse caso */}
				<script
					dangerouslySetInnerHTML={{
						__html: "document.documentElement.classList.add('js')",
					}}
				/>
				<SmoothScroll />
				<ScrollState />
				<SiteHeader />
				{children}
				<BackToTop />
				<SiteMotion />
			</body>
		</html>
	)
}

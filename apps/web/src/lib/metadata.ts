import type { Metadata } from 'next'

import { site } from '@/lib/site'

// Campos de Open Graph iguais em todas as páginas. O Next troca o objeto openGraph inteiro quando a página
// define o seu (a mescla entre layout e página é rasa), então quem define repete estes campos.
export const openGraphBase = {
	type: 'website',
	locale: 'pt_BR',
	siteName: site.name,
} as const

// Imagem de compartilhamento. Na página inicial ela vem sozinha do arquivo app/opengraph-image.png; a página
// que define o próprio openGraph perde essa herança e precisa declarar a imagem. O texto alternativo é o
// mesmo de app/opengraph-image.alt.txt: os dois mudam juntos.
const openGraphImage = {
	url: '/opengraph-image.png',
	width: 1200,
	height: 630,
	alt: 'Monocode: colocamos a IA para trabalhar na sua empresa.',
} as const

/**
 * Metadados de uma página interna: título, descrição, canônica e Open Graph da própria página.
 * Sem isso a página herda do layout o og:title, a og:description e a og:url da página inicial.
 */
export function pageMetadata({
	title,
	description,
	path,
}: {
	title: string
	description: string
	path: `/${string}`
}): Metadata {
	return {
		title,
		description,
		alternates: { canonical: path },
		openGraph: {
			...openGraphBase,
			url: path,
			title: `${title} · ${site.name}`,
			description,
			images: [openGraphImage],
		},
	}
}

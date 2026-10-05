import { projects } from '@/lib/projects'
import { site } from '@/lib/site'

// Dados estruturados (schema.org) da página inicial: empresa, site e fundador como entidades ligadas.
export const homeJsonLd = {
	'@context': 'https://schema.org',
	'@graph': [
		{
			'@type': 'Organization',
			'@id': `${site.url}/#organization`,
			name: site.name,
			legalName: site.legalName,
			url: site.url,
			logo: `${site.url}/icon.svg`,
			image: `${site.url}/opengraph-image.png`,
			description: site.description,
			email: site.email,
			taxID: site.cnpj,
			address: {
				'@type': 'PostalAddress',
				addressLocality: 'São Paulo',
				addressRegion: 'SP',
				addressCountry: 'BR',
			},
			areaServed: { '@type': 'Country', name: 'Brasil' },
			founder: { '@id': `${site.url}/#founder` },
			sameAs: [site.linkedinUrl],
			knowsAbout: [
				'Agentes de IA',
				'Automação de processos com IA',
				'Integração de sistemas (CRM, ERP, WhatsApp, Slack, Notion)',
				'Aplicações sob medida com IA',
			],
			makesOffer: ['Automações', 'Agentes de IA', 'Aplicações sob medida'].map(
				name => ({
					'@type': 'Offer',
					itemOffered: { '@type': 'Service', name, areaServed: 'BR' },
				})
			),
		},
		{
			'@type': 'WebSite',
			'@id': `${site.url}/#website`,
			url: site.url,
			name: site.name,
			inLanguage: 'pt-BR',
			publisher: { '@id': `${site.url}/#organization` },
		},
		{
			'@type': 'Person',
			'@id': `${site.url}/#founder`,
			name: 'Vanderson Arruda',
			jobTitle: 'Fundador e engenheiro de software',
			image: `${site.url}/team/vanderson.webp`,
			worksFor: { '@id': `${site.url}/#organization` },
			sameAs: [site.founderLinkedinUrl, site.portfolioUrl],
		},
		...projects.map(p => ({
			'@type': 'CreativeWork',
			name: p.name,
			headline: p.title,
			description: p.body,
			dateCreated: String(p.year),
			creator: { '@id': `${site.url}/#organization` },
		})),
	],
}

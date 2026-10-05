import type { MetadataRoute } from 'next'

import { legalLinks, site } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
	const lastModified = new Date()
	return [
		{ url: site.url, lastModified, priority: 1 },
		...legalLinks.map(l => ({
			url: `${site.url}${l.href}`,
			lastModified,
			priority: 0.2,
		})),
	]
}

import { SiteEnd } from '@/components/layout/site-end'
import { About } from '@/components/sections/about'
import { Hero } from '@/components/sections/hero'
import { Method } from '@/components/sections/method'
import { Project } from '@/components/sections/project'
import { Situations } from '@/components/sections/situations'
import { Solutions } from '@/components/sections/solutions'
import { homeJsonLd } from '@/lib/json-ld'

export default function Home() {
	return (
		<>
			<script
				type='application/ld+json'
				dangerouslySetInnerHTML={{
					__html: JSON.stringify(homeJsonLd).replace(/</g, '\\u003c'),
				}}
			/>
			<main>
				<Hero />
				<Situations />
				<Solutions />
				<Method />
				<Project />
				<About />
			</main>
			<SiteEnd />
		</>
	)
}

import { SiteEnd } from '@/components/layout/site-end'
import { About } from '@/components/sections/about'
import { Hero } from '@/components/sections/hero'
import { Method } from '@/components/sections/method'
import { Project } from '@/components/sections/project'
import { Solutions } from '@/components/sections/solutions'

export default function Home() {
	return (
		<>
			<main>
				<Hero />
				<Solutions />
				<Method />
				<Project />
				<About />
			</main>
			<SiteEnd />
		</>
	)
}

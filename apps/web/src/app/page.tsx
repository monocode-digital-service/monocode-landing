import { SiteFooter } from '@/components/layout/site-footer'
import { About } from '@/components/sections/about'
import { Closing } from '@/components/sections/closing'
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
				<Closing />
			</main>
			<SiteFooter />
		</>
	)
}

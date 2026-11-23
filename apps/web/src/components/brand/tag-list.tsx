import { Badge } from '@monocode-landing/ui/components/badge'

// Etiquetas de uma peça de Soluções: todas no mesmo tom (o verde claro da marca)
export function TagList({ tags }: { tags: readonly string[] }) {
	return (
		<ul className='flex flex-wrap gap-1.5' data-reveal='up'>
			{tags.map(tag => (
				<li key={tag}>
					<Badge className='h-auto rounded-[6px] bg-tag px-2.5 py-1.5 font-mono font-normal text-[11px] text-ink uppercase tracking-[0.06em]'>
						{tag}
					</Badge>
				</li>
			))}
		</ul>
	)
}

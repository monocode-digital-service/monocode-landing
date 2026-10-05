// Portfólio: cada projeto vira um case na seção Projetos. O primeiro abre por padrão.
export type ProjectMedia =
	| { kind: 'flow'; caption: string }
	| { kind: 'image'; src: string; alt: string; caption: string }
	| { kind: 'video'; src: string; poster?: string; caption: string }

export type Project = {
	slug: string
	name: string
	type: 'case' | 'ferramenta'
	year: number
	client: string
	title: string
	facts: readonly { label: string; value: string }[]
	body: string
	media: readonly ProjectMedia[]
}

export const projects: readonly Project[] = [
	{
		slug: 'movvai',
		name: 'Movvai',
		type: 'case',
		year: 2026,
		client: 'Inctech',
		title:
			'A Monocode construiu uma agência de marketing operada por agentes de IA.',
		facts: [
			{ label: 'Cliente', value: 'Inctech' },
			{ label: 'Produto', value: 'Movvai' },
			{ label: 'Tipo', value: 'SaaS multiempresa' },
		],
		body: 'Seis agentes, cada um com um papel (atendimento, estratégia, pesquisa, redação, revisão e marca), produzem conteúdo a partir da base de conhecimento da própria marca. Toda peça mostra de qual documento saiu, recebe nota de qualidade e só é publicada depois que uma pessoa aprova.',
		// TODO: vídeo e imagens do Movvai
		media: [{ kind: 'flow', caption: 'uma demanda no movvai · fluxo real' }],
	},
]

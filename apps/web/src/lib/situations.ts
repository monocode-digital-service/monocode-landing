// Seção "O que muda quando a IA entra": as duas frentes da Monocode e, em cada uma,
// situações comuns com os passos do que passa a acontecer. A primeira frente abre por padrão.
// "agente" (lê o contexto e decide) e "automação" (roda na regra que o time definiu) nunca se misturam.
export type Actor =
	| 'cliente'
	| 'time'
	| 'agente'
	| 'automação'
	| 'integração'
	| 'aplicação'
	| 'pessoa'

export type Situation = {
	area: string
	situation: string
	steps: readonly (readonly [Actor, string])[]
	tags: readonly string[]
	/** Projeto do site que mostra a situação na prática */
	project?: { href: string; label: string }
}

export type Front = {
	id: 'operations' | 'growth'
	name: string
	line: string
	body: string
	situations: readonly Situation[]
}

export const fronts: readonly Front[] = [
	{
		id: 'operations',
		name: 'Monocode Operations',
		line: 'Eficiência e execução de processos',
		body: 'Cuidamos dos processos que tomam o tempo do seu time, com agentes de IA, automações, integrações entre sistemas e aplicações sob medida.',
		situations: [
			{
				area: 'Atendimento',
				situation:
					'Todo dia chegam as mesmas perguntas, e cada pessoa responde de um jeito.',
				steps: [
					['cliente', 'Envia a dúvida pelo WhatsApp.'],
					['agente', 'Responde com base nos documentos da empresa.'],
					['agente', 'Passa ao time o que foge do padrão.'],
					['pessoa', 'Assume o caso com o histórico em mãos.'],
				],
				tags: ['agente', 'whatsapp', 'documentos'],
			},
			{
				area: 'Backoffice',
				situation: 'O mesmo dado é digitado no CRM, no ERP e na planilha.',
				steps: [
					['time', 'Registra a venda uma vez, no CRM.'],
					['integração', 'Leva o dado para o ERP e a planilha.'],
					['automação', 'Confere os campos e avisa quando algo diverge.'],
					['pessoa', 'Decide o que fazer com as exceções.'],
				],
				tags: ['integração', 'automação', 'erp'],
			},
			{
				area: 'Conteúdo',
				situation:
					'O conteúdo sai quando sobra tempo, e cada peça começa do zero.',
				steps: [
					['time', 'Define os temas e os documentos de referência.'],
					['agente', 'Escreve a peça e indica o documento de origem.'],
					['agente', 'Avalia o texto pelas regras da marca.'],
					['pessoa', 'Aprova cada peça antes da publicação.'],
				],
				tags: ['agente', 'marca', 'aprovação'],
				project: { href: '/#projeto', label: 'Ver o projeto Movvai' },
			},
			{
				area: 'Conhecimento',
				situation:
					'A resposta sobre contrato, estoque ou política está na cabeça de duas pessoas.',
				steps: [
					['time', 'Pergunta do jeito que fala, no chat interno.'],
					['agente', 'Busca nos contratos, planilhas e políticas da empresa.'],
					['agente', 'Responde e mostra o documento de onde tirou.'],
					['pessoa', 'Confirma a resposta nos casos sensíveis.'],
				],
				tags: ['agente', 'documentos', 'chat interno'],
			},
			{
				area: 'Sob medida',
				situation:
					'O processo vive em planilhas porque nenhuma ferramenta pronta serve.',
				steps: [
					['aplicação', 'Reúne o processo inteiro em um só lugar.'],
					['integração', 'Traz os dados dos sistemas que já existem.'],
					['agente', 'Aponta o que precisa de atenção primeiro.'],
					['pessoa', 'Decide com tudo à vista.'],
				],
				tags: ['aplicação', 'integração', 'sob medida'],
			},
		],
	},
	{
		id: 'growth',
		name: 'Monocode Growth',
		line: 'Crescimento comercial com inteligência de mercado',
		body: 'Pesquisamos o mercado, mapeamos empresas com o perfil do seu cliente e estruturamos a prospecção B2B. Agentes qualificam cada contato antes de ele chegar ao seu time comercial.',
		situations: [
			{
				area: 'Prospecção',
				situation:
					'A prospecção para toda vez que o time está ocupado fechando.',
				steps: [
					['agente', 'Pesquisa empresas com o perfil do seu cliente.'],
					['pessoa', 'Aprova a abordagem antes do primeiro contato.'],
					['agente', 'Inicia a conversa e qualifica o interesse.'],
					['time', 'Recebe o contato com o histórico da conversa.'],
				],
				tags: ['agente sdr', 'prospecção b2b', 'qualificação'],
			},
			{
				area: 'Contato',
				situation:
					'O contato chega e espera. O retorno depende da memória de alguém.',
				steps: [
					['integração', 'Leva o contato do site direto para o CRM.'],
					['agente', 'Lê o pedido e prepara a resposta.'],
					['automação', 'Agenda o retorno na data que o time definiu.'],
					['pessoa', 'Aprova a resposta e conduz a conversa.'],
				],
				tags: ['agente', 'automação', 'crm'],
			},
			{
				area: 'Mercado',
				situation:
					'Ninguém tem tempo de pesquisar o mercado empresa por empresa.',
				steps: [
					['agente', 'Mapeia empresas do setor e da região que você definiu.'],
					['agente', 'Levanta o que cada uma faz e quem decide.'],
					['automação', 'Mantém a lista atualizada no CRM.'],
					['pessoa', 'Escolhe por onde começar.'],
				],
				tags: ['inteligência de mercado', 'pesquisa', 'crm'],
			},
		],
	},
]

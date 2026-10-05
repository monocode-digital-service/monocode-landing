import type { Metadata } from 'next'
import Link from 'next/link'

import { LegalPage } from '@/components/layout/legal-page'
import { site } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Termos de uso',
	description:
		'Condições de uso do site da Monocode: conteúdo, propriedade intelectual e responsabilidades.',
	alternates: { canonical: '/termos-de-uso' },
}

export default function TermosDeUso() {
	return (
		<LegalPage title='Termos de uso' updated='5 de outubro de 2026'>
			<p>
				Estes termos valem para o uso do site monocode.com.br, mantido pela{' '}
				{site.legalName}, CNPJ {site.cnpj}, com sede em São Paulo, SP. Ao
				navegar no site, você concorda com eles.
			</p>

			<h2>1. O que é este site</h2>
			<p>
				O site apresenta a Monocode e os tipos de solução que ela constrói. O
				conteúdo é informativo. Nada aqui é proposta comercial, oferta ou
				promessa de prazo ou de resultado. Escopo, investimento, cronograma e
				demais condições de um projeto existem apenas em proposta e contrato por
				escrito.
			</p>

			<h2>2. Uso permitido</h2>
			<p>
				Você pode navegar no site e compartilhar os links livremente. Não é
				permitido tentar interferir no funcionamento do site, acessar áreas ou
				sistemas sem autorização, nem usar o conteúdo para se passar pela
				Monocode.
			</p>

			<h2>3. Propriedade intelectual</h2>
			<p>
				A marca Monocode, os textos, as ilustrações, as animações e o código
				deste site pertencem à Monocode ou são usados com licença. A reprodução
				para fins comerciais depende de autorização por escrito. Marcas de
				terceiros citadas no site pertencem aos seus titulares e aparecem apenas
				como referência de trabalhos e de experiência profissional.
			</p>

			<h2>4. Links e serviços de terceiros</h2>
			<p>
				O site tem links para serviços de terceiros, como WhatsApp e LinkedIn.
				Esses serviços têm termos e políticas próprios, e a Monocode não
				responde pelo conteúdo ou pelo funcionamento deles.
			</p>

			<h2>5. Disponibilidade e responsabilidade</h2>
			<p>
				A Monocode trabalha para manter o site disponível e as informações
				corretas e atualizadas, mas o site pode ficar fora do ar ou conter
				imprecisões. Decisões de negócio não devem se basear só no conteúdo
				desta página: converse com a Monocode sobre o seu caso.
			</p>

			<h2>6. Privacidade</h2>
			<p>
				O tratamento de dados pessoais está descrito na{' '}
				<Link href='/politica-de-privacidade'>Política de privacidade</Link>.
			</p>

			<h2>7. Alterações</h2>
			<p>
				Estes termos podem ser atualizados. A data da última atualização fica no
				topo da página.
			</p>

			<h2>8. Lei aplicável e foro</h2>
			<p>
				Estes termos seguem a lei brasileira. Fica eleito o foro da Comarca de
				São Paulo, SP, salvo disposição legal em contrário.
			</p>

			<h2>9. Contato</h2>
			<p>
				Dúvidas sobre estes termos:{' '}
				<a href={`mailto:${site.email}`}>{site.email}</a>.
			</p>
		</LegalPage>
	)
}

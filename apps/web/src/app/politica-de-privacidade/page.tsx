import type { Metadata } from 'next'

import { LegalPage } from '@/components/layout/legal-page'
import { site } from '@/lib/site'

export const metadata: Metadata = {
	title: 'Política de privacidade',
	description:
		'Como a Monocode trata os dados pessoais de quem visita o site e entra em contato, conforme a LGPD.',
	alternates: { canonical: '/politica-de-privacidade' },
}

const mail = <a href={`mailto:${site.email}`}>{site.email}</a>

export default function PoliticaDePrivacidade() {
	return (
		<LegalPage title='Política de privacidade' updated='5 de outubro de 2026'>
			<p>
				Esta política explica quais dados pessoais a Monocode trata quando você
				visita este site ou entra em contato, para que eles são usados e quais
				são os seus direitos, de acordo com a Lei Geral de Proteção de Dados
				(Lei 13.709/2018, a LGPD).
			</p>

			<h2>1. Quem é o responsável</h2>
			<p>
				O controlador dos dados é a {site.legalName}, CNPJ {site.cnpj}, com sede
				em São Paulo, SP. Para qualquer assunto sobre privacidade e dados
				pessoais, o canal é {mail}.
			</p>

			<h2>2. Quais dados são tratados</h2>
			<ul>
				<li>
					Dados de navegação: endereço IP, tipo de navegador e de dispositivo,
					páginas acessadas, data e hora. São registrados automaticamente pelos
					provedores que hospedam e protegem o site.
				</li>
				<li>
					Dados de contato: quando você escreve pelo WhatsApp ou por e-mail, a
					Monocode recebe o que você informar, como nome, telefone, e-mail,
					empresa, cargo e a descrição do seu caso.
				</li>
			</ul>
			<p>
				O site não tem cadastro nem formulário e não pede dados sensíveis. Evite
				enviar dados pessoais de terceiros ou informações confidenciais na
				primeira conversa.
			</p>

			<h2>3. Para que os dados são usados</h2>
			<ul>
				<li>
					Responder ao seu contato, entender o seu caso e preparar uma proposta
					(procedimentos preliminares a um contrato, a seu pedido).
				</li>
				<li>
					Manter o site funcionando com segurança e prevenir abuso (legítimo
					interesse).
				</li>
				<li>Cumprir obrigações legais e regulatórias.</li>
			</ul>
			<p>
				A Monocode não vende dados pessoais e não os usa para publicidade de
				terceiros.
			</p>

			<h2>4. Atendimento com agente de IA</h2>
			<p>
				O primeiro atendimento no WhatsApp pode ser feito por um agente de IA,
				que se identifica como tal no início da conversa. Ele organiza as
				informações do seu caso para a análise de uma pessoa da Monocode. Você
				pode pedir para falar com uma pessoa a qualquer momento.
			</p>

			<h2>5. Com quem os dados são compartilhados</h2>
			<p>
				Os dados são compartilhados apenas com fornecedores que prestam serviço
				à Monocode e só na medida necessária: hospedagem e entrega do site,
				WhatsApp, e-mail, ferramentas de gestão de atendimento e provedores de
				IA que processam a conversa quando o agente atua. Alguns desses
				fornecedores processam dados fora do Brasil. Nesses casos, a
				transferência segue as regras da LGPD para transferência internacional.
			</p>

			<h2>6. Cookies</h2>
			<p>
				Este site não usa cookies de publicidade nem de rastreamento. Os
				provedores de infraestrutura podem usar cookies estritamente necessários
				para segurança e funcionamento.
			</p>

			<h2>7. Por quanto tempo os dados ficam guardados</h2>
			<p>
				Os dados de contato ficam guardados enquanto durar a conversa ou a
				relação comercial e, depois disso, pelo período necessário para cumprir
				obrigações legais ou exercer direitos. Você pode pedir a exclusão a
				qualquer momento, e ela será feita sempre que não houver obrigação de
				guarda.
			</p>

			<h2>8. Seus direitos</h2>
			<p>A LGPD garante a você, entre outros, o direito de:</p>
			<ul>
				<li>confirmar se a Monocode trata os seus dados e acessá-los;</li>
				<li>corrigir dados incompletos, inexatos ou desatualizados;</li>
				<li>
					pedir a anonimização, o bloqueio ou a eliminação de dados
					desnecessários ou tratados em desacordo com a lei;
				</li>
				<li>pedir a portabilidade;</li>
				<li>saber com quem os dados foram compartilhados;</li>
				<li>revogar o consentimento, quando o tratamento se basear nele.</li>
			</ul>
			<p>
				Para exercer qualquer um deles, escreva para {mail}. Você também pode
				apresentar reclamação à Autoridade Nacional de Proteção de Dados (ANPD).
			</p>

			<h2>9. Segurança</h2>
			<p>
				A Monocode adota medidas técnicas e organizacionais para proteger os
				dados contra acesso não autorizado, perda ou alteração, como controle de
				acesso e conexões criptografadas.
			</p>

			<h2>10. Alterações nesta política</h2>
			<p>
				Esta política pode ser atualizada. A data da última atualização fica no
				topo da página.
			</p>
		</LegalPage>
	)
}

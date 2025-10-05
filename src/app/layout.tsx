import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Monocode',
  description:
    'Criamos aplicações inteligentes com IA e automação para transformar processos, impulsionar resultados e levar inovação ao seu negócio.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  )
}

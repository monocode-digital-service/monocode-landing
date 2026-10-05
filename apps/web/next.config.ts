import { varlockNextConfigPlugin } from '@varlock/nextjs-integration/plugin'

const withVarlock = varlockNextConfigPlugin()

import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	typedRoutes: true,
	reactCompiler: true,
	devIndicators: false,
	// o otimizador /_next/image responde 404 no deploy por services da Vercel; as imagens já entram em WebP no tamanho final
	images: { unoptimized: true },
}

export default withVarlock(nextConfig)

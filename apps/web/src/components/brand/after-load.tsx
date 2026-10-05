'use client'

import { cn } from '@monocode-landing/ui/lib/utils'
import { useEffect, useState } from 'react'

/**
 * Renderiza os filhos só depois do carregamento da página e de um respiro da thread principal,
 * com fade-in. Para fundos animados pesados não disputarem CPU com o primeiro conteúdo.
 */
export function AfterLoad({
	className,
	children,
}: {
	className?: string
	children: React.ReactNode
}) {
	const [ready, setReady] = useState(false)
	const [shown, setShown] = useState(false)

	useEffect(() => {
		let idle = 0
		const start = () => {
			idle = window.requestIdleCallback
				? window.requestIdleCallback(() => setReady(true), { timeout: 2000 })
				: window.setTimeout(() => setReady(true), 200)
		}
		if (document.readyState === 'complete') start()
		else window.addEventListener('load', start, { once: true })
		return () => {
			window.removeEventListener('load', start)
			window.cancelIdleCallback?.(idle)
			clearTimeout(idle)
		}
	}, [])

	useEffect(() => {
		if (!ready) return
		const frame = requestAnimationFrame(() => setShown(true))
		return () => cancelAnimationFrame(frame)
	}, [ready])

	return (
		<div
			className={cn(
				'transition-opacity duration-1000 motion-reduce:transition-none',
				shown ? 'opacity-100' : 'opacity-0',
				className
			)}
		>
			{ready && children}
		</div>
	)
}

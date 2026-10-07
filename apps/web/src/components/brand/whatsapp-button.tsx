import { Button } from '@monocode-landing/ui/components/button'
import { cn } from '@monocode-landing/ui/lib/utils'

import { site } from '@/lib/site'

export function WhatsAppButton({
	children = 'Falar no WhatsApp',
	size = 'pill-lg',
	className,
}: {
	children?: React.ReactNode
	size?: 'pill' | 'pill-lg'
	className?: string
}) {
	return (
		<Button
			nativeButton={false}
			render={
				<a href={site.whatsappUrl} target='_blank' rel='noopener noreferrer' />
			}
			size={size}
			className={cn('transition-transform hover:scale-[1.03]', className)}
		>
			{children}
		</Button>
	)
}

import { Button } from '@monocode-landing/ui/components/button'

import { site } from '@/lib/site'

export function WhatsAppButton({
	children = 'Chamar no WhatsApp',
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
			className={className}
		>
			{children}
		</Button>
	)
}

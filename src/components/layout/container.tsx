import { cn } from '@/lib/utils'
import { ElementType, ReactNode } from 'react'

interface ContainerProps {
    className?: string
    children: ReactNode
    as?: ElementType
}

export function Container(props: ContainerProps) {
    const { className, children, as: Component = 'div' } = props
    return (
        <Component
            className={cn(
                'mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            {children}
        </Component>
    )
}

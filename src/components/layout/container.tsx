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
        <Component className={cn('page-container', className)}>
            {children}
        </Component>
    )
}

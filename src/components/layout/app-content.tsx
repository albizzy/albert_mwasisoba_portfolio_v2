import { ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { AppCommandBar } from '@/components/layout/app-command-bar'

export function AppContent({
    children,
    className,
    containerClassName,
}: {
    children: ReactNode
    className?: string
    containerClassName?: string
}) {
    return (
        <div
            className={cn(
                'w-full grow min-h-[calc(100dvh-96px)] overflow-x-hidden overflow-y-auto [scrollbar-gutter:stable]',
                containerClassName
            )}
        >
            <main className={cn('w-full flex min-h-full flex-col', className)}>
                <AppContent.commandBar />
                {children}
            </main>
        </div>
    )
}

AppContent.commandBar = AppCommandBar

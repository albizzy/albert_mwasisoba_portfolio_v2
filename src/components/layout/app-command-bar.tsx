import { ReactNode } from 'react'
import { AppBreadcrumbs } from '@/components/layout/app-breadcrumbs'

export function AppCommandBar({ children }: { children?: ReactNode }) {
    return (
        <div
            className={
                'w-full h-fit bg-transparent flex grow flex-row items-center justify-center'
            }
        >
            <AppBreadcrumbs />
            {children}
        </div>
    )
}

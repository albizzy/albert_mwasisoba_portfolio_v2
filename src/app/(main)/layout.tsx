import { ReactNode } from 'react'
import { AppFooter, AppHeader } from '@/components/layout'

export default function MainLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-dvh flex-col">
            <AppHeader />
            <main className={'flex-1 mt-24'}>{children}</main>
            <AppFooter />
        </div>
    )
}

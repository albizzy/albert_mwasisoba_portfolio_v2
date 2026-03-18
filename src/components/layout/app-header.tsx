import { mainNavigation } from '@/config'
import { NavItem } from '@/components/layout/nav-item'
import { AppLogo } from '@/components/layout/app-logo'

export function AppHeader() {
    return (
        <header
            className={
                'w-full h-16 flex flex-row items-center bg-background/20 backdrop-blur-md fixed top-0 left-0 z-50'
            }
        >
            <div
                className={
                    'w-full max-w-7xl mx-auto flex flex-row justify-between items-center px-6 md:px-0'
                }
            >
                <AppLogo />
                <nav className={'w-fit flex flex-row gap-6'}>
                    {mainNavigation &&
                        mainNavigation.map((navigationItem, index) => (
                            <NavItem key={index} href={navigationItem.href}>
                                {navigationItem.labelKey}
                            </NavItem>
                        ))}
                </nav>
            </div>
        </header>
    )
}

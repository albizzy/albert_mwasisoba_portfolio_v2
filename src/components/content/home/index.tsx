import { AppContent } from '@/components/layout'
import { HeroSection } from './hero-section'
import { ProblemsSection } from './problems-section'
import { HowIWorkSection } from './how-i-work-section'
import { SelectedWorkSection } from './selected-work-section'
import { WhoIWorkWithSection } from './who-i-work-with-section'
import { CtaSection } from './cta-section'

export const HomeContent = () => {
    return (
        <AppContent>
            <div className="flex flex-col w-full h-full relative">
                <HeroSection />
                <ProblemsSection />
                <HowIWorkSection />
                <SelectedWorkSection />
                <WhoIWorkWithSection />
                <CtaSection />
            </div>
        </AppContent>
    )
}

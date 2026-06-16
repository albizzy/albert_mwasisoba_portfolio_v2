import { AppContent } from '@/components/layout'
import { HeroSection } from './hero-section'
import { Overview } from '@/components/content/home/overview'
import { ExpertiseOverview } from '@/components/content/home/expertise-overview'
import { WorkOverview } from '@/components/content/home/work-overview'

export const HomeContent = () => {
    return (
        <AppContent>
            <div className="flex flex-col w-full h-full relative">
                <HeroSection />
                <Overview />
                <WorkOverview />
                <ExpertiseOverview />
            </div>
        </AppContent>
    )
}

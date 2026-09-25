import { AppContent } from '@/components/layout'
import { HeroSection } from './hero-section'
import { Overview } from '@/components/content/home/overview'
import { WorkOverview } from '@/components/content/home/work-overview'
import { BannerSection } from '@/components/content/home/banner-section'

export const HomeContent = () => {
    return (
        <AppContent containerClassName="overflow-x-clip overflow-y-visible [scrollbar-gutter:auto]">
            <div className="flex flex-col w-full h-full relative">
                <HeroSection />
                <BannerSection />
                <Overview />
                <WorkOverview />
                {/*<ExpertiseOverview />*/}
            </div>
        </AppContent>
    )
}

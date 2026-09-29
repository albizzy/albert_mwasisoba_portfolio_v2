import { StaticImageData } from 'next/image'
import SyncwhiteVisual from '@/assets/images/works/syncwhite_visual.png'
import KiraVisual from '@/assets/images/works/kira_visual.png'
import AutobimaVisual from '@/assets/images/works/autobima_visual.png'
import SweetDoctorVisual from '@/assets/images/works/sweet_doctor_visual.png'

export interface WorkItem {
    title: string
    types: string[]
    services: string[]
    description: string
    link: string
    image: StaticImageData
    imageAlt: string
    imageWidth: number
    imageHeight: number
    imageBlurDataURL?: string
    imagePlaceholder?: 'blur' | 'empty'
    imagePriority?: boolean
    imageClassName?: string
}

export const works: WorkItem[] = [
    {
        title: 'Sweet Doctor',
        types: ['UI Direction', 'Design Systems'],
        services: [
            'Next.js',
            'Tailwind CSS',
            'Design Systems',
            'Rive Animation',
            'UI/UX',
        ],
        description:
            'Worked alongside product engineers to oversee the visual design and UI direction for a matchmaking platform. Shaped the design system, defined interaction patterns, and guided multi-step onboarding flows to keep the user experience intuitive.',
        link: 'https://sweet.doctor',
        image: SweetDoctorVisual,
        imageAlt: 'Sweet Doctor matchmaking platform user interface',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
        imagePriority: true,
        imageClassName: '',
    },
    {
        title: 'Autobima',
        types: ['Frontend Engineering', 'B2B SaaS'],
        services: ['React', 'Inertia.js', 'Tailwind CSS', 'GSAP', 'Laravel'],
        description:
            'Collaborating with backend engineers on an automotive insurance and claims platform. Leading the public web presence and helping bridge the frontend with Laravel and Inertia.js to simplify data-heavy garage and claim workflows.',
        link: 'https://autobima.co.tz/',
        image: AutobimaVisual,
        imageAlt: 'Autobima insurance and repair claims management portal',
        imageWidth: 1600,
        imageHeight: 900,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Kira',
        types: ['Design Direction', 'E-Commerce'],
        services: [
            'Next.js',
            'Tailwind CSS',
            'UI/UX',
            'Responsive Layouts',
            'Performance',
        ],
        description:
            'Steered the overall design approach and collaborated on the storefront experience for an organic skincare brand. Focused on mobile-first product flows, responsive layouts, and clean typography that feels effortless to browse.',
        link: 'https://www.kira.co.tz/en',
        image: KiraVisual,
        imageAlt: 'Kira natural skincare responsive e-commerce storefront',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Syncwhite',
        types: ['Frontend Engineering', 'Co-Founder'],
        services: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'GSAP / Motion',
            'Component Systems',
        ],
        description:
            'Co-founded a digital agency with fellow engineers and built our primary web presence. Created smooth scroll interactions with GSAP, established our shared UI component system, and ensured accessibility standards across every page.',
        link: 'https://syncwhite.com',
        image: SyncwhiteVisual,
        imageAlt: 'Syncwhite digital engineering agency interface showcase',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
]

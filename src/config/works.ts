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
    previewMode?: 'live' | 'image'
    previewUrl?: string
    previewScale?: number
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
        types: ['Frontend Engineering', 'UI/UX'],
        services: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'UI Architecture',
            'Design Systems',
        ],
        description:
            'Collaborated with product and backend engineers to build the client-facing web application. Spearheaded the UI/UX design system and implemented modular, accessible React components, real-time chat views, and multi-step onboarding journeys.',
        link: 'https://sweet.doctor',
        previewMode: 'image',
        image: SweetDoctorVisual,
        imageAlt: 'Sweet Doctor dating platform user interface',
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
        services: [
            'React',
            'TypeScript',
            'Tailwind CSS',
            'Complex Form State',
            'Design System',
        ],
        description:
            'Worked alongside backend teams to design and engineer data-dense claim processing portals connecting repair garages with insurers. Built dynamic job-card calculation interfaces, robust form validation states, and role-tailored dashboard views.',
        link: 'https://autobima.co.tz/',
        previewMode: 'image',
        image: AutobimaVisual,
        imageAlt: 'Autobima automotive claims platform interface',
        imageWidth: 1600,
        imageHeight: 900,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Kira',
        types: ['Frontend Engineering', 'E-Commerce'],
        services: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Responsive UI',
            'Web Performance',
        ],
        description:
            'Delivered the responsive storefront interface for a natural cosmetics brand. Partnered with stakeholders to craft high-conversion user journeys, interactive product variant selectors, and optimized client bundles achieving 95+ Core Web Vitals.',
        link: 'https://kira.co.tz',
        previewMode: 'image',
        image: KiraVisual,
        imageAlt: 'Kira cosmetics responsive web storefront',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Syncwhite',
        types: ['Frontend Engineering', 'Design System'],
        services: [
            'Next.js',
            'TypeScript',
            'Tailwind CSS',
            'Motion / GSAP',
            'Accessibility',
        ],
        description:
            'Engineered the core agency web presence and component showcase. Designed and developed fluid, scroll-driven interactions, semantic layouts adhering to WCAG AA accessibility standards, and clean, reusable UI modules.',
        link: 'https://syncwhite.com',
        previewMode: 'image',
        image: SyncwhiteVisual,
        imageAlt: 'Syncwhite digital agency interface showcase',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
]

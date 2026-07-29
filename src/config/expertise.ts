import { Blocks, Brush, Code, Compass, Handshake, Rocket } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

export interface ServicePillar {
    title: string
    description: string
    capabilities: ReadonlyArray<string>
    icon: LucideIcon
}

export interface ApproachStep {
    number: string
    title: string
    description: string
    icon: LucideIcon
}

export const servicePillars: ReadonlyArray<ServicePillar> = [
    {
        title: 'Software Architecture',
        description:
            'From system design to deployment, I architect scalable platforms that grow with your business.',
        capabilities: [
            'System Design',
            'API Architecture',
            'Cloud Infrastructure',
            'Database Modeling',
            'Performance Optimization',
            'CI/CD Pipelines',
        ],
        icon: Blocks,
    },
    {
        title: 'Design & Branding',
        description:
            'I create cohesive brands and product interfaces that capture who you are and connect with your audience.',
        capabilities: [
            'Brand Identity',
            'Logo Design',
            'UX/UI Design',
            'Design Systems',
            'Visual Language',
            'Motion Design',
        ],
        icon: Brush,
    },
    {
        title: 'Web Development',
        description:
            'I build fast, responsive, and accessible websites that elevate your digital presence and drive growth.',
        capabilities: [
            'Next.js / React',
            'Responsive Design',
            'SEO Optimization',
            'E-commerce',
            'CMS Integration',
            'Web Performance',
        ],
        icon: Code,
    },
]

export const approachSteps: ReadonlyArray<ApproachStep> = [
    {
        number: '01',
        title: 'Discover',
        description:
            'Every project starts with understanding your business, your users, and your goals. I listen before I build.',
        icon: Compass,
    },
    {
        number: '02',
        title: 'Design & Build',
        description:
            'I work iteratively, sharing progress early and often through steady, transparent collaboration.',
        icon: Handshake,
    },
    {
        number: '03',
        title: 'Deliver & Support',
        description:
            'Launch is just the beginning. I ensure smooth handoffs and remain available for iteration and growth.',
        icon: Rocket,
    },
]

export const technologies: ReadonlyArray<string> = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'PostgreSQL',
    'Figma',
    'Tailwind CSS',
    'Docker',
    'AWS',
    'Git',
    'GraphQL',
    'GSAP',
]

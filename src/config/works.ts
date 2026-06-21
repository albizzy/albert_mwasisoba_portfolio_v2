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
        types: ['Web', 'App'],
        services: ['Logo', 'Brand', 'Website'],
        description:
            'Sweet doctor is a dating platform connecting people with their perfect match.',
        link: 'https://sweet.doctor',
        image: SweetDoctorVisual,
        imageAlt: 'Sweet Doctor',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
        imagePriority: true,
        imageClassName: '',
    },
    {
        title: 'Syncwhite',
        types: ['Web'],
        services: ['Logo', 'Brand'],
        description:
            'Syncwhite is a software company based in Dar es Salaam, Tanzania. Building serious solutions since 2021',
        link: 'https://syncwhite.com',
        image: SyncwhiteVisual,
        imageAlt: 'Syncwhite',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Kira',
        types: ['Web'],
        services: ['Logo', 'Brand', 'Product'],
        description:
            'Kira is a cosmetics company based Dar es Salaam. They create high quality, natural hair products.',
        link: 'https://kira.co.tz',
        image: KiraVisual,
        imageAlt: 'Kira',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
    {
        title: 'Autobima',
        types: ['Web', 'App'],
        services: ['Logo', 'Brand', 'Website'],
        description:
            'Autobima is a automotive company based in Dar es Salaam, Tanzania. Dealing with providing efficient and convenient claim settlement from the Garages to the Financiers',
        link: 'https://autobima.co.tz',
        image: AutobimaVisual,
        imageAlt: 'Autobima',
        imageWidth: 1000,
        imageHeight: 1000,
        imageBlurDataURL: '',
        imagePlaceholder: 'blur',
    },
]

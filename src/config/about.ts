export interface AboutDiscipline {
    title: string
    description: string
}

export interface WorkingPrinciple {
    number: string
    title: string
    description: string
}

export const aboutDisciplines: ReadonlyArray<AboutDiscipline> = [
    {
        title: 'Software architecture',
        description:
            'Structuring dependable systems, interfaces, and delivery paths around the real needs of a product.',
    },
    {
        title: 'Interface strategy',
        description:
            'Turning complex workflows into clear, accessible experiences that feel considered at every size.',
    },
    {
        title: 'Visual design',
        description:
            'Building cohesive identities and visual systems that help digital products communicate with confidence.',
    },
    {
        title: 'Open source',
        description:
            'Sharing useful ideas and reusable building blocks while learning through practical collaboration.',
    },
]

export const workingPrinciples: ReadonlyArray<WorkingPrinciple> = [
    {
        number: '01',
        title: 'Start with context',
        description:
            'Understand the people, constraints, and business goal before deciding what the solution should be.',
    },
    {
        number: '02',
        title: 'Make the complex clear',
        description:
            'Use systems thinking and careful design to reduce friction without hiding important detail.',
    },
    {
        number: '03',
        title: 'Build in the open',
        description:
            'Share progress early, invite useful feedback, and keep decisions visible throughout the work.',
    },
]

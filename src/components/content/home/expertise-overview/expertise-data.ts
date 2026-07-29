import {
    Check,
    CheckCheck,
    CircleDashedIcon,
    Clipboard,
    Ellipsis,
    Wallet,
} from 'lucide-react'

const problemVsSolution = [
    {
        problem: 'Our product needs to be more intuitive',
        solutions: [
            'I suggest to start with an UX audit to identify opportunities where I could improve your product',
            'From there, I can translate these insights into a functional and easy-to-use product',
        ],
    },
    {
        problem: 'We need a consistent look and feel across our products',
        solutions: [
            'I can create a design system to ensure visual and functional consistency',
            'This helps strengthen your brand and improve usability across platforms',
        ],
    },
    {
        problem: 'Our product needs a new UX/UI design',
        solutions: [
            'I can redesign your product to make it intuitive and easy to use, prioritizing user needs and business goals',
            'It would not only look great but create an enjoyable experience for your users',
        ],
    },
    {
        problem: 'Our brand needs to reflect who we are',
        solutions: [
            'I create cohesive and flexible brand identities that capture the essence of your business',
            'This helps you connect with your audience and create a strong, recognizable presence',
        ],
    },
    {
        problem: 'We need compelling visuals to bring our brand to life',
        solutions: [
            'I specialize in designing engaging visuals that take your brand to the next level',
            'This could include marketing materials and social content, static or animated, tailored to your goals',
        ],
    },
    {
        problem: 'We need a new website',
        solutions: [
            'I design websites that truly resonate with your audience and seamlessly represent your brand',
            'Each website we craft is designed to elevate your digital presence and drive meaningful business growth',
        ],
    },
]

const completionSteps = [
    {
        icon: CircleDashedIcon,
        title: 'Open',
        background: 'bg-indigo-100',
    },
    {
        icon: Ellipsis,
        title: 'In progress',
        background: 'bg-blue-100',
    },
    {
        icon: Check,
        title: 'Solved',
        background: 'bg-green-100',
    },
    {
        icon: Clipboard,
        title: 'In quotation',
        background: 'bg-yellow-100',
    },
    {
        icon: Wallet,
        title: 'Invoiced',
        background: 'bg-orange-100',
    },
    {
        icon: CheckCheck,
        title: 'Closed',
        background: 'bg-teal-100',
    },
]

export const expertiseData = {
    problemVsSolution,
    completionSteps,
}

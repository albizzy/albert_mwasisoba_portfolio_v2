import { Caveat } from 'next/font/google'

// The handwritten accent face, defined once and shared by every component that
// uses it. (Unbounded lives in the root layout, its only consumer.)
export const caveat = Caveat({
    subsets: ['latin'],
    variable: '--font-caveat',
    display: 'swap',
})

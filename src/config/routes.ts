/**
 * Internal destinations. Link to `routes.*` rather than string literals so a
 * path changes here instead of in every component that links to it.
 */
export const routes = {
    home: '/',
    about: '/about',
    featuredWork: '/#featured-work',
    works: '/works',
    expertise: '/expertise',
    contact: '/contact',
    contactReply: '/contact/reply',
    schedule: '/schedule',
} as const

export type AppRoute = (typeof routes)[keyof typeof routes]

export const normalizePathname = (p: string) =>
    p === '/' ? '/' : p.replace(/\/$/, '')

export const isActive = (pathname: string, href: string) => {
    const p = normalizePathname(pathname)
    const h = normalizePathname(href)
    if (h === '/') return p === '/'
    return p === h || p.startsWith(h + '/')
}

export function formatSegment(segment: string): string {
    return segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (char) => char.toUpperCase())
}

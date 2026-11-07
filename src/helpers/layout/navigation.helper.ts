import { isActive, normalizePathname } from './pathname.helper'

export type NavigationCurrent = 'page' | 'location' | undefined

export interface NavigationLocation {
    pathname: string
    hash: string
}

export function splitHref(href: string) {
    const index = href.indexOf('#')
    return index === -1
        ? { path: href, hash: '' }
        : { path: href.slice(0, index), hash: href.slice(index) }
}

const isSamePage = (path: string, pathname: string) =>
    !path || normalizePathname(path) === normalizePathname(pathname)

/**
 * Resolves `aria-current` for any navigation link. Section links (`/#id`)
 * mark the current location on their page; page links mark the current page
 * unless one of `links` targets the section currently in view.
 */
export function getNavigationCurrent(
    href: string,
    location: NavigationLocation,
    links: ReadonlyArray<{ href: string }> = []
): NavigationCurrent {
    const target = splitHref(href)

    if (target.hash) {
        return isSamePage(target.path, location.pathname) &&
            location.hash === target.hash
            ? 'location'
            : undefined
    }

    if (!isActive(location.pathname, target.path)) return undefined

    const sectionIsCurrent = links.some((link) => {
        const section = splitHref(link.href)
        return (
            section.hash !== '' &&
            section.hash === location.hash &&
            isSamePage(section.path, location.pathname)
        )
    })

    return sectionIsCurrent ? undefined : 'page'
}

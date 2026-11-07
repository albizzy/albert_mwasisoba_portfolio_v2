import { test } from 'node:test'
import assert from 'node:assert/strict'
import { cycle } from '../src/helpers/collection/cycle.helper'
import {
    getNavigationCurrent,
    splitHref,
} from '../src/helpers/layout/navigation.helper'
import { toSequenceLabel } from '../src/helpers/text/sequence.helper'
import { getRevealPresetVars } from '../src/hooks/gsap-reveal-presets'
import { createPageMetadata, withSiteName } from '../src/lib/metadata'
import { isEditorialTone } from '../src/lib/tones'
import {
    contactFields,
    emptyContactValues,
    validateContact,
} from '../src/features/contact/schema'

const links = [
    { href: '/' },
    { href: '/about' },
    { href: '/#featured-work' },
    { href: '/contact' },
]
const currentAt =
    (pathname: string, hash = '') =>
    (href: string) =>
        getNavigationCurrent(href, { pathname, hash }, links)

test('navigation marks the current page and section without per-link cases', () => {
    assert.equal(currentAt('/')('/'), 'page')
    assert.equal(currentAt('/')('/#featured-work'), undefined)
    assert.equal(currentAt('/', '#featured-work')('/'), undefined)
    assert.equal(
        currentAt('/', '#featured-work')('/#featured-work'),
        'location'
    )
    assert.equal(currentAt('/', '#case-studies')('/'), 'page')
    assert.equal(currentAt('/about/')('/about'), 'page')
    assert.equal(
        currentAt('/about', '#featured-work')('/#featured-work'),
        undefined
    )
    assert.deepEqual(splitHref('/#featured-work'), {
        path: '/',
        hash: '#featured-work',
    })
})

test('a new section link needs only a config entry', () => {
    const extended = [...links, { href: '/#case-studies' }]
    const location = { pathname: '/', hash: '#case-studies' }
    assert.equal(
        getNavigationCurrent('/#case-studies', location, extended),
        'location'
    )
    assert.equal(getNavigationCurrent('/', location, extended), undefined)
})

test('cycle and sequence helpers support any list length', () => {
    assert.equal(cycle(['a', 'b', 'c'], 4), 'b')
    assert.equal(cycle(['a', 'b'], -1), 'b')
    assert.equal(toSequenceLabel(0), '01')
    assert.equal(toSequenceLabel(9), '10')
    assert.equal(isEditorialTone('pink'), true)
    assert.equal(isEditorialTone('purple'), false)
})

test('page metadata adds canonical and Open Graph data only for routed pages', () => {
    assert.deepEqual(
        createPageMetadata({
            title: 'About',
            description: 'd',
            path: '/about',
        }),
        {
            title: 'About',
            description: 'd',
            alternates: { canonical: '/about' },
            openGraph: { title: 'About', description: 'd', url: '/about' },
        }
    )
    assert.deepEqual(
        createPageMetadata({
            title: withSiteName('Private'),
            robots: { index: false },
        }),
        { title: 'Private — Albert Mwasisoba', robots: { index: false } }
    )
})

test('reveal presets combine any effect with any direction profile', () => {
    assert.deepEqual(getRevealPresetVars('fade-up'), { autoAlpha: 0, y: 32 })
    assert.deepEqual(getRevealPresetVars('slide-center'), { scale: 0.96 })
    assert.deepEqual(getRevealPresetVars('clip-left'), {
        clipPath: 'inset(0 100% 0 0)',
    })
    assert.deepEqual(getRevealPresetVars('skew', 'right', -40), {
        x: -30,
        skewX: -7,
        transformOrigin: 'left center',
    })
})

test('contact field definitions drive validation and form state', () => {
    assert.deepEqual(
        contactFields.map(({ name }) => name),
        ['name', 'email', 'message']
    )
    assert.deepEqual(emptyContactValues, { name: '', email: '', message: '' })

    const form = new FormData()
    form.set('name', ' A Visitor ')
    form.set('email', ' Visitor@Example.COM ')
    form.set('message', 'short')
    const result = validateContact(form)
    assert.deepEqual(result.values, {
        name: 'A Visitor',
        email: 'visitor@example.com',
        message: 'short',
    })
    assert.deepEqual(result.errors, {
        message: 'Please write between 10 and 5,000 characters.',
    })
    assert.equal(result.valid, false)
})

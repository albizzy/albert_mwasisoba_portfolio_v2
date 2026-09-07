import 'server-only'
import { isEmail } from '../schema'

export function getPublicContactEmail() {
    const email = process.env.CONTACT_PUBLIC_EMAIL?.trim() || ''
    return isEmail(email) ? email : null
}

export function getEmailConfig() {
    const apiKey = process.env.RESEND_API_KEY?.trim()
    const from = process.env.CONTACT_FROM_EMAIL?.trim() || ''
    const to = process.env.CONTACT_TO_EMAIL?.trim() || ''
    const replySecret = process.env.CONTACT_REPLY_SECRET?.trim() || ''
    const url = new URL(process.env.APP_URL || 'https://invalid.local')
    const local =
        process.env.NODE_ENV !== 'production' &&
        ['localhost', '127.0.0.1'].includes(url.hostname)
    if (
        !apiKey ||
        !isEmail(from) ||
        !isEmail(to) ||
        !/^[a-f0-9]{64}$/i.test(replySecret) ||
        !process.env.APP_URL ||
        (!local && url.protocol !== 'https:') ||
        url.username ||
        url.password
    ) {
        throw new Error('Email configuration is incomplete.')
    }
    return {
        apiKey,
        from,
        to,
        replySecret,
        origin: url.origin,
        hostname: url.hostname,
    }
}

export function getContactAvailability() {
    const siteKey = process.env.TURNSTILE_SITE_KEY?.trim() || ''
    try {
        getEmailConfig()
        return {
            ready: Boolean(siteKey && process.env.TURNSTILE_SECRET_KEY),
            siteKey,
        }
    } catch {
        return { ready: false, siteKey: '' }
    }
}

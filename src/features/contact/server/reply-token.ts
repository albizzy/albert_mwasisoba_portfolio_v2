import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'
import { isEmail } from '../schema'

type ReplyClaims = {
    version: 1
    inquiryId: string
    name: string
    email: string
    expiresAt: number
}

function signature(payload: string, secret: string) {
    return createHmac('sha256', Buffer.from(secret, 'hex'))
        .update(`contact-reply:${payload}`)
        .digest('base64url')
}

// A recipient-bound capability, sent ONLY to the owner's inbox. The fragment
// keeps it out of HTTP access logs and referrers. It is signed, not encrypted.
export function createReplyToken(
    claims: Omit<ReplyClaims, 'version'>,
    secret: string
) {
    const payload = Buffer.from(
        JSON.stringify({ version: 1, ...claims })
    ).toString('base64url')
    return `${payload}.${signature(payload, secret)}`
}

export function verifyReplyToken(
    token: string,
    secret: string
): ReplyClaims | null {
    try {
        if (token.length > 2048) return null
        const parts = token.split('.')
        if (parts.length !== 2) return null
        const [payload, supplied] = parts
        const expected = Buffer.from(signature(payload, secret))
        const actual = Buffer.from(supplied)
        if (
            expected.length !== actual.length ||
            !timingSafeEqual(expected, actual)
        )
            return null
        const claims = JSON.parse(
            Buffer.from(payload, 'base64url').toString()
        ) as ReplyClaims
        if (
            claims.version !== 1 ||
            typeof claims.email !== 'string' ||
            !isEmail(claims.email) ||
            typeof claims.name !== 'string' ||
            !claims.name ||
            claims.name.length > 80 ||
            typeof claims.inquiryId !== 'string' ||
            !/^[a-f0-9-]{36}$/i.test(claims.inquiryId) ||
            !Number.isSafeInteger(claims.expiresAt) ||
            claims.expiresAt <= Date.now()
        )
            return null
        return claims
    } catch {
        return null
    }
}

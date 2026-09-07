import 'server-only'

export async function verifyTurnstile(
    token: FormDataEntryValue | null,
    hostname: string
) {
    const secret = process.env.TURNSTILE_SECRET_KEY
    if (!secret || typeof token !== 'string' || !token || token.length > 2048)
        return false
    try {
        const response = await fetch(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ secret, response: token }),
                cache: 'no-store',
                signal: AbortSignal.timeout(10_000),
            }
        )
        if (!response.ok) return false
        const result = (await response.json()) as {
            success?: boolean
            hostname?: string
            action?: string
        }
        return (
            result.success === true &&
            result.hostname === hostname &&
            result.action === 'contact'
        )
    } catch {
        return false
    }
}

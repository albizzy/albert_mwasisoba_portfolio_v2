import 'server-only'
import { siteConfig } from '@/config/site'
import { getEmailConfig } from './config'

type Email = {
    to: string
    replyTo: string
    subject: string
    html: string
    text: string
}

export async function sendEmail(email: Email, idempotencyKey: string) {
    const config = getEmailConfig()
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
            'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify({
            from: `${siteConfig.name} <${config.from}>`,
            to: [email.to],
            reply_to: email.replyTo,
            subject: email.subject,
            html: email.html,
            text: email.text,
        }),
        cache: 'no-store',
        signal: AbortSignal.timeout(15_000),
    })
    if (!response.ok) {
        // Never log provider payloads: they can contain email addresses/content.
        throw new Error(`Email provider returned HTTP ${response.status}.`)
    }
    const result = (await response.json()) as { id?: string }
    if (!result.id)
        throw new Error('Email provider did not confirm acceptance.')
}

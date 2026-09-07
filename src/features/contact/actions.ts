'use server'

import { createHash } from 'node:crypto'
import { brandedEmail } from './email-template'
import { type FormState, readSubmission, validateContact } from './schema'
import { getEmailConfig } from './server/config'
import { createReplyToken, verifyReplyToken } from './server/reply-token'
import { sendEmail } from './server/resend'
import { verifyTurnstile } from './server/turnstile'

const digest = (value: string) =>
    createHash('sha256').update(value).digest('hex')
const failure = (message: string): FormState => ({ status: 'error', message })

export async function submitContact(
    _previous: FormState,
    form: FormData
): Promise<FormState> {
    if (form.get('website'))
        return { status: 'success', message: 'Thanks for reaching out.' }
    const { values, errors, valid } = validateContact(form)
    if (!valid)
        return {
            status: 'error',
            message: 'Please check the highlighted fields.',
            errors,
            values,
        }
    const submission = readSubmission(form)
    if (!submission) return failure('Please refresh the page and try again.')

    let config: ReturnType<typeof getEmailConfig>
    try {
        config = getEmailConfig()
    } catch {
        return failure(
            'The form is temporarily unavailable. Please use the direct contact option.'
        )
    }
    if (
        !(await verifyTurnstile(
            form.get('cf-turnstile-response'),
            config.hostname
        ))
    ) {
        return failure(
            'Please complete the security check again, then resend your message.'
        )
    }

    const key = `${submission.id}-${digest(JSON.stringify(values))}`
    const token = createReplyToken(
        {
            inquiryId: submission.id,
            name: values.name,
            email: values.email,
            expiresAt: submission.createdAt + 7 * 24 * 60 * 60 * 1000,
        },
        config.replySecret
    )
    const notification = brandedEmail({
        title: 'A new conversation.',
        intro: `${values.name} (${values.email}) reached out through your portfolio.`,
        message: values.message,
        action: {
            label: 'Reply with branding',
            url: `${config.origin}/contact/reply#token=${token}`,
        },
        origin: config.origin,
    })
    try {
        await sendEmail(
            {
                ...notification,
                to: config.to,
                replyTo: values.email,
                subject: `Portfolio inquiry from ${values.name}`,
            },
            `contact-owner-${key}`
        )
    } catch {
        console.error(
            'Contact notification could not be confirmed by the email provider.'
        )
        return failure(
            'Your message could not be confirmed. Please try again or use the direct contact option.'
        )
    }

    // Once the owner notification is accepted, never tell the visitor to resend
    // just because the acknowledgement failed: that would duplicate inquiries.
    try {
        const acknowledgement = brandedEmail({
            title: 'Thanks for reaching out.',
            intro: `Hi ${values.name}, your message is in my inbox. I’ll read it and get back to you.`,
            message: 'Here’s a copy of your message:\n\n' + values.message,
            action: {
                label: 'Book a conversation',
                url: `${config.origin}/schedule`,
            },
            origin: config.origin,
        })
        await sendEmail(
            {
                ...acknowledgement,
                to: values.email,
                replyTo: config.to,
                subject: 'Thanks for reaching out — Albert Mwasisoba',
            },
            `contact-receipt-${key}`
        )
        return {
            status: 'success',
            message:
                'Your message has been sent. A confirmation email is on its way, and I’ll get back to you soon.',
        }
    } catch {
        console.error(
            'Contact notification accepted; acknowledgement could not be confirmed.'
        )
        return {
            status: 'success',
            message:
                'Your message has been sent. The confirmation email couldn’t be sent, but I’ll still get back to you.',
        }
    }
}

export async function getReplyRecipient(token: string) {
    try {
        const claims = verifyReplyToken(token, getEmailConfig().replySecret)
        return claims ? { name: claims.name, email: claims.email } : null
    } catch {
        return null
    }
}

export async function submitBrandedReply(
    _previous: FormState,
    form: FormData
): Promise<FormState> {
    const token = form.get('token')
    const message = form.get('message')
    if (typeof token !== 'string')
        return failure('This reply link is invalid or has expired.')
    if (
        typeof message !== 'string' ||
        message.trim().length < 2 ||
        message.length > 10_000 ||
        message.includes('\0')
    ) {
        return failure('Please write a reply between 2 and 10,000 characters.')
    }
    try {
        const config = getEmailConfig()
        // Authorization happens again on the mutation. The recipient can never
        // be overridden by a hidden field or client-supplied email address.
        const claims = verifyReplyToken(token, config.replySecret)
        if (!claims)
            return failure(
                'This reply link is invalid or has expired. Open a recent notification email.'
            )
        const email = brandedEmail({
            title: 'Let’s keep talking.',
            intro: `Hi ${claims.name},`,
            message: message.trim(),
            origin: config.origin,
        })
        await sendEmail(
            {
                ...email,
                to: claims.email,
                replyTo: config.to,
                subject: 'Your portfolio inquiry — Albert Mwasisoba',
            },
            `contact-reply-${digest(token + '\n' + message.trim())}`
        )
        return {
            status: 'success',
            message: 'Your branded reply has been sent.',
        }
    } catch {
        console.error(
            'Branded reply could not be confirmed by the email provider.'
        )
        return failure('The reply could not be confirmed. Please try again.')
    }
}

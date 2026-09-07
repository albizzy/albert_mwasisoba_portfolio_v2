import { after, beforeEach, test } from 'node:test'
import assert from 'node:assert/strict'
import {
    validateContact,
    initialFormState,
    readSubmission,
} from '../src/features/contact/schema'
import { brandedEmail } from '../src/features/contact/email-template'
import {
    createReplyToken,
    verifyReplyToken,
} from '../src/features/contact/server/reply-token'
import {
    submitBrandedReply,
    submitContact,
} from '../src/features/contact/actions'
import { getContactAvailability } from '../src/features/contact/server/config'
import { getMeetingTypes } from '../src/features/scheduling/config'

const secret = 'ab'.repeat(32)
const originalFetch = globalThis.fetch
const originalEnv = { ...process.env }
const originalError = console.error
const submissionId = 'a1234567-1234-4234-8234-123456789abc'
type RequestRecord = {
    url: string
    body: Record<string, unknown>
    headers: Record<string, string>
}
let calls: RequestRecord[] = []
let emailStatus: number[] = []
let verification = {
    success: true,
    hostname: 'portfolio.example',
    action: 'contact',
}

beforeEach(() => {
    calls = []
    emailStatus = []
    verification = {
        success: true,
        hostname: 'portfolio.example',
        action: 'contact',
    }
    Object.assign(process.env, {
        APP_URL: 'https://portfolio.example',
        RESEND_API_KEY: 'test-key',
        CONTACT_FROM_EMAIL: 'contact@portfolio.example',
        CONTACT_TO_EMAIL: 'owner@example.com',
        CONTACT_REPLY_SECRET: secret,
        TURNSTILE_SITE_KEY: 'test-site-key',
        TURNSTILE_SECRET_KEY: 'test-secret',
    })
    console.error = () => undefined
    globalThis.fetch = (async (
        input: string | URL | Request,
        init?: RequestInit
    ) => {
        const url = String(input)
        calls.push({
            url,
            body: JSON.parse(String(init?.body)),
            headers: init?.headers as Record<string, string>,
        })
        if (url === 'https://challenges.cloudflare.com/turnstile/v0/siteverify')
            return Response.json(verification)
        assert.equal(
            url,
            'https://api.resend.com/emails',
            'Tests must never make real network requests'
        )
        const status = emailStatus.shift() || 200
        return Response.json(
            status === 200
                ? { id: 'test-email' }
                : { error: 'simulated failure' },
            { status }
        )
    }) as typeof fetch
})

after(() => {
    globalThis.fetch = originalFetch
    console.error = originalError
    for (const key of Object.keys(process.env))
        if (!(key in originalEnv)) delete process.env[key]
    Object.assign(process.env, originalEnv)
})

function form() {
    const data = new FormData()
    Object.entries({
        name: 'A Visitor',
        email: 'visitor@example.com',
        message: 'I would like to discuss a new project.',
        submissionId,
        createdAt: String(Date.now()),
        'cf-turnstile-response': 'valid-test-token',
    }).forEach(([key, value]) => data.set(key, value))
    return data
}

function replyToken(expiresAt = Date.now() + 60_000) {
    return createReplyToken(
        {
            inquiryId: submissionId,
            name: 'A Visitor',
            email: 'visitor@example.com',
            expiresAt,
        },
        secret
    )
}

test('validates lengths, email injection, names, and non-string form fields', () => {
    const data = form()
    assert.equal(validateContact(data).valid, true)
    data.set('email', 'visitor@example.com\r\nBcc: attacker@example.com')
    data.set('name', 'Injected\nName')
    data.set('message', 'x'.repeat(5001))
    assert.deepEqual(Object.keys(validateContact(data).errors).sort(), [
        'email',
        'message',
        'name',
    ])
    data.set('name', new Blob(['not a name']))
    assert.ok(validateContact(data).errors.name)
    data.set('createdAt', String(Date.now() - 24 * 60 * 60 * 1000))
    assert.equal(readSubmission(data), null)
})

test('email HTML escapes visitor content while preserving plain text', () => {
    const result = brandedEmail({
        title: '<title>',
        intro: '"Hello"',
        message: '<img src=x onerror=alert(1)>\n& goodbye',
        origin: 'https://portfolio.example',
    })
    assert.ok(result.html.includes('&lt;img'))
    assert.ok(!result.html.includes('<img'))
    assert.ok(result.html.includes('<br>'))
    assert.ok(result.text.includes('<img src=x onerror=alert(1)>'))
})

test('reply capability rejects tampering, expiration, other secrets, and malformed input', () => {
    const token = replyToken()
    assert.equal(verifyReplyToken(token, secret)?.email, 'visitor@example.com')
    assert.equal(verifyReplyToken(token + 'x', secret), null)
    const [payload, signature] = token.split('.')
    const altered = JSON.parse(Buffer.from(payload, 'base64url').toString())
    altered.email = 'attacker@example.com'
    assert.equal(
        verifyReplyToken(
            Buffer.from(JSON.stringify(altered)).toString('base64url') +
                '.' +
                signature,
            secret
        ),
        null
    )
    assert.equal(verifyReplyToken(replyToken(Date.now() - 1), secret), null)
    assert.equal(verifyReplyToken(token, 'cd'.repeat(32)), null)
    assert.equal(verifyReplyToken('malformed', secret), null)
})

test('missing setup, invalid input, and honeypots never send email', async () => {
    delete process.env.RESEND_API_KEY
    assert.equal(getContactAvailability().ready, false)
    assert.equal(
        (await submitContact(initialFormState, form())).status,
        'error'
    )
    const invalid = form()
    invalid.set('email', 'invalid')
    assert.ok((await submitContact(initialFormState, invalid)).errors?.email)
    const bot = form()
    bot.set('website', 'spam')
    assert.equal((await submitContact(initialFormState, bot)).status, 'success')
    assert.equal(calls.length, 0)
})

test('rejects unsuccessful Turnstile verification and hostname/action mismatches', async () => {
    for (const result of [
        { success: false, hostname: 'portfolio.example', action: 'contact' },
        { success: true, hostname: 'attacker.example', action: 'contact' },
        { success: true, hostname: 'portfolio.example', action: 'login' },
    ]) {
        verification = result
        assert.equal(
            (await submitContact(initialFormState, form())).status,
            'error'
        )
    }
    assert.ok(calls.every((call) => call.url.includes('siteverify')))
})

test('sends branded notification and receipt with the private reply link only in the owner email', async () => {
    assert.equal(
        (await submitContact(initialFormState, form())).status,
        'success'
    )
    const emails = calls.filter((call) => call.url.includes('resend'))
    assert.equal(emails.length, 2)
    assert.deepEqual(emails[0].body.to, ['owner@example.com'])
    assert.equal(emails[0].body.reply_to, 'visitor@example.com')
    assert.ok(String(emails[0].body.html).includes('/contact/reply#token='))
    assert.deepEqual(emails[1].body.to, ['visitor@example.com'])
    assert.equal(emails[1].body.reply_to, 'owner@example.com')
    assert.ok(!String(emails[1].body.html).includes('#token='))
})

test('owner delivery failure stops the receipt; receipt failure preserves contact success', async () => {
    emailStatus = [500]
    assert.equal(
        (await submitContact(initialFormState, form())).status,
        'error'
    )
    assert.equal(calls.filter((call) => call.url.includes('resend')).length, 1)
    calls = []
    emailStatus = [200, 500]
    const result = await submitContact(initialFormState, form())
    assert.equal(result.status, 'success')
    assert.ok(result.message.includes('confirmation email couldn’t'))
})

test('a retried contact request uses identical provider payloads and idempotency keys', async () => {
    const data = form()
    await submitContact(initialFormState, data)
    await submitContact(initialFormState, data)
    const emails = calls.filter((call) => call.url.includes('resend'))
    assert.deepEqual(emails[0], emails[2])
    assert.deepEqual(emails[1], emails[3])
})

test('reply mutation rechecks authorization and ignores attacker-supplied recipients', async () => {
    const data = new FormData()
    data.set('message', 'Thank you. Let’s discuss your project.')
    data.set('token', replyToken(Date.now() - 1))
    assert.equal(
        (await submitBrandedReply(initialFormState, data)).status,
        'error'
    )
    assert.equal(calls.length, 0)
    data.set('token', replyToken())
    data.set('email', 'attacker@example.com')
    assert.equal(
        (await submitBrandedReply(initialFormState, data)).status,
        'success'
    )
    assert.deepEqual(calls[0].body.to, ['visitor@example.com'])
    await submitBrandedReply(initialFormState, data)
    assert.deepEqual(calls[0], calls[1])
})

test('scheduling accepts only Cal.com event paths', () => {
    process.env.CAL_COM_INTRO_PATH = 'albert/intro'
    process.env.CAL_COM_WORKING_SESSION_PATH = 'https://attacker.example/event'
    const meetings = getMeetingTypes()
    assert.equal(meetings[0].calLink, 'albert/intro')
    assert.equal(meetings[1].calLink, null)
})

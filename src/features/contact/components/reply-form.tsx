'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getReplyRecipient, submitBrandedReply } from '../actions'
import { initialFormState, type FormState } from '../schema'
import { FormField } from './form-field'

type ReplyContext = { token: string; name: string; email: string }

export function ReplyForm() {
    const [context, setContext] = useState<ReplyContext | null>(null)
    const [loaded, setLoaded] = useState(false)
    const [message, setMessage] = useState('')
    const feedback = useRef<HTMLParagraphElement>(null)
    const tokenRef = useRef('')
    const [state, action, pending] = useActionState(
        async (previous: FormState, form: FormData) => {
            form.set('token', context?.token || '')
            try {
                return await submitBrandedReply(previous, form)
            } catch {
                return {
                    status: 'error',
                    message:
                        'The connection was interrupted. Please try again.',
                } as FormState
            }
        },
        initialFormState
    )

    useEffect(() => {
        let cancelled = false
        // Retain in memory before removing the fragment, including Strict Mode's
        // effect replay. Never put the capability in localStorage or a cookie.
        tokenRef.current ||=
            new URLSearchParams(window.location.hash.slice(1)).get('token') ||
            ''
        window.history.replaceState(null, '', window.location.pathname)
        getReplyRecipient(tokenRef.current)
            .then((recipient) => {
                if (!cancelled)
                    setContext(
                        recipient
                            ? { ...recipient, token: tokenRef.current }
                            : null
                    )
            })
            .catch(() => {
                if (!cancelled) setContext(null)
            })
            .finally(() => {
                if (!cancelled) setLoaded(true)
            })
        return () => {
            cancelled = true
        }
    }, [])

    useEffect(() => {
        if (state.status !== 'idle') feedback.current?.focus()
    }, [state])

    if (!loaded)
        return (
            <p role="status" className="text-sm text-muted-foreground">
                Checking your private reply link…
            </p>
        )
    if (!context)
        return (
            <div className="space-y-4">
                <h2 className="text-xl">This reply link is unavailable.</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">
                    Open the “Reply with branding” link in a recent notification
                    email. Links expire after seven days. If a link has expired,
                    reply directly from your inbox.
                </p>
                <Link
                    href="/"
                    className="inline-block text-sm underline underline-offset-4"
                >
                    Back to the portfolio
                </Link>
            </div>
        )

    return (
        <form
            action={action}
            aria-busy={pending}
            className="flex flex-col gap-8"
        >
            <div className="space-y-2 border-b border-border pb-6">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Replying to
                </p>
                <p className="text-lg">{context.name}</p>
                <p className="break-all text-sm text-muted-foreground">
                    {context.email}
                </p>
            </div>
            {state.status !== 'success' && (
                <>
                    <FormField
                        id="reply-message"
                        name="message"
                        label="Your reply"
                        multiline
                        rows={8}
                        required
                        minLength={2}
                        maxLength={10_000}
                        disabled={pending}
                        value={message}
                        onChange={(event) => setMessage(event.target.value)}
                        placeholder="Write your reply. Your branding will be added automatically."
                    />
                    <details className="rounded-3xl border border-border p-6">
                        <summary className="cursor-pointer text-sm">
                            Preview branded reply
                        </summary>
                        <div className="mt-6 overflow-hidden rounded-2xl border border-border">
                            <div className="bg-foreground p-6 text-background">
                                <p className="font-medium">Albert Mwasisoba.</p>
                                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest">
                                    Consultant &amp; Engineer
                                </p>
                            </div>
                            <div className="space-y-5 p-6">
                                <h2 className="text-xl">Let’s keep talking.</h2>
                                <p className="text-sm text-muted-foreground">
                                    Hi {context.name},
                                </p>
                                <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                    {message || 'Your reply will appear here.'}
                                </p>
                            </div>
                        </div>
                    </details>
                    <Button
                        type="submit"
                        disabled={pending}
                        className="h-auto self-start rounded-full px-7 py-4"
                    >
                        {pending ? 'Sending reply…' : 'Send branded reply'}
                    </Button>
                </>
            )}
            {state.message && (
                <p
                    ref={feedback}
                    tabIndex={-1}
                    role={state.status === 'error' ? 'alert' : 'status'}
                    className="text-sm leading-relaxed outline-none"
                >
                    {state.message}
                </p>
            )}
            <p className="text-xs leading-relaxed text-muted-foreground">
                This private link authorizes replies to this recipient. Keep it
                in your inbox. Their responses will go to your configured
                contact inbox.
            </p>
        </form>
    )
}

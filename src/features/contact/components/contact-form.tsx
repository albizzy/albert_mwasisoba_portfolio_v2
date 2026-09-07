'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { submitContact } from '../actions'
import { contactLimits, initialFormState, type FormState } from '../schema'
import { FormField } from './form-field'
import { Turnstile } from './turnstile'

export function ContactForm({
    ready,
    siteKey,
    publicEmail,
}: {
    ready: boolean
    siteKey: string
    publicEmail: string | null
}) {
    const formRef = useRef<HTMLFormElement>(null)
    const feedbackRef = useRef<HTMLDivElement>(null)
    const submission = useRef<{ id: string; createdAt: number } | null>(null)
    const [values, setValues] = useState({ name: '', email: '', message: '' })
    const [token, setToken] = useState('')
    const [attempt, setAttempt] = useState(0)
    const [state, action, pending] = useActionState(
        async (previous: FormState, form: FormData) => {
            submission.current ??= {
                id: crypto.randomUUID(),
                createdAt: Date.now(),
            }
            form.set('submissionId', submission.current.id)
            form.set('createdAt', String(submission.current.createdAt))
            form.set('cf-turnstile-response', token)
            try {
                return await submitContact(previous, form)
            } catch {
                return {
                    status: 'error',
                    message:
                        'The connection was interrupted. Please try again.',
                } as FormState
            } finally {
                setToken('')
                setAttempt((value) => value + 1)
            }
        },
        initialFormState
    )

    useEffect(() => {
        if (state.status === 'idle') return
        const invalid = formRef.current?.querySelector<HTMLElement>(
            '[aria-invalid="true"]'
        )
        if (invalid) invalid.focus()
        else feedbackRef.current?.focus()
    }, [state])

    if (state.status === 'success')
        return (
            <div
                ref={feedbackRef}
                tabIndex={-1}
                role="status"
                className="flex flex-col items-center gap-6 rounded-4xl border border-border bg-muted/30 px-6 py-14 text-center outline-none"
            >
                <span className="flex size-14 items-center justify-center rounded-full bg-foreground text-background">
                    <Check aria-hidden="true" />
                </span>
                <h2 className="text-2xl font-medium tracking-tight">
                    A conversation started.
                </h2>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {state.message}
                </p>
                <Button
                    asChild
                    variant="outline"
                    className="h-auto rounded-full px-6 py-4"
                >
                    <Link href="/schedule">
                        Book a call <ArrowUpRight aria-hidden="true" />
                    </Link>
                </Button>
            </div>
        )

    return (
        <form
            ref={formRef}
            action={action}
            aria-busy={pending}
            className="flex flex-col gap-10"
        >
            <fieldset
                disabled={pending || !ready}
                className="grid min-w-0 gap-10 sm:grid-cols-2"
            >
                <legend className="sr-only">
                    Tell me what you’re building
                </legend>
                <FormField
                    id="contact-name"
                    name="name"
                    label="Name"
                    autoComplete="name"
                    placeholder="Your name"
                    required
                    maxLength={contactLimits.name}
                    value={values.name}
                    onChange={(event) =>
                        setValues({ ...values, name: event.target.value })
                    }
                    error={state.errors?.name}
                />
                <FormField
                    id="contact-email"
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    required
                    maxLength={contactLimits.email}
                    value={values.email}
                    onChange={(event) =>
                        setValues({ ...values, email: event.target.value })
                    }
                    error={state.errors?.email}
                />
                <div className="sm:col-span-2">
                    <FormField
                        id="contact-message"
                        name="message"
                        label="Message"
                        multiline
                        placeholder="What are you working on, and how can I help?"
                        required
                        minLength={10}
                        maxLength={contactLimits.message}
                        value={values.message}
                        onChange={(event) =>
                            setValues({
                                ...values,
                                message: event.target.value,
                            })
                        }
                        error={state.errors?.message}
                    />
                </div>
            </fieldset>
            <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-website">Leave this field empty</label>
                <input
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                />
            </div>
            <div className="flex flex-col items-center gap-6">
                {ready && (
                    <Turnstile
                        key={attempt}
                        siteKey={siteKey}
                        onToken={setToken}
                    />
                )}
                {!ready && (
                    <p
                        role="status"
                        className="max-w-xl text-center text-sm leading-relaxed text-muted-foreground"
                    >
                        The message form is temporarily unavailable.{' '}
                        {publicEmail ? (
                            <a
                                href={`mailto:${publicEmail}`}
                                className="underline underline-offset-4"
                            >
                                Email me directly
                            </a>
                        ) : (
                            <Link
                                href="/schedule"
                                className="underline underline-offset-4"
                            >
                                Check call availability
                            </Link>
                        )}
                        .
                    </p>
                )}
                {state.message && (
                    <div
                        ref={feedbackRef}
                        tabIndex={-1}
                        role="alert"
                        className="text-center text-sm text-destructive outline-none"
                    >
                        {state.message}
                    </div>
                )}
                <Button
                    disabled={pending || !ready || !token}
                    type="submit"
                    className="h-auto rounded-full px-8 py-5 text-sm md:text-base"
                >
                    {pending ? (
                        <>
                            <LoaderCircle
                                className="animate-spin"
                                aria-hidden="true"
                            />{' '}
                            Sending…
                        </>
                    ) : (
                        <>
                            Send message <ArrowUpRight aria-hidden="true" />
                        </>
                    )}
                </Button>
                <p className="max-w-lg text-center text-xs leading-relaxed text-muted-foreground">
                    Your details are used to respond to your inquiry. This form
                    uses Resend for email delivery and Cloudflare Turnstile for
                    spam protection.
                </p>
            </div>
        </form>
    )
}

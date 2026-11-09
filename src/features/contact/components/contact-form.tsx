'use client'

import { useActionState, useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { TextLink } from '@/components/ui/text-link'
import { routes } from '@/config/routes'
import { submitContact } from '../actions'
import {
    contactFields,
    emptyContactValues,
    initialFormState,
    type ContactValues,
    type FormState,
} from '../schema'
import { FormField } from './form-field'
import { Turnstile } from './turnstile'
import styles from '@/styles/correspondence.module.css'

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
    const [values, setValues] = useState<ContactValues>(emptyContactValues)
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
                className={styles.success}
            >
                <span className={styles.successIcon}>
                    <Check aria-hidden="true" />
                </span>
                <h2 className={styles.successTitle}>A conversation started.</h2>
                <p className={styles.status}>{state.message}</p>
                <Button asChild variant="editorial" size="pill">
                    <Link href={routes.schedule}>
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
            className={styles.form}
        >
            <fieldset disabled={pending || !ready} className={styles.formGrid}>
                <legend className="sr-only">
                    Tell me what you’re building
                </legend>
                {contactFields.map((field) => {
                    const control = (
                        <FormField
                            key={field.name}
                            id={`contact-${field.name}`}
                            name={field.name}
                            label={field.label}
                            type={field.type}
                            autoComplete={field.autoComplete}
                            multiline={field.multiline}
                            placeholder={field.placeholder}
                            required={field.required}
                            minLength={field.minLength}
                            maxLength={field.maxLength}
                            value={values[field.name]}
                            onChange={(event) =>
                                setValues((current) => ({
                                    ...current,
                                    [field.name]: event.target.value,
                                }))
                            }
                            error={state.errors?.[field.name]}
                        />
                    )

                    return field.fullWidth ? (
                        <div key={field.name} className={styles.fullWidth}>
                            {control}
                        </div>
                    ) : (
                        control
                    )
                })}
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
            <div className={styles.formFooter}>
                {ready && (
                    <Turnstile
                        key={attempt}
                        siteKey={siteKey}
                        onToken={setToken}
                    />
                )}
                {!ready && (
                    <p role="status" className={styles.status}>
                        The message form is temporarily unavailable.{' '}
                        {publicEmail ? (
                            <TextLink href={`mailto:${publicEmail}`}>
                                Email me directly
                            </TextLink>
                        ) : (
                            <TextLink href={routes.schedule}>
                                Check call availability
                            </TextLink>
                        )}
                        .
                    </p>
                )}
                {state.message && (
                    <div
                        ref={feedbackRef}
                        tabIndex={-1}
                        role="alert"
                        className={`${styles.status} ${styles.errorStatus}`}
                    >
                        {state.message}
                    </div>
                )}
                <Button
                    disabled={pending || !ready || !token}
                    type="submit"
                    variant="editorialDark"
                    size="pill"
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
                <p className={styles.finePrint}>
                    Your details are used to respond to your inquiry. This form
                    uses Resend for email delivery and Cloudflare Turnstile for
                    spam protection.
                </p>
            </div>
        </form>
    )
}

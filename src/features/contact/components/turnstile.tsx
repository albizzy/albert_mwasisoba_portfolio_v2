'use client'

import Script from 'next/script'
import { useCallback, useEffect, useRef, useState } from 'react'

type TurnstileApi = {
    render: (element: HTMLElement, options: Record<string, unknown>) => string
    remove: (id: string) => void
}
declare global {
    interface Window {
        turnstile?: TurnstileApi
    }
}

export function Turnstile({
    siteKey,
    onToken,
}: {
    siteKey: string
    onToken: (token: string) => void
}) {
    const element = useRef<HTMLDivElement>(null)
    const widget = useRef<string | null>(null)
    const [error, setError] = useState(false)
    const render = useCallback(() => {
        if (!element.current || !window.turnstile || widget.current !== null)
            return
        widget.current = window.turnstile.render(element.current, {
            sitekey: siteKey,
            action: 'contact',
            theme: 'auto',
            size: 'flexible',
            'response-field': false,
            callback: (token: string) => {
                setError(false)
                onToken(token)
            },
            'expired-callback': () => onToken(''),
            'error-callback': () => {
                setError(true)
                onToken('')
            },
        })
    }, [siteKey, onToken])

    useEffect(() => {
        render()
        return () => {
            if (widget.current !== null)
                window.turnstile?.remove(widget.current)
            widget.current = null
        }
    }, [render])

    return (
        <div className="w-full max-w-sm">
            <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
                strategy="afterInteractive"
                onReady={render}
                onError={() => setError(true)}
            />
            <div ref={element} />
            {error && (
                <p role="alert" className="mt-2 text-sm text-destructive">
                    The security check couldn’t load. Refresh the page or use
                    the direct contact option.
                </p>
            )}
        </div>
    )
}

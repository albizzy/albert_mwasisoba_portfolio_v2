'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function CalBooking({
    calLink,
    namespace,
}: {
    calLink: string
    namespace: string
}) {
    const { resolvedTheme } = useTheme()
    const [failed, setFailed] = useState(false)
    const theme = resolvedTheme === 'dark' ? 'dark' : 'light'

    useEffect(() => {
        let cancelled = false
        getCalApi({ namespace })
            .then((cal) => {
                if (cancelled) return
                cal('ui', {
                    theme,
                    hideEventTypeDetails: false,
                    layout: 'month_view',
                })
            })
            .catch(() => {
                if (!cancelled) setFailed(true)
            })
        return () => {
            cancelled = true
        }
    }, [namespace, theme])

    return (
        <div
            data-lenis-prevent
            className="min-h-[720px] w-full overflow-hidden rounded-3xl border border-border bg-background"
        >
            {failed ? (
                <p role="alert" className="p-8 text-sm text-muted-foreground">
                    The calendar couldn’t load. Use the booking link below to
                    choose a time.
                </p>
            ) : (
                <Cal
                    namespace={namespace}
                    calLink={calLink}
                    config={{ layout: 'month_view', theme }}
                    style={{
                        width: '100%',
                        height: '100%',
                        minHeight: 720,
                        overflow: 'auto',
                    }}
                />
            )}
        </div>
    )
}

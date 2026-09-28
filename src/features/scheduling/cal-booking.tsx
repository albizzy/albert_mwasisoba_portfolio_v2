'use client'

import Cal, { getCalApi } from '@calcom/embed-react'
import { useEffect, useState } from 'react'
import styles from '@/styles/correspondence.module.css'

export function CalBooking({
    calLink,
    namespace,
}: {
    calLink: string
    namespace: string
}) {
    const [failed, setFailed] = useState(false)
    const theme = 'light'

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
        <div data-lenis-prevent className={styles.calendarFrame}>
            {failed ? (
                <p role="alert" className={styles.status}>
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

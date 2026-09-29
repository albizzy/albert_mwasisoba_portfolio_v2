import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReplyForm } from '@/features/contact/components/reply-form'
import styles from '@/styles/correspondence.module.css'
import { Typography } from '@/components/ui/typography'

export const maxDuration = 60
export const metadata: Metadata = {
    title: 'Private Reply — Albert Mwasisoba',
    robots: { index: false, follow: false, noarchive: true },
    referrer: 'no-referrer',
}

export default function ReplyPage() {
    return (
        <main className={`${styles.page} ${styles.privatePage}`}>
            <div className={`${styles.inner} ${styles.replyShell}`}>
                <Link href="/" className={styles.backLink}>
                    <ArrowLeft size={16} aria-hidden="true" />
                    Back to portfolio
                </Link>
                <header className={styles.hero}>
                    <div>
                        <Typography as={'h1'} variant={'h4'}>
                            Direct{' '}
                            <span
                                className={`${styles.highlight} ${styles.highlightBlue}`}
                            >
                                reply.
                            </span>
                        </Typography>
                        <p className={styles.lead}>
                            A private line to follow up and continue the
                            conversation.
                        </p>
                    </div>
                    <div
                        className={styles.heroNote}
                        data-tone="blue"
                        aria-hidden="true"
                    >
                        <span>Private thread</span>
                        <strong>Delivered directly to my inbox.</strong>
                    </div>
                </header>
                <section
                    className={styles.panelShell}
                    aria-label="Private reply"
                >
                    <span className={styles.panelTab}>Private thread</span>
                    <div className={`${styles.panel} ${styles.panelBlue}`}>
                        <ReplyForm />
                    </div>
                </section>
            </div>
        </main>
    )
}

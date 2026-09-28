import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { ReplyForm } from '@/features/contact/components/reply-form'
import styles from '@/styles/correspondence.module.css'

export const maxDuration = 60
export const metadata: Metadata = {
    title: 'Private reply — Albert Mwasisoba',
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
                        <p className={styles.eyebrow}>
                            Albert / Private correspondence
                        </p>
                        <h1 className={styles.heroTitle}>
                            A thoughtful{' '}
                            <span
                                className={`${styles.highlight} ${styles.highlightBlue}`}
                            >
                                reply.
                            </span>
                        </h1>
                        <p className={styles.lead}>
                            A quiet space to continue the conversation, with the
                            same care as the first message.
                        </p>
                    </div>
                    <div
                        className={styles.heroNote}
                        data-tone="blue"
                        aria-hidden="true"
                    >
                        <span>A note to send</span>
                        <strong>Make every word count.</strong>
                    </div>
                </header>
                <section
                    className={styles.panelShell}
                    aria-label="Private reply"
                >
                    <span className={styles.panelTab}>
                        Reply draft / Private
                    </span>
                    <div className={`${styles.panel} ${styles.panelBlue}`}>
                        <ReplyForm />
                    </div>
                </section>
            </div>
        </main>
    )
}

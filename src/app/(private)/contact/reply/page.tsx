import type { Metadata } from 'next'
import { ReplyForm } from '@/features/contact/components/reply-form'

export const maxDuration = 60
export const metadata: Metadata = {
    title: 'Private reply — Albert Mwasisoba',
    robots: { index: false, follow: false, noarchive: true },
    referrer: 'no-referrer',
}

export default function ReplyPage() {
    return (
        <main className="mx-auto flex min-h-dvh w-full max-w-3xl flex-col gap-10 px-6 py-16 md:py-24">
            <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Albert Mwasisoba / Private correspondence
                </p>
                <h1 className="text-3xl font-medium tracking-tight md:text-5xl">
                    A thoughtful reply.
                </h1>
            </div>
            <ReplyForm />
        </main>
    )
}

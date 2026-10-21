import type { RefObject } from 'react'
import { Typography } from '@/components/ui/typography'
import type { CompletionStep } from './expertise-data'

interface CompletionStepsProps {
    steps: ReadonlyArray<CompletionStep>
    viewportRef: RefObject<HTMLDivElement | null>
    listRef: RefObject<HTMLDivElement | null>
}

export function CompletionSteps({
    steps,
    viewportRef,
    listRef,
}: CompletionStepsProps) {
    return (
        <div className="flex items-center justify-center">
            <div
                ref={viewportRef}
                className="relative size-96 overflow-hidden rounded-[28px] border-2 border-(--editorial-ink) bg-(--editorial-paper) px-6 py-6 shadow-[8px_8px_0_var(--editorial-line)]"
            >
                <div
                    ref={listRef}
                    className="flex w-full flex-col items-center gap-4"
                >
                    {steps.map((step) => {
                        const Icon = step.icon

                        return (
                            <div
                                key={step.title}
                                className={`flex w-fit flex-row items-center gap-2.5 rounded-full border-2 border-white px-5 py-3 shadow-sm ${step.background}`}
                            >
                                <Icon aria-hidden="true" className="size-4" />
                                <Typography
                                    as="span"
                                    variant="caption"
                                    className="font-medium uppercase tracking-[0.08em] text-inherit"
                                >
                                    {step.title}
                                </Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

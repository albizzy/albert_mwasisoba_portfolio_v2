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
                className="relative size-96 overflow-hidden rounded-4xl bg-muted px-6 py-6"
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
                                className={`flex w-fit flex-row items-center gap-2 rounded-full px-6 py-4 ${step.background}`}
                            >
                                <Icon aria-hidden="true" />
                                <Typography as="span">{step.title}</Typography>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

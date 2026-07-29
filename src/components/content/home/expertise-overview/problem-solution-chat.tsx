'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import type { ProblemSolution } from './expertise-data'
import { useProblemSolutionChat } from './hooks'

interface ProblemSolutionChatProps {
    items: ReadonlyArray<ProblemSolution>
}

export function ProblemSolutionChat({ items }: ProblemSolutionChatProps) {
    const { containerRef, resetChat, selectProblem, selectedIndex } =
        useProblemSolutionChat()
    const selectedItem = selectedIndex === null ? null : items[selectedIndex]

    return (
        <div
            ref={containerRef}
            className={cn(
                'relative flex flex-col gap-8 overflow-hidden rounded-3xl bg-accent p-8 md:gap-12 md:p-12',
                selectedIndex === null && 'transition-all duration-300'
            )}
        >
            <Typography
                as="h2"
                variant="h5"
                className="mx-auto max-w-sm text-center font-medium"
            >
                How can I help you?
            </Typography>

            <div className="flex flex-1 flex-col justify-end gap-6">
                <Typography
                    as="span"
                    variant="small"
                    className="chat-subtitle ml-6"
                >
                    Choose what fits your needs
                </Typography>

                <div className="flex w-full flex-col items-stretch gap-4">
                    {items.map((item, index) => {
                        const isSelected = selectedIndex === index
                        const isAnySelected = selectedIndex !== null

                        return (
                            <button
                                key={item.problem}
                                type="button"
                                onClick={() => selectProblem(index)}
                                disabled={isAnySelected && !isSelected}
                                className={cn(
                                    'problem-item w-fit cursor-pointer rounded-3xl bg-background p-4 text-left md:p-6',
                                    `problem-item-${index}`,
                                    selectedIndex === null &&
                                        'transition-all duration-500',
                                    isSelected
                                        ? 'pointer-events-none w-full cursor-default border border-border/50 text-foreground shadow-xs'
                                        : 'hover:bg-background/50 hover:text-foreground/50',
                                    isAnySelected &&
                                        !isSelected &&
                                        'pointer-events-none opacity-50'
                                )}
                            >
                                <Typography
                                    as="h3"
                                    variant="body"
                                    className="font-semibold"
                                >
                                    {item.problem}
                                </Typography>
                            </button>
                        )
                    })}
                </div>

                {selectedItem && (
                    <div className="solutions-list flex w-full flex-col gap-4">
                        {selectedItem.solutions.map((solution) => (
                            <div
                                key={solution}
                                className="solution-bubble hidden w-fit max-w-[85%] translate-y-4 self-end rounded-3xl p-4 text-white opacity-0 md:p-6"
                                style={{
                                    backgroundColor: 'var(--chart-2)',
                                }}
                            >
                                <Typography
                                    as="p"
                                    variant="body"
                                    className="font-medium"
                                >
                                    {solution}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}

                {selectedItem && (
                    <div className="chat-footer mt-6 hidden w-full translate-y-4 items-center justify-between opacity-0">
                        <button
                            type="button"
                            onClick={resetChat}
                            className="flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-foreground transition-opacity hover:opacity-75 md:text-base"
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                className="size-4 md:size-5"
                            />
                            Go back
                        </button>
                        <Button
                            asChild
                            variant="default"
                            className="h-auto cursor-pointer rounded-full px-6 py-5 text-sm font-semibold shadow-md transition-transform hover:scale-105 md:text-base"
                        >
                            <Link href="/contact">
                                Let&apos;s work together
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

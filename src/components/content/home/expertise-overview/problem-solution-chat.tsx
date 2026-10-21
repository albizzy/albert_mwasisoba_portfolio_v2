'use client'

import Link from 'next/link'
import { ArrowUpRight, ChevronLeft } from 'lucide-react'
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
                'relative flex flex-col gap-8 overflow-hidden rounded-[28px] border-2 border-(--editorial-ink) bg-(--editorial-paper) p-6 md:gap-10 md:p-10 shadow-[8px_8px_0_var(--editorial-line)]',
                selectedIndex === null && 'transition-all duration-300'
            )}
        >
            <Typography
                as="h2"
                variant="h5"
                className="mx-auto max-w-sm text-center font-semibold text-(--editorial-ink)"
            >
                How can I help you?
            </Typography>

            <div className="flex flex-1 flex-col justify-end gap-5">
                <Typography
                    as="span"
                    variant="caption"
                    className="chat-subtitle ml-4 uppercase tracking-[0.1em] text-(--editorial-muted)"
                >
                    Choose what fits your needs
                </Typography>

                <div className="flex w-full flex-col items-stretch gap-3.5">
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
                                    'problem-item w-fit cursor-pointer rounded-2xl border-1.5 border-(--editorial-line) bg-(--editorial-surface) p-4 text-left md:p-5',
                                    `problem-item-${index}`,
                                    selectedIndex === null &&
                                        'transition-all duration-300',
                                    isSelected
                                        ? 'pointer-events-none w-full cursor-default border-(--editorial-ink) text-(--editorial-ink) shadow-[3px_3px_0_var(--editorial-yellow)]'
                                        : 'hover:border-(--editorial-ink) hover:bg-(--editorial-surface)',
                                    isAnySelected &&
                                        !isSelected &&
                                        'pointer-events-none opacity-50'
                                )}
                            >
                                <Typography
                                    as="h3"
                                    variant="body"
                                    className="font-medium text-(--editorial-ink)"
                                >
                                    {item.problem}
                                </Typography>
                            </button>
                        )
                    })}
                </div>

                {selectedItem && (
                    <div className="solutions-list flex w-full flex-col gap-3.5">
                        {selectedItem.solutions.map((solution) => (
                            <div
                                key={solution}
                                className="solution-bubble hidden w-fit max-w-[85%] translate-y-4 self-end rounded-2xl border-2 border-(--editorial-ink) bg-(--editorial-blue) p-4 text-white opacity-0 md:p-5 shadow-[3px_3px_0_var(--editorial-ink)]"
                            >
                                <Typography
                                    as="p"
                                    variant="body"
                                    className="font-normal text-white"
                                >
                                    {solution}
                                </Typography>
                            </div>
                        ))}
                    </div>
                )}

                {selectedItem && (
                    <div className="chat-footer mt-4 hidden w-full translate-y-4 items-center justify-between opacity-0 pt-2 border-t border-(--editorial-line)">
                        <button
                            type="button"
                            onClick={resetChat}
                            className="flex cursor-pointer items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-(--editorial-ink) transition-opacity hover:opacity-75"
                        >
                            <ChevronLeft
                                aria-hidden="true"
                                className="size-4"
                            />
                            Go back
                        </button>
                        <Button
                            asChild
                            variant="default"
                            className="min-h-12 h-auto cursor-pointer rounded-full border-2 border-(--editorial-ink) bg-(--editorial-ink) px-6 py-3 text-xs font-semibold uppercase tracking-[0.08em] text-white shadow-[3px_3px_0_var(--editorial-yellow)] transition-all duration-200 hover:bg-(--editorial-ink) hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0_var(--editorial-yellow)]"
                        >
                            <Link href="/contact">
                                Let&apos;s work together
                                <ArrowUpRight aria-hidden="true" />
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

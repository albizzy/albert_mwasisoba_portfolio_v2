import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Typography } from '@/components/ui/typography'
import {
    WorkCardProps,
    WorkPreview,
} from '@/components/content/home/work-overview/work-item'
import { WorkTags } from '@/components/content/home/work-overview/work-tags'

export function WorkCard({ work }: WorkCardProps) {
    return (
        <article className="group work-card flex flex-col justify-between gap-6 rounded-[28px] border-2 border-(--editorial-ink) bg-(--editorial-paper) p-5 md:p-7 shadow-[6px_6px_0_var(--editorial-line)] transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[8px_8px_0_var(--editorial-yellow)]">
            <div className="flex flex-col gap-5">
                <WorkPreview work={work} />

                <div className="work-content flex flex-col gap-3">
                    <p className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.12em] text-(--editorial-muted)">
                        <span
                            aria-hidden="true"
                            className="size-2 rounded-full bg-(--editorial-blue)"
                        />
                        {work.types.join(' / ')}
                    </p>
                    <Typography
                        as="h3"
                        variant="h5"
                        className="font-semibold tracking-tight text-(--editorial-ink)"
                    >
                        {work.title}
                    </Typography>
                    <Typography
                        as="p"
                        variant="body"
                        className="text-(--editorial-muted) leading-relaxed"
                    >
                        {work.description}
                    </Typography>
                </div>
            </div>

            <div className="flex flex-col gap-5 pt-2">
                <WorkTags items={work.services} />
                <div className="work-link pt-1 border-t border-(--editorial-line)">
                    <Link
                        href={work.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor-label="Visit site"
                        data-cursor-tone="yellow"
                        className="inline-flex items-center gap-2 pt-3 text-xs font-semibold uppercase tracking-[0.12em] text-(--editorial-ink) underline decoration-(--editorial-yellow) decoration-2 underline-offset-4 transition-colors hover:text-(--editorial-blue)"
                    >
                        View project
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </article>
    )
}

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Typography } from '@/components/ui/typography'
import {
    WorkCardProps,
    WorkPreview,
} from '@/components/content/home/work-overview/work-item'

export function WorkCard({ work }: WorkCardProps) {
    return (
        <article className="group work-card flex flex-col gap-4 rounded-2xl">
            <WorkPreview work={work} />

            <div className="work-content flex flex-col gap-2">
                <Typography as="h3" variant="h6" className="font-medium">
                    {work.title}
                </Typography>
                <Typography
                    as="p"
                    variant="body"
                    className="text-muted-foreground"
                >
                    {work.description}
                </Typography>
            </div>

            <div className="work-link flex items-center gap-2">
                <Typography
                    as="p"
                    variant="body"
                    className="text-muted-foreground"
                >
                    <Link
                        href={work.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-foreground hover:underline"
                    >
                        View project
                    </Link>
                </Typography>
                <ArrowUpRight aria-hidden="true" />
            </div>
        </article>
    )
}

import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Typography } from '@/components/ui/typography'
import type { WorkItem } from '@/config'
import { cn } from '@/lib/utils'

interface WorkTagsProps {
    items: ReadonlyArray<string>
    rounded?: boolean
}

function WorkTags({ items, rounded = false }: WorkTagsProps) {
    return (
        <div className="flex flex-row gap-2">
            {items.map((item) => (
                <span
                    key={item}
                    className={cn(
                        'work-pill w-fit bg-muted-foreground/40 p-2 text-xs text-white backdrop-blur-sm',
                        rounded ? 'rounded-full' : 'rounded-lg'
                    )}
                >
                    {item}
                </span>
            ))}
        </div>
    )
}

interface WorkCardProps {
    work: WorkItem
}

export function WorkCard({ work }: WorkCardProps) {
    return (
        <article className="work-card flex flex-col gap-4 rounded-2xl">
            <div className="relative aspect-video w-full overflow-hidden rounded-4xl">
                <Image
                    src={work.image}
                    alt={work.imageAlt}
                    width={work.imageWidth}
                    height={work.imageHeight}
                    className="work-image absolute size-full object-cover"
                />
                <div className="absolute top-6 left-6 flex flex-row gap-2">
                    <WorkTags items={work.types} />
                    <WorkTags items={work.services} rounded />
                </div>
            </div>

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

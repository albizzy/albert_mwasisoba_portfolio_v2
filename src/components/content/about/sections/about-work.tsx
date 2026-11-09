import { ArrowUpRight } from 'lucide-react'
import { NumberedList } from '@/components/ui/numbered-list'
import { Tag } from '@/components/ui/tag'
import { works } from '@/config'

const projects = works.map((work) => ({
    id: work.title,
    title: work.title,
    description: work.types[0],
    href: work.link,
    cursorLabel: 'Visit site',
    cursorTone: 'blue' as const,
    aside: (
        <>
            {work.types.slice(1).map((type) => (
                <Tag key={type}>{type}</Tag>
            ))}
            <ArrowUpRight aria-hidden="true" size={18} />
        </>
    ),
}))

export function AboutWork() {
    return <NumberedList items={projects} />
}

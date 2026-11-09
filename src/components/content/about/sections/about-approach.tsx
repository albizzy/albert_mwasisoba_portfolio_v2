import { NumberedList } from '@/components/ui/numbered-list'
import { workingPrinciples } from '@/config'

const principles = workingPrinciples.map((principle) => ({
    id: principle.number,
    title: principle.title,
    description: principle.description,
    meta: `↳ ${principle.annotation}`,
}))

export function AboutApproach() {
    return <NumberedList items={principles} />
}

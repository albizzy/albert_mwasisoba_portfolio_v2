import { works } from '@/config/works'
import { RotatingText } from '@/components/ui/rotating-text'
import styles from './overview.module.css'

const specialtyLabels: Record<string, string> = {
    'Frontend Engineering': 'web apps',
    'UI/UX': 'interfaces',
    'Design Systems': 'UI systems',
    'B2B SaaS': 'SaaS tools',
    'E-Commerce': 'stores',
}

const workServices = new Set(
    works.flatMap((work) => [...work.services, ...work.types])
)

const specialties = Object.entries(specialtyLabels)
    .filter(([service]) => workServices.has(service))
    .map(([, label]) => label)

const activeSpecialties =
    specialties.length >= 2
        ? specialties
        : [
              'web applications',
              'user interfaces',
              'design systems',
              'SaaS platforms',
          ]

const specialtyList = new Intl.ListFormat('en', {
    style: 'long',
    type: 'conjunction',
}).format(activeSpecialties)

const items = activeSpecialties.map((text) => ({ text }))

export function RotatingSpecialties() {
    return (
        <RotatingText
            items={items}
            className={styles.rotator}
            textClassName={styles.highlight}
            controlClassName={styles.pause}
            accessibleText={specialtyList}
            reducedText={specialtyList}
            reducedClassName={styles.reducedTerms}
            controlLabel="specialties"
            decoration={
                <>
                    <span className={styles.handleStart} />
                    <span className={styles.handleEnd} />
                </>
            }
        />
    )
}

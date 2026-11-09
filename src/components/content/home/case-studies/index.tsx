import { ArrowUpRight, ScanLine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GithubBrandIcon } from '@/components/ui/brand-icons'
import { Eyebrow } from '@/components/ui/eyebrow'
import { Tag } from '@/components/ui/tag'
import { caseStudy } from '@/config'
import { toSequenceLabel } from '@/helpers'
import { ArchitectureAccordion } from './architecture-accordion'
import styles from './case-studies.module.css'

export function CaseStudies() {
    const { notes, stack, repository, auditUrl } = caseStudy

    return (
        <section
            id="case-studies"
            aria-labelledby="case-studies-title"
            className={styles.section}
        >
            <div className={styles.dossier}>
                <div className={styles.tab}>
                    <ScanLine size={16} aria-hidden="true" />
                    Case study
                </div>
                <div className={styles.sheet}>
                    <div className={styles.context}>
                        <Eyebrow>Under the Hood</Eyebrow>
                        <h2 id="case-studies-title" tabIndex={-1}>
                            How I built
                            <br />
                            this portfolio<span className={styles.dot}>.</span>
                        </h2>
                        <p className={styles.description}>
                            Commercial client applications remain protected
                            under proprietary NDAs. This open-source repository
                            serves as a public walkthrough of my frontend
                            standards: reusable design systems, accessible
                            motion, and sub-second performance.
                        </p>
                        <ul
                            className={styles.badges}
                            aria-label="Project stack and licence"
                        >
                            {stack.map((badge) => (
                                <Tag
                                    as="li"
                                    key={badge.label}
                                    dot={badge.status}
                                >
                                    {badge.label}
                                </Tag>
                            ))}
                        </ul>
                        <div className={styles.actions}>
                            <Button
                                asChild
                                variant="editorialGreen"
                                size="pill"
                            >
                                <a
                                    href={repository}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    data-cursor-label="GitHub"
                                    data-cursor-tone="ink"
                                >
                                    <GithubBrandIcon /> View Source Code
                                    <ArrowUpRight aria-hidden="true" />
                                    <span className="sr-only">
                                        {' '}
                                        on GitHub (opens in a new tab)
                                    </span>
                                </a>
                            </Button>
                            <a
                                className={styles.auditLink}
                                href={auditUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor-label="PageSpeed"
                                data-cursor-tone="green"
                            >
                                Live Performance Audit{' '}
                                <ArrowUpRight size={16} aria-hidden="true" />
                                <span className="sr-only">
                                    {' '}
                                    in PageSpeed Insights (opens in a new tab)
                                </span>
                            </a>
                        </div>
                        <p className={styles.auditNote}>
                            Verified via Google PageSpeed Insights & Core Web
                            Vitals.
                        </p>
                    </div>
                    <div className={styles.notes}>
                        <div className={styles.notesHeader}>
                            <span>Architecture Breakdown</span>
                            <span className={styles.fileLabel}>
                                {`${toSequenceLabel(0)} — ${toSequenceLabel(notes.length - 1)}`}
                            </span>
                        </div>
                        <ArchitectureAccordion notes={notes} />
                        <div className={styles.notesFooter}>
                            <span aria-hidden="true">↳</span> Direct links to
                            production code samples.
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

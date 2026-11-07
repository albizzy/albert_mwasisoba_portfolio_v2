import { works } from '@/config'
import styles from '../about.module.css'

export function AboutWork() {
    return (
        <div className={styles.panel}>
            <ul className={styles.workList}>
                {works.map((work) => (
                    <li key={work.title}>
                        <a
                            className={styles.workLink}
                            data-cursor-label="Visit site"
                            data-cursor-tone="blue"
                            href={work.link}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span className={styles.workName}>
                                {work.title}
                            </span>
                            <span className={styles.workRole}>
                                {work.types[0]}
                            </span>
                            <span className={styles.workTag}>
                                {work.types[1]}{' '}
                                <span aria-hidden="true">↗</span>
                            </span>
                            <span className="sr-only">
                                {' '}
                                (opens in a new tab)
                            </span>
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

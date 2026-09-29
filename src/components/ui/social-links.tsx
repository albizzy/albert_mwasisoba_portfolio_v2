import Link from 'next/link'
import { GithubBrandIcon, LinkedinBrandIcon } from './brand-icons'
import styles from './social-links.module.css'

type SocialLinksProps = {
    className?: string
}

export function SocialLinks({ className }: SocialLinksProps) {
    return (
        <div className={className} role="group" aria-label="Social profiles">
            <Link
                href="https://github.com/albizzy"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub profile (opens in a new tab)"
            >
                <GithubBrandIcon />
            </Link>
            <Link
                href="https://www.linkedin.com/in/albertmwasisoba"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn profile (opens in a new tab)"
            >
                <LinkedinBrandIcon />
            </Link>
        </div>
    )
}

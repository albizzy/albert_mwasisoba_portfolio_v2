import Link from 'next/link'
import { socialProfiles, type SocialProfile } from '@/config'
import { brandIcons } from './brand-icons'
import styles from './social-links.module.css'

type SocialLinksProps = {
    className?: string
    profiles?: ReadonlyArray<SocialProfile>
}

export function SocialLinks({
    className,
    profiles = socialProfiles,
}: SocialLinksProps) {
    return (
        <div className={className} role="group" aria-label="Social profiles">
            {profiles.map(({ label, href, icon }) => {
                const Icon = brandIcons[icon]

                return (
                    <Link
                        key={href}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.socialLink}
                        aria-label={`${label} profile (opens in a new tab)`}
                    >
                        <Icon />
                    </Link>
                )
            })}
        </div>
    )
}

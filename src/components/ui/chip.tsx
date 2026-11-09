import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'
import styles from './chip.module.css'

type ChipProps = ComponentPropsWithoutRef<'button'> & { active?: boolean }

/**
 * Pill-shaped toggle for filters and in-page navigation. The consumer sets
 * the matching ARIA state (aria-pressed, aria-current).
 */
export function Chip({
    active = false,
    className,
    type = 'button',
    ...props
}: ChipProps) {
    return (
        <button
            type={type}
            className={cn(styles.chip, className)}
            data-active={active}
            {...props}
        />
    )
}

type ChipLabelProps = ComponentPropsWithoutRef<'span'> & { active?: boolean }

/** A chip that only shows state, such as the current step of a flow. */
export function ChipLabel({
    active = false,
    className,
    ...props
}: ChipLabelProps) {
    return (
        <span
            className={cn(styles.chip, className)}
            data-active={active}
            {...props}
        />
    )
}

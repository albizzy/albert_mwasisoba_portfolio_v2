import { type ChangeEvent, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'
import styles from '@/styles/correspondence.module.css'

type Props = {
    label: string
    error?: string
    multiline?: boolean
    onChange?: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
} & Omit<ComponentProps<'input'>, 'onChange'> &
    Pick<ComponentProps<'textarea'>, 'rows'>

export function FormField({
    label,
    error,
    multiline,
    id,
    className,
    rows = 5,
    ...props
}: Props) {
    const shared = {
        id,
        name: props.name,
        value: props.value,
        required: props.required,
        disabled: props.disabled,
        minLength: props.minLength,
        maxLength: props.maxLength,
        placeholder: props.placeholder,
        'aria-invalid': Boolean(error),
        'aria-describedby': error ? `${id}-error` : undefined,
        className: cn(styles.input, className),
    }
    return (
        <div className={styles.field}>
            <label htmlFor={id} className={styles.fieldLabel}>
                {label}
            </label>
            {multiline ? (
                <textarea
                    {...shared}
                    rows={rows}
                    onChange={props.onChange}
                    className={cn(shared.className, styles.textarea)}
                />
            ) : (
                <input {...props} {...shared} />
            )}
            {error && (
                <p id={`${id}-error`} className={styles.fieldError}>
                    {error}
                </p>
            )}
        </div>
    )
}

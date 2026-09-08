import { type ChangeEvent, type ComponentProps } from 'react'
import { cn } from '@/lib/utils'

const inputClass =
    'w-full rounded-t-lg border-0 border-b border-border bg-muted px-3 py-4 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-foreground focus-visible:ring-0 disabled:opacity-60 md:text-lg'

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
        className: cn(inputClass, error && 'border-destructive', className),
    }
    return (
        <div className="flex min-w-0 flex-col gap-2">
            <label htmlFor={id} className="text-md text-muted-foreground">
                {label}
            </label>
            {multiline ? (
                <textarea
                    {...shared}
                    rows={rows}
                    onChange={props.onChange}
                    className={cn(shared.className, 'resize-y')}
                />
            ) : (
                <input {...props} {...shared} />
            )}
            {error && (
                <p id={`${id}-error`} className="text-sm text-destructive">
                    {error}
                </p>
            )}
        </div>
    )
}

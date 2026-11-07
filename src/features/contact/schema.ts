export const contactLimits = { name: 80, email: 254, message: 5000 } as const

const MESSAGE_MIN_LENGTH = 10

/** Returns true when a trimmed, normalized value is acceptable. */
export type ContactRule = (value: string) => boolean

export const contactRules = {
    singleLine: (value: string) => !/[\r\n\x00-\x1f]/.test(value),
    noNullBytes: (value: string) => !value.includes('\0'),
    email: (value: string) => isEmail(value),
} satisfies Record<string, ContactRule>

export interface ContactFieldDefinition<Name extends string = string> {
    name: Name
    label: string
    placeholder: string
    type?: 'email'
    autoComplete?: string
    multiline?: boolean
    fullWidth?: boolean
    required: boolean
    minLength?: number
    maxLength: number
    /** Applied after trimming, before validation. */
    normalize?: (value: string) => string
    /** Checks beyond `required`, `minLength` and `maxLength`. */
    rules?: ReadonlyArray<ContactRule>
    error: string
}

// One definition drives the rendered field, its HTML constraints and the
// server-side validation. Add a field by adding an entry.
const fieldDefinitions = [
    {
        name: 'name',
        label: 'Name',
        placeholder: 'Your name',
        autoComplete: 'name',
        required: true,
        maxLength: contactLimits.name,
        rules: [contactRules.singleLine],
        error: `Please enter your name (up to ${contactLimits.name} characters).`,
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'you@company.com',
        type: 'email',
        autoComplete: 'email',
        required: true,
        maxLength: contactLimits.email,
        normalize: (value: string) => value.toLowerCase(),
        rules: [contactRules.email],
        error: 'Please enter a valid email address.',
    },
    {
        name: 'message',
        label: 'Message',
        placeholder: 'What are you working on, and how can I help?',
        multiline: true,
        fullWidth: true,
        required: true,
        minLength: MESSAGE_MIN_LENGTH,
        maxLength: contactLimits.message,
        rules: [contactRules.noNullBytes],
        error: `Please write between ${MESSAGE_MIN_LENGTH} and ${contactLimits.message.toLocaleString('en-US')} characters.`,
    },
] as const satisfies ReadonlyArray<ContactFieldDefinition>

export type ContactField = (typeof fieldDefinitions)[number]['name']
export type ContactValues = Record<ContactField, string>
export type FormState = {
    status: 'idle' | 'error' | 'success'
    message: string
    errors?: Partial<Record<ContactField, string>>
    values?: ContactValues
}

export const contactFields: ReadonlyArray<
    ContactFieldDefinition<ContactField>
> = fieldDefinitions

export const initialFormState: FormState = { status: 'idle', message: '' }

export const emptyContactValues = Object.fromEntries(
    contactFields.map(({ name }) => [name, ''])
) as ContactValues

export function isEmail(value: string) {
    return (
        value.length <= contactLimits.email &&
        /^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/.test(value)
    )
}

function isValidField(field: ContactFieldDefinition, value: string) {
    if (field.required && !value) return false
    if (field.minLength !== undefined && value.length < field.minLength)
        return false
    if (value.length > field.maxLength) return false
    return (field.rules ?? []).every((rule) => rule(value))
}

export function validateContact(form: FormData) {
    const values: ContactValues = { ...emptyContactValues }
    const errors: NonNullable<FormState['errors']> = {}
    for (const field of contactFields) {
        const entry = form.get(field.name)
        const trimmed = typeof entry === 'string' ? entry.trim() : ''
        const value = field.normalize ? field.normalize(trimmed) : trimmed
        values[field.name] = value
        if (!isValidField(field, value)) errors[field.name] = field.error
    }
    return { values, errors, valid: Object.keys(errors).length === 0 }
}

export function readSubmission(form: FormData) {
    const id = form.get('submissionId')
    const createdAt = Number(form.get('createdAt'))
    if (
        typeof id !== 'string' ||
        !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
            id
        ) ||
        !Number.isSafeInteger(createdAt) ||
        createdAt > Date.now() + 60_000 ||
        createdAt < Date.now() - 23 * 60 * 60 * 1000
    )
        return null
    return { id, createdAt }
}

export const contactLimits = { name: 80, email: 254, message: 5000 } as const

export type ContactValues = { name: string; email: string; message: string }
export type ContactField = keyof ContactValues
export type FormState = {
    status: 'idle' | 'error' | 'success'
    message: string
    errors?: Partial<Record<ContactField, string>>
    values?: ContactValues
}

export const initialFormState: FormState = { status: 'idle', message: '' }

export function isEmail(value: string) {
    return (
        value.length <= contactLimits.email &&
        /^[^\s<>@,;\r\n]+@[^\s<>@,;\r\n]+\.[^\s<>@,;\r\n]+$/.test(value)
    )
}

export function validateContact(form: FormData) {
    const read = (key: string) => {
        const value = form.get(key)
        return typeof value === 'string' ? value.trim() : ''
    }
    const values: ContactValues = {
        name: read('name'),
        email: read('email').toLowerCase(),
        message: read('message'),
    }
    const errors: FormState['errors'] = {}
    if (
        !values.name ||
        values.name.length > contactLimits.name ||
        /[\r\n\x00-\x1f]/.test(values.name)
    ) {
        errors.name = 'Please enter your name (up to 80 characters).'
    }
    if (!isEmail(values.email))
        errors.email = 'Please enter a valid email address.'
    if (
        values.message.length < 10 ||
        values.message.length > contactLimits.message ||
        values.message.includes('\0')
    ) {
        errors.message = 'Please write between 10 and 5,000 characters.'
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

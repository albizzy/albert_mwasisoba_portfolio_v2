import 'server-only'
import type { MeetingType } from './types'

function eventPath(value: string | undefined) {
    const path = value?.trim() || ''
    // Public Cal.com username/event-slug only; never arbitrary embed URLs.
    return /^[a-z0-9_-]+\/[a-z0-9_-]+$/i.test(path) ? path : null
}

export function getMeetingTypes(): MeetingType[] {
    return [
        {
            id: 'intro',
            title: 'Intro',
            duration: '30 min',
            description:
                'A first conversation about your idea and how we could work together.',
            calLink: eventPath(process.env.CAL_COM_INTRO_PATH),
        },
        {
            id: 'working-session',
            title: 'Working session',
            duration: '60 min',
            description:
                'Bring a specific challenge. We’ll explore it and map out the next steps.',
            calLink: eventPath(process.env.CAL_COM_WORKING_SESSION_PATH),
        },
    ]
}

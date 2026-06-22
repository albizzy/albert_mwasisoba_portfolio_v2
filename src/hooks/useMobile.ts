import { useEffect, useState } from 'react'

export const useMobile = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`)

        const handleMediaChange = () => {
            setIsMobile(mediaQuery.matches)
        }

        handleMediaChange()

        mediaQuery.addEventListener('change', handleMediaChange)

        return () => {
            mediaQuery.removeEventListener('change', handleMediaChange)
        }
    }, [breakpoint])

    return isMobile
}

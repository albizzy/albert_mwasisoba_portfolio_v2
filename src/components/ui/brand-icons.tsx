import type { SVGProps } from 'react'

type BrandIconProps = SVGProps<SVGSVGElement>

// GitHub mark: Primer Octicons (MIT). See THIRD_PARTY_NOTICES.md.
export function GithubBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M10.226 17.284c-2.965-.36-5.054-2.493-5.054-5.256 0-1.123.404-2.336 1.078-3.144-.292-.741-.247-2.314.09-2.965.898-.112 2.111.36 2.83 1.01.853-.269 1.752-.404 2.853-.404 1.1 0 1.999.135 2.807.382.696-.629 1.932-1.1 2.83-.988.315.606.36 2.179.067 2.942.72.854 1.101 2 1.101 3.167 0 2.763-2.089 4.852-5.098 5.234.763.494 1.28 1.572 1.28 2.807v2.336c0 .674.561 1.056 1.235.786 4.066-1.55 7.255-5.615 7.255-10.646C23.5 6.188 18.334 1 11.978 1 5.62 1 .5 6.188.5 12.545c0 4.986 3.167 9.12 7.435 10.669.606.225 1.19-.18 1.19-.786V20.63a2.9 2.9 0 0 1-1.078.224c-1.483 0-2.359-.808-2.987-2.313-.247-.607-.517-.966-1.034-1.033-.27-.023-.359-.135-.359-.27 0-.27.45-.471.898-.471.652 0 1.213.404 1.797 1.235.45.651.921.943 1.483.943.561 0 .92-.202 1.437-.719.382-.381.674-.718.944-.943" />
        </svg>
    )
}

// LinkedIn [in] mark: Font Awesome Free Brands 6.7.2 (CC BY 4.0).
// See THIRD_PARTY_NOTICES.md. The path data is unchanged.
export function LinkedinBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 448 512"
            fill="white"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
        </svg>
    )
}

export function NextjsBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c2.04 0 3.938-.611 5.518-1.66L9.64 9.923v6.827H8.15V7.25h1.812l8.674 11.45A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10Zm3.85 11.5h-1.5V7.25h1.5v6.25Z" />
        </svg>
    )
}

export function TailwindCssBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8Zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12Z" />
        </svg>
    )
}

export function TypescriptBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M3 3h18v18H3V3Zm10.71 14.86v-6.71h2.29V9.5H9.64v1.65h2.29v6.71h1.78Zm5.43-1.69c0-.89-.52-1.45-1.91-1.99-1.02-.4-1.36-.66-1.36-1.15 0-.42.34-.73.96-.73.6 0 1.07.22 1.45.55l.89-1.16c-.57-.49-1.36-.79-2.31-.79-1.56 0-2.63.89-2.63 2.22 0 1.04.61 1.62 2.02 2.16.95.37 1.25.66 1.25 1.17 0 .5-.44.83-1.13.83-.77 0-1.39-.31-1.84-.74l-.93 1.16c.57.6 1.55.99 2.75.99 1.72 0 2.79-.89 2.79-2.52Z" />
        </svg>
    )
}

export function FigmaBrandIcon(props: BrandIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            focusable="false"
            {...props}
        >
            <path d="M8.5 2A3.5 3.5 0 0 0 5 5.5c0 1.306.716 2.445 1.775 3.048A3.496 3.496 0 0 0 5 11.5c0 1.306.716 2.445 1.775 3.048A3.496 3.496 0 0 0 5 17.5 3.5 3.5 0 1 0 12 17.5V9h3.5a3.5 3.5 0 1 0 0-7h-7Zm3.5 2h3.5a1.5 1.5 0 0 1 0 3H12V4Zm-2 0v3H8.5a1.5 1.5 0 0 1 0-3H10Zm0 5v3H8.5a1.5 1.5 0 0 1 0-3H10Zm0 5v3.5a1.5 1.5 0 1 1-1.5-1.5H10v-2Zm5.5-3a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm0 2a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
        </svg>
    )
}

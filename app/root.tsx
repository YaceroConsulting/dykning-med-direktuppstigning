import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from '@remix-run/react'
import type { LinksFunction } from '@remix-run/node'
import stylesheet from '~/tailwind.css?url'
import { Header } from '~/components/header'
import { Footer } from '~/components/footer'

export const links: LinksFunction = () => [
    { rel: 'stylesheet', href: stylesheet },
]

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="sv" className="h-full">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/dykupp/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/dykupp/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/dykupp/favicon-16x16.png"
                />
                <link rel="manifest" href="/dykupp/site.webmanifest" />
                <Meta />
                <Links />
            </head>
            <body className="h-full">
                <Header />
                {children}
                <Footer />
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    )
}

export default function App() {
    return <Outlet />
}

export function HydrateFallback() {
    return (
        <div className="py-16 p-10">
            <p className="text-gray-600 italic">Laddar innehåll...</p>
        </div>
    )
}

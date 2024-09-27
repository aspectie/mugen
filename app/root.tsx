import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData
} from '@remix-run/react'
import { useChangeLanguage } from 'remix-i18next/react'
import { LoaderFunctionArgs } from '@remix-run/node'
import { useTranslation } from 'react-i18next'

import i18next from '@/.server/i18n'

import { ThemeProvider, useTheme } from '@/hooks/useTheme'

import '@/styles/main.scss'

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request)
  return json({ locale })
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['default']
}

function App() {
  const [theme] = useTheme()
  const { locale } = useLoaderData<typeof loader>()

  const { i18n } = useTranslation()

  useChangeLanguage(locale)
  return (
    <html
      lang={locale}
      dir={i18n.dir()}
      className={theme ?? ''}
    >
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Links />
        <Scripts />
      </body>
    </html>
  )
}

export default function AppWithProviders() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  )
}

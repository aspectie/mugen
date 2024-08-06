import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData
} from '@remix-run/react'
import '@/styles/main.scss'
import { useChangeLanguage } from 'remix-i18next/react'
import { useTranslation } from 'react-i18next'
import i18next from '@/.server/i18n'
import { LoaderFunctionArgs } from '@remix-run/node'
import Header from '@/components/header/Header'
import Footer from '@/components/footer/Footer'
import BaseLayout from '@/views/BaseLayout'
import { useTheme } from '@/context/ThemeContext'
import classNames from 'classnames'

export async function loader({ request }: LoaderFunctionArgs) {
  const locale = await i18next.getLocale(request)
  return json({ locale })
}

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  i18n: ['default']
}

export default function App() {
  const { locale } = useLoaderData<typeof loader>()
  const { i18n } = useTranslation()
  const { theme } = useTheme()
  const bodyClasses = classNames('page', theme, 'dark:bg-black-100')

  useChangeLanguage(locale)

  return (
    <html
      lang={locale}
      dir={i18n.dir()}
    >
      <head>
        <title>Document</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
      </head>
      <body className={bodyClasses}>
        <Header />
        <BaseLayout />
        <Footer />
        <ScrollRestoration />
        <Links />
        <Scripts />
      </body>
    </html>
  )
}

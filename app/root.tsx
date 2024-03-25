import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration
} from '@remix-run/react'
import Header from '@/components/header/Header'
import '@/styles/main.scss';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
      </head>
      <body>
      <Header className='container'/>
      {children}
      <ScrollRestoration/>
      <Scripts/>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet/>
}

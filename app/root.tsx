import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData
} from '@remix-run/react'
import { json } from "@remix-run/node";
import Header from '@/components/header/Header'
import '@/styles/main.scss';

declare global {
  interface Window {
    ENV: Record<string, string>;
  }
}

export async function loader() {
  return json({
    ENV: {
      SHIKI_URL: process.env.SHIKI_URL
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <Meta />
        <Links />
      </head>
      <body>
      <Header/>
      {children}
      <ScrollRestoration/>
      <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(
                data.ENV
            )}`,
          }}
      />
      <Scripts/>
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet/>
}

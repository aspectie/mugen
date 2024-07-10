import {
  type ErrorResponse,
  isRouteErrorResponse,
  useRouteError
} from '@remix-run/react'
import NotFound from './NotFound'

export const meta = ({ error }: { error: ErrorResponse }) => {
  if (error) {
    return [
      ...(error.status === 404 ? [{ title: 'Page Not Found' }] : []),
      { name: 'robots', content: 'noindex, nofollow' }
    ]
  }
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <NotFound />
    }
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    )
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    )
  }
  return <h1>Unknown Error</h1>
}

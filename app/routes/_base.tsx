import { type ErrorResponse, Outlet, isRouteErrorResponse, useRouteError } from '@remix-run/react';
import NotFound from "./NotFound";
import Header from "@/components/header/Header";

export const meta = ({ error }: {
  error: ErrorResponse
}) => {
  if (error) {
    return [
      ...((error).status === 404 ? [{ title: 'Page Not Found' }] : []),
      { name: 'robots', content: 'noindex, nofollow' },
    ];
  }
};

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
      if (error.status === 404) {
          return <NotFound />;
      }

      throw new Error(`${error.status} ${error.statusText}`);
  }

  throw new Error(error instanceof Error ? error.message : 'Unknown Error');
}
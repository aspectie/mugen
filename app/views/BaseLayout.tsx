import { Outlet } from '@remix-run/react'

export default function BaseLayout() {
  return (
    <>
      <main className="container py-s sm:py-m md:py-l lg:py-xl text-black-100 min-h-[100vh]">
        <Outlet />
      </main>
    </>
  )
}

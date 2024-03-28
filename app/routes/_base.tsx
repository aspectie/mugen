import Header from "@/components/header/Header";
import { Outlet } from "@remix-run/react";

export default function BaseLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}
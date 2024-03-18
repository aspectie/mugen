import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: 'Mugen' },
    { name: 'description', content: 'The best anime project' }
  ]
}

export default function Index() {
  return (
    <div>
      <h1>Home page</h1>
    </div>
  )
}

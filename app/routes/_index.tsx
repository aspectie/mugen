import type { MetaFunction } from "@remix-run/node";
import CardList from "@/components/card/CardList";

export const meta: MetaFunction = () => {
  return [
    { title: 'Mugen' },
    { name: 'description', content: 'The best anime project' }
  ]
}

export default function Index() {
  return (
    <div style={{maxInlineSize: '1296px', margin: 'auto', paddingInline: '24px', display: 'grid', gridTemplateColumns: "948px 300px", gridColumnGap: "24px"}}>
      <h1>Home page</h1>
      <CardList />
    </div>
  )
}

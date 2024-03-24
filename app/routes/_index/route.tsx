import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAnime } from "../anime/anime.server";
import CardList from "@/components/card/CardList";

export const meta: MetaFunction = () => {
  return [
    { title: 'Mugen' },
    { name: 'description', content: 'The best anime project' }
  ]
}

export const loader = async () => {
  const data = await getAnime();

  return json(data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div style={{maxInlineSize: '1296px', margin: 'auto', paddingInline: '24px', display: 'grid', gridTemplateColumns: "948px 300px", gridColumnGap: "24px"}}>
      <h1>Home page</h1>
      <CardList cards={data}/>
    </div>
  )
}

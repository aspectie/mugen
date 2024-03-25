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
  const data = await getAnime({
    limit: 5,
    order: 'ranked'
  });

  return json(data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto">
      <h1>Home page</h1>
      <div className="grid grid-cols-12">
        <div className="col-span-8 bg-neutral-800 p-4">
          <CardList cards={data} className="grid grid-cols-5 gap-x-4"/>
        </div>
      </div>
    </div>
  )
}

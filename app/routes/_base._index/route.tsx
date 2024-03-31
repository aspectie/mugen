import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAnime } from "../anime/anime.server";
import CardList from "@/components/card/CardList";
import { prepareCardData } from "@/utils/card";
import { TAnime } from "@/types/api/shiki/TAnime";

export const meta: MetaFunction = () => {
  return [
    { title: 'Mugen - Главная' },
    { name: 'description', content: 'The best anime project' }
  ]
}

export const loader = async () => {
  let data = await getAnime({
    limit: 5,
    order: 'random',
    score: 8
  });

  if (!data) {
    return null;
  }
  
  return json(data);
};

export default function Index() {
  const data = useLoaderData<typeof loader>() as TAnime[] | null;

  return (
    <div className="container mx-auto text-black-100">
      <div className="grid grid-cols-12 pt-xl">
        {data && 
          <div className="col-span-8">
            <div className="mb-l">
              <h2 className="font-bold mb-l">Зимний сезон</h2>
              <div className="p-m bg-black-100 border border-black-20">
                <CardList cards={prepareCardData(data)} className="columns-5 text-white"/>
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-l">Популярное</h2>
              <div className="col-span-8 p-m">
                <CardList cards={prepareCardData(data)} className="columns-5"/>
              </div>
            </div>
          </div> 
        }    
      </div>
    </div>
  )
}

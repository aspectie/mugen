import { json, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAnime } from "../anime/anime.server";
import CardList from "@/components/card/CardList";
import Select from "@/ui/select/Select";


export const meta: MetaFunction = () => {
  return [
    { title: 'Mugen - Главная' },
    { name: 'description', content: 'The best anime project' }
  ]
}

export const loader = async () => {
  const seasonData = await getAnime({
    limit: 5,
    order: 'random',
    score: 8
  });

  return json(seasonData);
};

const genre = [
  {label: "Ужасы", value: 'опция 1'},
  {label: "Триллер", value: 'опция 1'},
  {label: "Сёнен", value: 'опция 1'},
  {label: "Сейнен", value: 'опция 1'},
  {label: "Приключения", value: 'опция 1'},
  {label: "Драки", value: 'опция 1'},
]

const type = [
  {label: "ТВ-Сериал", value: 'опция 1'},
  {label: "OVA", value: 'опция 1'},
  {label: "ONA", value: 'опция 1'},
  {label: "Фильм", value: 'опция 1'},
]

const year = [
  {label: "10-е", value: 'опция 1'},
  {label: "20-е", value: 'опция 1'}
]

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto text-black-100">
      <div className="grid grid-cols-12">
        <h2 className="font-bold text-l row-start-1 col-span-4 mt-xl">Зимний сезон</h2>
        <div className="col-span-8 p-m row-start-2 bg-black-100 border border-black-20 mt-s">
          <CardList cards={data} className="columns-5 text-white"/>
        </div>
        <h2 className="font-bold text-l row-start-3 col-span-4 mt-m">Популярное</h2>
        <div className="col-span-8 p-m row-start-4 mt-s">
          <CardList cards={data} className="columns-5"/>
        </div>
        <div className="col-start-10 col-end-13 row-start-2 row-end-5 bg-gray-300 flex justify-between">
          <Select placeholder={'Жанр'} options={genre} withCheckBox={true}/>
          <Select placeholder={'Тип'} options={type}/>
          <Select placeholder={'Год Выхода'} options={year}/>
        </div>
      </div>
    </div>
  )
}

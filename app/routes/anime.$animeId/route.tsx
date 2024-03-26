import {useLoaderData} from "@remix-run/react";
import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { getAnime } from "../anime/anime.server";
import Button from "@/ui/button/button";
import {clearHTML} from "@/utils/utils";
import star from "@/assets/icons/star.svg";



export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data = {}

    data.rawData = await getAnime(params.animeId);
    data.rawData.description_html = clearHTML(data.rawData.description_html)
    const screenShots = await getAnime(`${params.animeId}/screenshots`);
    data.screenshots = screenShots.slice(0, 5).map((item) => `${import.meta.env.VITE_SHIKI_URL}${item.original}`);
    data.imageUrl = `${import.meta.env.VITE_SHIKI_URL}${data.rawData.image?.original}`;
    data.info = [
        {
            title: "тип",
            value: data.rawData.kind
        },
        {
            title: 'эпизоды',
            value: data.rawData.episodes
        },
        {
           title: 'дата выхода',
           value: data.rawData.aired_on
        },
        {
            title: 'cтатус',
            value: data.rawData.status
        },
        {
            title: 'жанры',
            value: data.rawData.genres.reduce((acc, el) =>  acc + el.russian + ' ', '')
        },
        {
            title: 'рейтинг',
            value: data.rawData.rating
        },
        {
            title: 'студия',
            value: data.rawData.studios.reduce((acc, el) =>  acc + el.name + ' ', '')
        }
    ]

    return json(data);
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `${data.rawData.russian} - Аниме` },
        { name: 'description', content: 'The best anime project' }
    ]
}

export default function AnimePage() {
    const anime = useLoaderData<typeof loader>();
    return (
        anime &&
        <div className="container mx-auto mt-xl grid grid-cols-12 mb-4xl">
            <div className="col-start-1 col-end-3">
                <div className="rounded-s">
                    <img className="rounded block w-full object-center object-cover" src={anime.imageUrl} alt={`Постер аниме ${anime.rawData.russian}`}/>
                </div>
                <div className="mt-m">
                    <div className="flex flex-col gap-s">
                        <Button text={'Добавить в список'} style={{width: "100%"}} size={"small"}/>
                        <Button text={'Оставить отзыв'} style={{width: "100%"}} size={"small"}/>
                        <Button text={'В избранное'} style={{width: "100%"}} size={"small"}/>
                    </div>
                    <div className="flex gap-s justify-center p-l">
                        <span><img src={star} alt=""/></span>
                        <span><img src={star} alt=""/></span>
                        <span><img src={star} alt=""/></span>
                        <span><img src={star} alt=""/></span>
                        <span><img src={star} alt=""/></span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-between col-start-3 col-end-10 px-l">
                <div>
                    <div className="flex flex-wrap items-start justify-between">
                        <h1 className="w-5/6 text-2xl font-bold">{anime.rawData.russian}</h1>
                        <div className="flex h-fit items-center mt-xs">
                            <img className="w-xl h-xl" src={star} alt=""/>
                            <span className="text-2xl font-bold ml-s">{anime.rawData.score}</span>
                        </div>
                    </div>
                    <h2 className="text-s px-xs mt-xs">{anime.rawData.name}</h2>
                    <div className="w-1/6 mt-m">
                        <Button text={'Смотреть'} style={{width: "100%"}} size={"medium"}/>
                    </div>
                </div>
                <div className="about mt-l w-4/5 text-xs">
                    <h3 className="text-m font-bold">Информация</h3>
                    <ul className="about-list mt-m flex flex-col gap-s"> {
                         anime.info.map((el, index) => {
                            return (
                                <li key={index} className="flex">
                                    <span className="w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize">{el.title}</span>
                                    <span className="w-full mr-xs bg-gray-100 py-xs px-s capitalize">{el.value}</span>
                                </li>
                         )})}
                    </ul>
                </div>

            </div>
            <div className="mt-l col-span-9">
                <h3 className="text-m font-bold">Описание</h3>
                <p className="mt-m">{anime.rawData.description_html}</p>
            </div>
            <div className="mt-l col-start-1 col-end-10">
                <h3 className="font-bold text-m">Кадры</h3>
                <div className="flex mt-m">{
                    anime.screenshots.map((item) => (
                        <div className="w-3/6 pr-s h-min" key={item}>
                            <img className={"object-cover object-center"} src={item} alt={`Кадр из ${anime.rawData.russian}`}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
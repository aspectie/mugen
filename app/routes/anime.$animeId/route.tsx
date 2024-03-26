import {useLoaderData} from "@remix-run/react";
import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { getAnime } from "../anime/anime.server";
import Button from "@/ui/button/button";
import {clearHTML} from "@/utils/utils";
import star from "@/assets/icons/star.svg";



export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data = {
        info: {},
        screenshots: {},
        videos: {}
    }

    data.info = await getAnime(params.animeId);
    data.screenshots = await getAnime(`${params.animeId}/screenshots`);
    return json(data);
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `${data.info.russian} - Аниме` },
        { name: 'description', content: 'The best anime project' }
    ]
}

export default function AnimePage() {
    const anime = useLoaderData<typeof loader>();

    const imageUrl = `${import.meta.env.VITE_SHIKI_URL}/${anime.info.image?.original}`;




    return (
        anime &&
        <div className="container mx-auto mt-xl grid grid-cols-12 mb-4xl">
            <div className={"col-start-1 col-end-3"}>
                <div className={"rounded-s"}>
                    <img className={"rounded block w-full object-center object-cover"} src={imageUrl} alt={`Постер аниме ${anime.info.russian}`}/>
                </div>
                <div className={"mt-m"}>
                    <div className={"flex flex-col gap-s"}>
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
            <div className={"flex flex-col justify-between col-start-3 col-end-10 px-l"}>
                <div className={""}>
                    <div className={"flex flex-wrap items-start justify-between"}>
                        <h1 className={"w-5/6 font-bold text-2xl"}>{anime.info.russian}</h1>
                        <div className="flex h-fit items-center mt-xs">
                            <img style={{width: "32px", height: "32px"}} src={star} alt=""/>
                            <span className="text-2xl font-bold ml-s">{anime.info.score}</span>
                        </div>
                    </div>
                    <h2 className="text-s px-xs mt-xs">{anime.info.name}</h2>
                    <div className="w-1/6 mt-m">
                        <Button text={'Смотреть'} style={{width: "100%"}} size={"medium"}/>
                    </div>
                </div>
                <div className="about mt-l w-3/5 text-xs">
                    <h3 className="text-m font-bold">Информация</h3>
                    <ul className="about-list mt-m flex
                    flex-col gap-s">
                        <li className={"flex"}>
                            <span className={`w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize`}>Тип:</span>
                            <span className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{anime.info.kind}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Эпизоды:</span>
                            <span
                                className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{`${anime.info.episodes} из ${anime.info.episodes}`}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Дата выхода:</span>
                            <span className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{anime.info.aired_on}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Статус:</span>
                            <span className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{anime.info.status}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Жанры:</span>
                            <span
                                className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{
                                    anime.info.genres.map((el) => {
                                    return `${el.russian} `
                            })}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Рейтинг:</span>
                            <span className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{anime.info.rating}</span>
                        </li>
                        <li className={"flex"}>
                            <span className={"w-2/6 mr-xs bg-gray-100 py-xs px-s capitalize"}>Студия:</span>
                            <span
                                className={"w-full mr-xs bg-gray-100 py-xs px-s capitalize"}>{
                                anime.info.studios.map((el) => {
                                    return `${el.name} `
                                })}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="mt-l col-span-9">
                <h3 className="text-m font-bold">Описание</h3>
                <p className="mt-m">{clearHTML(anime.info.description_html)}</p>
            </div>
            <div className="mt-l col-start-1 col-end-10">
                <h3 className="font-bold text-m">Кадры</h3>
                <div className={"flex mt-m"}>
                    {anime.screenshots.slice(0, 5).map((item, index) => (
                        <div className="w-3/6 pr-s h-min" key={index}>
                            <img className={"object-cover object-center"} src={`${import.meta.env.VITE_SHIKI_URL}${item.original}`}
                                 alt={`Screenshot ${index}`}/>
                        </div>
                            ))}
                        </div>
                    </div>
            </div>
    )
}
import {useLoaderData} from "@remix-run/react";
import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { getAnime } from "../anime/anime.server";
import Button from "@/ui/button/button";
import star from "@/assets/icons/star.svg";
import style from "@/routes/anime/anime.module.scss";
import {useEffect, useState} from "react";


export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data = await getAnime(params.animeId);
    return json(data);
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `${data.russian} - Аниме` },
        { name: 'description', content: 'The best anime project' }
    ]
}

export default function AnimePage() {
    const animeData = useLoaderData<typeof loader>();

    const imageUrl = `${import.meta.env.VITE_SHIKI_URL}/${animeData.image?.original}`;

    const [screenshots, setScreenshots] = useState(null);
    useEffect(() => {
        const fetchSreens = async () => {
            const response = await fetch(`https://shikimori.one/api/animes/${animeData.id}/screenshots`);
            const data = await response.json();
            setScreenshots(data);
        }
        fetchSreens();
    }, []);
    console.log(animeData)

    function clearHTML(text) {
        return text.replace(/<[^>]+>/g, '');
    }


    return (
        animeData && screenshots &&
        <div className="container mx-auto mt-xl grid grid-cols-12">
            <div className={style["left-col"]}>
                <div className={style["poster__wrapper"]}>
                    <img className={style["poster__img"]} src={imageUrl} alt={`Постер аниме ${animeData.russian}`}/>
                </div>
                <div className={style["review-block"]}>
                    <div className={style["review-block__panel"]}>
                        <Button text={'Добавить в список'} style={{width: "100%"}} size={"small"}/>
                        <Button text={'Оставить отзыв'} style={{width: "100%"}} size={"small"}/>
                        <Button text={'В избранное'} style={{width: "100%"}} size={"small"}/>
                    </div>
                {/*TODO: undone function scoring*/}
                {/*    <div className="flex gap-s justify-center p-l">*/}
                {/*    <span><img src={star} alt=""/></span>*/}
                {/*    <span><img src={star} alt=""/></span>*/}
                {/*    <span><img src={star} alt=""/></span>*/}
                {/*    <span><img src={star} alt=""/></span>*/}
                {/*    <span><img src={star} alt=""/></span>*/}
                {/*</div>*/}
                </div>
            </div>
            <div className={style["center-col"]}>
                <div className={style["title"]}>
                    <div className={style["title__master"]}>
                        <h1 className={`w-5/6 ${style["title__heading"]}`}>{animeData.russian}</h1>
                        <div className="flex h-fit items-center mt-xs">
                            <img style={{width: "32px", height: "32px"}} src={star} alt=""/>
                            <span className="text-2xl font-bold ml-s">{animeData.score}</span>
                        </div>
                    </div>
                    <h2 className="text-s px-xs mt-xs">{animeData.name}</h2>
                    <div className="w-1/6 mt-m">
                        <Button text={'Смотреть'} style={{width: "100%"}} size={"medium"}/>
                    </div>
                </div>
                <div className="about mt-l w-5/6 text-xs">
                    <h3 className="text-m font-bold">Информация</h3>
                    <ul className="about-list mt-m flex
                    flex-col gap-s">
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Тип:</span>
                            <span className={`w-full ${style["about-list__item-value"]}`}>{animeData.kind}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Эпизоды:</span>
                            <span
                                className={`w-full ${style["about-list__item-value"]}`}>{`${animeData.episodes} из ${animeData.episodes}`}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Дата выхода:</span>
                            <span className={`w-full ${style["about-list__item-value"]}`}>{animeData.aired_on}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Статус:</span>
                            <span className={`w-full ${style["about-list__item-value"]}`}>{animeData.status}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Жанры:</span>
                            <span
                                className={`w-full ${style["about-list__item-value"]}`}>{
                                    animeData.genres.map((el) => {
                                    return `${el.russian} `
                            })}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Рейтинг:</span>
                            <span className={`w-full ${style["about-list__item-value"]}`}>{animeData.rating}</span>
                        </li>
                        <li className={style["about-list__item"]}>
                            <span className={`w-2/6 ${style["about-list__item-type"]}`}>Студия:</span>
                            <span
                                className={`w-full ${style["about-list__item-value"]}`}>{
                                animeData.studios.map((el) => {
                                    return `${el.name} `
                                })}</span>
                        </li>
                    </ul>
                </div>

            </div>
            <div className="description mt-l col-span-9">
                <h3 className="text-m font-bold">Описание</h3>
                <p className="mt-m">{clearHTML(animeData.description_html)}</p>
            </div>
            <div className="mt-l col-start-1 col-end-13 mb-xl">
                <h3 className="font-bold text-m">Кадры</h3>
                <div className="flex justify-between mt-m ">
                    {screenshots.slice(0, 5).map((item, index) => (
                        <div className="w-2/12" key={index}>
                            <img src={`${import.meta.env.VITE_SHIKI_URL}${item.original}`} alt={`Screenshot ${index}`}/>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}
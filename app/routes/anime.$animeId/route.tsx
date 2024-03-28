import {useLoaderData} from "@remix-run/react";
import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { getAnime } from "../anime/anime.server";
import Button from "@/ui/button/button";
import {clearHTML} from "@/utils/utils";
import star from "@/assets/icons/star.svg";
import {TAnime, TAnimeInfo, TAnimeScreenshots} from "@/types/api/shiki/TAnime";



export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data: {
        rawData: TAnime;
        screenshots: string[];
        imageUrl: string;
        videos: string
        info: TAnimeInfo[]
    } = {};

    data.rawData = await getAnime(params.animeId);
    data.rawData.description_html = clearHTML(data.rawData.description_html)
    const screenShots : TAnimeScreenshots[] = await getAnime(`${params.animeId}/screenshots`);
    data.screenshots = screenShots.slice(0, 4).map((item : TAnimeScreenshots) => `${import.meta["env"]["VITE_SHIKI_URL"]}${item.original}`);
    const rawVideos = await getAnime(`${params.animeId}/videos`);
    data.videos = rawVideos.slice(0, 1).map((item: { player_url: string; }) => item.player_url)
    data.imageUrl = `${import.meta.env["VITE_SHIKI_URL"]}${data.rawData.image?.original}`;
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
            value: data.rawData.genres.reduce((acc : string, el : {russian: string}) =>  acc + el.russian + ' ', '')
        },
        {
            title: 'рейтинг',
            value: data.rawData.rating
        },
        {
            title: 'студия',
            value: data.rawData.studios.reduce((acc : string, el : {name: string}) =>  acc + el.name + ' ', '')
        },
    ]

    return json(data);
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `${data ? data.rawData.russian : "Anime page"} - Аниме` },
        { name: 'description', content: 'The best anime project' }
    ]
}

export default function AnimePage() {
    const anime = useLoaderData<typeof loader>();
    const scrollToVideo = () => {
        const player = document.getElementById("player");
        player.scrollIntoView({behavior: "smooth"})
    }


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
            <div className="flex flex-col col-start-3 col-end-10 px-l">
                <div>
                    <div className="flex flex-wrap items-start justify-between">
                        <h1 className="w-5/6 text-2xl font-bold">{anime.rawData.russian}</h1>
                        <div className="flex h-fit items-center">
                            <img className="w-xl h-xl" src={star} alt=""/>
                            <span className="text-2xl font-bold ml-s">{anime.rawData.score}</span>
                        </div>
                    </div>
                    <h2 className="text-s mt-xs w-5/6">{anime.rawData.name}</h2>
                    <div className="w-1/6 mt-m">
                        <Button text={'Смотреть'} style={{width: "100%"}} size={"medium"} onClick={scrollToVideo}/>
                    </div>
                </div>
                <div className="about mt-2xl w-3/5 text-xs">
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
                    anime.screenshots.map((item : string) => (
                        <div className="px-s w-2/6 h-[142px]" key={item}>
                            <img className={"w-full h-full"} src={item} alt={`Кадр из ${anime.rawData.russian}`}/>
                        </div>
                    ))}
                </div>
            </div>
            <div id="player" className="col-start-1 col-end-10 self-end mt-l">
                <h2 className="font-bold text-m">Трейлер</h2>
                <iframe className="mt-m" key='12' src="//kodik.info/season/84066/0372efad8c745626a261699d3b24400e/720p" width="100%" height="588px" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>
        </div>
    )
}
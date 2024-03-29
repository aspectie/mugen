import {useLoaderData} from "@remix-run/react";
import {useRef} from "react";
import {json, LoaderFunctionArgs, type MetaFunction} from "@remix-run/node";
import { getAnime } from "../anime/anime.server";
import Button from "@/ui/button/Button";
import {clearHTML} from "@/utils/utils";
import {StarIcon} from "@/assets/icons";
import {TAnime, TAnimeScreenshots, TAnimeVideo} from "@/types/api/shiki/TAnime";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data: {
        rawData?: TAnime;
        screenshots?: string[];
        imageUrl?: string;
        videos?: string[]
        info?: Record<string, string>[]
    } = {};

    data.rawData = await getAnime(params.animeId)

    if (!data.rawData) {
        throw new Response('Not Found', { status: 404 });
    }
    
    const screenShots: TAnimeScreenshots[] = await getAnime(`${params.animeId}/screenshots`)
    if (screenShots instanceof Array) {
        data.screenshots = screenShots
            .slice(0, 4)
            .map((item) => import.meta.env.VITE_SHIKI_URL + item.original)
    }

    const rawVideos: TAnimeVideo[] = await getAnime(`${params.animeId}/videos`)
    if (rawVideos instanceof Array) {
        data.videos = rawVideos
            .slice(0, 1)
            .map((item) => item.player_url)
    }

    data.rawData.description_html = data.rawData.description_html ? clearHTML(data.rawData.description_html) : ''
    data.imageUrl = import.meta.env.VITE_SHIKI_URL + data.rawData.image?.original
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
            value: data.rawData.genres?.reduce((acc, el) =>  acc + el.russian + ' ', '')
        },
        {
            title: 'рейтинг',
            value: data.rawData.rating
        },
        {
            title: 'студия',
            value: data.rawData.studios?.reduce((acc, el) =>  acc + el.name + ' ', '')
        }
    ]

    return json(data);
};

export const meta: MetaFunction<typeof loader> = ({data}) => {
    return [
        { title: `${data && data.rawData ? data.rawData.russian : "Anime page"} - Аниме` },
        { name: 'description', content: 'The best anime project' }
    ]
}

export default function AnimePage() {
    const anime = useLoaderData<typeof loader>();
    const playerRef = useRef<null | HTMLDivElement>(null)


    const scrollToPlayer = () => {
        if (playerRef.current) {
            playerRef.current.scrollIntoView({behavior: "smooth"})
        }
    }

    return (
        anime && anime.rawData &&
        <div className="container mx-auto mt-xl grid grid-cols-12 mb-4xl">
            <div className="col-span-2">
                <div className="rounded-s">
                    <img className="rounded block w-full object-center object-cover"
                        src={anime.imageUrl}
                        alt={`Постер аниме ${anime.rawData.russian}`}
                    />
                </div>
                <div className="mt-m">
                    <div className="flex flex-col gap-s">
                        <Button text="Добавить в список" type="secondary" size="small"/>
                        <Button text="Оставить отзыв" type="secondary" size="small"/>
                        <Button text="В избранное" size="small"/>
                    </div>
                    {/* TODO: create rating component */}
                    <div className="flex gap-s justify-center p-l">
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                        <StarIcon />
                    </div>
                </div>
            </div>
            <div className="flex flex-col col-span-7 px-l">
                <div className="mb-2xl">
                    <div className="flex items-start">
                        <h1 className="font-bold w-5/6">{anime.rawData.russian}</h1>
                        <div className="flex items-center ml-l">
                            <StarIcon className="w-l h-l"/>
                            <h1 className="font-bold text-black-80 ml-s">{anime.rawData.score}</h1>
                        </div>
                    </div>
                    <h5 className="mt-xs">{anime.rawData.name}</h5>
                    <div className="w-1/6 mt-m">
                        <Button text="Смотреть" onClick={scrollToPlayer}/>
                    </div>
                </div>
                <h4 className="font-bold mb-m">Информация</h4>
                <ul> {
                    anime.info && anime.info.map((el, index) => (
                        <li key={index} className="flex mb-s">
                            <span className="w-2/6 mr-xs bg-gray-40 py-xs px-s capitalize">{el.title}</span>
                            <span className="w-full mr-xs bg-gray-40 py-xs px-s capitalize">{el.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-l col-span-9">
                <h4 className="font-bold">Описание</h4>
                <p className="mt-m">{anime.rawData.description_html}</p>
            </div>
            <div className="mt-l col-span-9">
                <h4 className="font-bold">Кадры</h4>
                <div className="flex mt-m">{
                    anime.screenshots && anime.screenshots.map((item) => (
                        <div className="px-s w-2/6 h-[142px]" key={item}>
                            <img className="w-full h-full"
                                src={item}
                                alt={`Кадр из ${anime.rawData?.russian}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div id="player"
                ref={playerRef}
                className="col-start-1 col-end-10 self-end mt-l"
            >
                <h4 className="font-bold">Трейлер</h4>
                <iframe className="mt-m"
                    key='12'
                    src="//kodik.info/season/84066/0372efad8c745626a261699d3b24400e/720p"
                    width="100%"
                    height="588px"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    )
}
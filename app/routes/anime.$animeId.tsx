import {useParams} from "@remix-run/react";
import {useEffect, useState} from "react";
import {TCard} from "@/components/card/Card";
export default function AnimePage() {
    const data = useParams()
    const [animeData, setAnimeData] = useState<TCard>([]);
    useEffect(() => {
        fetch(`${window.ENV.SHIKI_URL}/api/animes/${data.animeId}`)
            .then(response => response.json())
            .then(json => setAnimeData(json))
    }, [])



    return (
        animeData &&
        <div>
        <h1>{animeData.russian}</h1>
        <p>{animeData.description}</p>
        <p>{animeData.episodes}</p>
        </div>
    )
}
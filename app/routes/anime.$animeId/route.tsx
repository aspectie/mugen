import {useLoaderData} from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { getAnime } from "../anime/anime.server";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const data = await getAnime(params.animeId);

    return json(data);
};

export default function AnimePage() {
    const data = useLoaderData<typeof loader>();

    return (
        data &&
        <div>
            <h1>{data.russian}</h1>
            <p>{data.description}</p>
            <p>{data.episodes}</p>
        </div>
    )
}
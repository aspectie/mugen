import { TAnime, TManga } from "@/types/api/shiki/TAnime";
import { TCardData } from "@/types/ui";

export function prepareCardData(data: TAnime[] | TManga[]) : TCardData[] {
  // TODO: get by endpoint
  const mangaTypes = ["manga", "manhwa", "manhua", "light_novel", "novel", "one_shot", "doujin"];
  const animeTypes = ["tv", "movie", "ova", "ona", "special", "music"];

  return data.map(item => {
    const url = animeTypes.includes(item.kind) ? `${import.meta.env.BASE_URL}anime/${item.id}` : `${import.meta.env.BASE_URL}manga/${item.id}`
    const imageUrl = `${import.meta.env.VITE_SHIKI_URL}/${item.image?.original}`;

    return {
      id: item.id,
      url,
      imageUrl,
      title: item.russian ? item.russian : item.name,
      date: item?.released_on
    }
  })
}
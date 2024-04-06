import { LooseObject } from '@/types'
import { TAnime } from '@/types/api/anime'
import {
  TShikiAnime,
  TShikiAnimeRelation,
  TShikiAnimeScreenshot,
  TShikiAnimeVideo
} from '@/types/api/shiki/anime'
import { clearHTML, groupBy } from '@/utils/utils'

type TShikiApi = {
  getAnime: (
    params: Parameters<typeof getAnime>[0]
  ) => ReturnType<typeof getAnime>
  getAnimeScreenshots: (
    id: Parameters<typeof getAnimeScreenshots>[0]
  ) => ReturnType<typeof getAnimeScreenshots>
  getAnimeVideos: (
    id: Parameters<typeof getAnimeVideos>[0]
  ) => ReturnType<typeof getAnimeVideos>
  getAnimeGroupedRelations: (
    id: Parameters<typeof getAnimeGroupedRelations>[0],
    limit: Parameters<typeof getAnimeGroupedRelations>[1]
  ) => ReturnType<typeof getAnimeGroupedRelations>
}

function castToAnimes(data: TShikiAnime[]): TAnime[] {
  return data.map(castToAnime)
}
// TODO: cast method to be abstract
function castToAnime(item: TShikiAnime): TAnime {
  return {
    id: item.id,
    title: {
      en: item.name,
      ru: item.russian
    },
    type: item.kind,
    image: `${import.meta.env.VITE_SHIKI_URL}/${item.image.original}`,
    released: item.released_on,
    description: item.description_html ? clearHTML(item.description_html) : '',
    episodes: item.episodes,
    aired_on: item.aired_on,
    status: item.status,
    rating: item.rating,
    score: item.score,
    genres: item.genres,
    studios: item.studios
  }
}

export function shikiApi(): TShikiApi {
  return {
    getAnime,
    getAnimeScreenshots,
    getAnimeVideos,
    getAnimeGroupedRelations
  }
}

async function getAnime(
  params: string | Record<string, string | number>
): Promise<TAnime[] | TAnime | null> {
  let url = `${process.env.VITE_SHIKI_URL}/api/animes`

  if (params) {
    if (typeof params === 'string') {
      url += `/${params}`
    } else {
      url += '?'
      Object.entries(params).map(([key, value]) => {
        url += `${key}=${value}&`
      })
    }
  }

  const res = await fetch(url)

  if (res.ok) {
    let data = await res.json()

    return data instanceof Array ? castToAnimes(data) : castToAnime(data)
  }
  return null
}

async function getAnimeWithNestedRoute({
  id,
  route
}: {
  id: string
  route: string
}) {
  let url = `${process.env.VITE_SHIKI_URL}/api/animes/${id}/${route}`

  const res = await fetch(url)

  if (!res.ok) {
    return null
  }

  return await res.json()
}

async function getAnimeScreenshots(
  id: string
): Promise<TShikiAnimeScreenshot[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'screenshots' })
}

async function getAnimeVideos(id: string): Promise<TShikiAnimeVideo[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'videos' })
}

async function getAnimeRelated(
  id: string
): Promise<TShikiAnimeRelation[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'related' })
}

async function getAnimeGroupedRelations(id: string, limit?: number) {
  let data = await getAnimeRelated(id)

  if (!data) {
    return
  }

  if (limit) {
    data = data.slice(0, limit)
  }

  const groupedData: Record<string, TShikiAnimeRelation[]> = groupBy(
    data,
    'relation'
  )
  const result: LooseObject = {}

  Object.keys(groupedData).map((key) => {
    result[key] = {}
    result[key].mangas = []
    result[key].animes = []

    groupedData[key].map((item) => {
      if (item.manga) {
        result[key].mangas.push(item.manga)
      } else {
        result[key].animes.push(item.anime)
      }
    })
    if (result[key].mangas.length === 0) {
      delete result[key].mangas
    }
    if (result[key].animes.length === 0) {
      delete result[key].animes
    }
  })

  return result
}

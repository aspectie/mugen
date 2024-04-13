import { LooseObject } from '@/types'
import { TAnime } from '@/types/api/anime'
import {
  TShikiAnime,
  TShikiAnimeRelation,
  TShikiAnimeScreenshot,
  TShikiAnimeVideo,
  TShikiManga
} from '@/types/api/shiki/anime'
import { castToAnother } from '@/utils/api'
import { clearHTML, groupBy } from '@/utils/utils'
import { TFilterSelection } from '@/types/ui'

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

const map = {
  id: 'id',
  title: {
    en: 'name',
    ru: 'russian'
  },
  type: 'kind',
  image: 'image',
  released: 'released_on',
  description: 'description_html', //only russian description
  episodes: 'episodes',
  aired_on: 'aired_on',
  status: 'status',
  rating: 'rating',
  score: 'score',
  genres: 'genres',
  studios: 'studios'
}

function prepareAnimeData(item: TShikiAnime | TShikiManga): TAnime {
  const res = castToAnother(item, map) as TAnime

  res.image = `${import.meta.env.VITE_SHIKI_URL}/${item.image.original}`
  res.description = item.description ? clearHTML(item.description) : ''

  return res
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
    const data = await res.json()
    return data instanceof Array
      ? data.map(item => prepareAnimeData(item))
      : prepareAnimeData(data)
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

  const res: LooseObject = {}

  Object.entries(groupedData).map(entries => {
    const key = entries[0]
    const value = entries[1]

    res[key] = value.map(item => {
      if (item.anime) {
        return prepareAnimeData(item.anime)
      }
      if (item.manga) {
        return prepareAnimeData(item.manga)
      }
      return item
    })
  })

  return res
}

/*TODO: remove it when API will be create */
export const filterSelects: TFilterSelection[] = [
  {
    title: 'Жанр',
    name: 'genre',
    options: [
      {
        label: 'Экшен',
        value: 'action'
      },
      {
        label: 'Приключения',
        value: 'adventure'
      }
    ]
  },
  {
    title: 'Тип',
    name: 'kind',
    options: [
      {
        label: 'ТВ',
        value: 'TV'
      },
      {
        label: 'Фильм',
        value: 'Movie'
      }
    ]
  },
  {
    title: 'Сезон',
    name: 'season',
    options: [
      {
        label: 'Зима',
        value: 'winter'
      },
      {
        label: 'Лето',
        value: 'summer'
      }
    ]
  }
]

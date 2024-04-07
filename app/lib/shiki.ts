import { LooseObject } from '@/types'
import {
  TAnime,
  TAnimeRelation,
  TAnimeScreenshot,
  TAnimeVideo
} from '@/types/api/shiki/TAnime'
import { groupBy } from '@/utils/utils'
import { TFilterSelections } from '@/types/ui'

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

  return res.ok ? await res.json() : null
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
): Promise<TAnimeScreenshot[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'screenshots' })
}

async function getAnimeVideos(id: string): Promise<TAnimeVideo[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'videos' })
}

async function getAnimeRelated(id: string): Promise<TAnimeRelation[] | null> {
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

  const groupedData: Record<string, TAnimeRelation[]> = groupBy(
    data,
    'relation'
  )
  const result: LooseObject = {}

  Object.keys(groupedData).map(key => {
    result[key] = {}
    result[key].mangas = []
    result[key].animes = []

    groupedData[key].map(item => {
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

/*TODO: remove it when API will be create */
export const filterSelects: TFilterSelections = [
  {
    name: 'Жанр',
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
    name: 'Тип',
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
    name: 'Тип',
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
    name: 'Тип',
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
    name: 'Тип',
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
    name: 'Тип',
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
    name: 'Тип',
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
  }
]

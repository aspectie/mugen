import {
  TAnime,
  TAnimeRelation,
  TAnimeScreenshot,
  TAnimeVideo
} from '@/types/api/shiki/TAnime'
import { LooseObject } from '@/types'
import { clearHTML, groupBy } from '@/utils/utils'

export async function getAnimeData(id: string) {
  const data: {
    rawData: Partial<TAnime>
    screenshots?: string[]
    imageUrl?: string
    videos?: string[]
    info?: Record<string, string>[]
    related: LooseObject
  } = {
    rawData: {},
    related: {}
  }

  data.rawData = (await getAnime(id)) as TAnime

  const screenShots = await getAnimeScreenshots(id)
  if (screenShots instanceof Array) {
    data.screenshots = screenShots.map(
      (item) => import.meta.env.VITE_SHIKI_URL + item.original
    )
  }

  const rawVideos = await getAnimeVideos(id)
  if (rawVideos instanceof Array) {
    data.videos = rawVideos.slice(0, 1).map((item) => item.player_url)
  }

  const related = await getAnimeGroupedRelations(id, 3)
  if (related) {
    data.related = related
  }

  data.rawData.description_html = data.rawData.description_html
    ? clearHTML(data.rawData.description_html)
    : ''
  data.imageUrl = import.meta.env.VITE_SHIKI_URL + data.rawData.image?.original
  console.log(data.rawData)
  data.info = [
    {
      title: 'тип',
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
      value: data.rawData.genres?.reduce(
        (acc, el) => acc + el.russian + ' ',
        ''
      )
    },
    {
      title: 'рейтинг',
      value: data.rawData.rating
    },
    {
      title: 'студия',
      value: data.rawData.studios?.reduce((acc, el) => acc + el.name + ' ', '')
    }
  ]
  return data
}

export async function getAnime(
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

export async function getAnimeNestedRoute({
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

export async function getAnimeScreenshots(
  id: string
): Promise<TAnimeScreenshot[] | null> {
  return await getAnimeNestedRoute({ id, route: 'screenshots' })
}

export async function getAnimeVideos(
  id: string
): Promise<TAnimeVideo[] | null> {
  return await getAnimeNestedRoute({ id, route: 'videos' })
}

export async function getAnimeRelated(
  id: string
): Promise<TAnimeRelation[] | null> {
  return await getAnimeNestedRoute({ id, route: 'related' })
}

export async function getAnimeGroupedRelations(id: string, limit?: number) {
  let data = await getAnimeRelated(id)
  if (data && limit) {
    data = data.slice(0, limit)
  }

  const groupedData: Record<string, TAnimeRelation[]> = groupBy(
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

import { LooseObject } from '@/types'
import {
  TAnime,
  TAnimeRelation,
  TAnimeScreenshot,
  TAnimeVideo
} from '@/types/api/shiki/TAnime'
import { groupBy } from '@/utils/utils'

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

export async function getAnimeWithNestedRoute({
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
  return await getAnimeWithNestedRoute({ id, route: 'screenshots' })
}

export async function getAnimeVideos(
  id: string
): Promise<TAnimeVideo[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'videos' })
}

export async function getAnimeRelated(
  id: string
): Promise<TAnimeRelation[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'related' })
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

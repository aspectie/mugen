import { LooseObject } from '@/types'
import { TAnime } from '@/types/api/anime'
import {
  TShikiAnime,
  TShikiAnimeRelation,
  TShikiAnimeScreenshot,
  TShikiAnimeVideo,
  TShikiManga
} from '@/types/api/shiki/anime'
import { toAnotherObject } from '@shared/lib'
import { clearHTML, groupBy } from 'shared/lib'
import { prepareOption } from '@shared/lib'

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
  getAnimeFilters: () => ReturnType<typeof getAnimeFilters>
}

const RATING = ['none', 'g', 'pg', 'pg13', 'r', 'r_plus', 'rx']
const SCORE = ['6', '7', '8', '9']
const SEASON = ['winter_2024', 'spring_2024', 'summer_2024', 'fall_2024']

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
  const res = toAnotherObject(item, map) as TAnime

  res.image = `${import.meta.env.VITE_SHIKI_URL}/${item.image.original}`
  res.description = item.description ? clearHTML(item.description) : ''

  return res
}

export function shikiApi(): TShikiApi {
  return {
    getAnime,
    getAnimeScreenshots,
    getAnimeVideos,
    getAnimeGroupedRelations,
    getAnimeFilters
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
      Object.entries(params).map(([key, value], index, array) => {
        url += `${key}=${value}`
        if (index !== array.length - 1) {
          url += '&'
        }
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

export async function getAnimeFilters() {
  let res = []

  const genres = await fetch(`${process.env.VITE_SHIKI_URL}/api/genres`)
  const genresOptions = await genres.json()
  res.push({
    name: 'genre',
    options: genresOptions.map(o => prepareOption(o)) // TODO: prepare options
  })

  const animeConstants = await fetch(
    `${process.env.VITE_SHIKI_URL}/api/constants/anime`
  )

  let animeConstantsData = {}
  if (animeConstants.ok) {
    animeConstantsData = await animeConstants.json()
  }

  Object.entries(animeConstantsData).map(([key, value]) => {
    const options = value.map(v => prepareOption(v))
    res.push({
      name: key,
      options
    })
  })

  res.push({
    name: 'rating',
    options: RATING.map(v => prepareOption(v))
  })

  res.push({
    name: 'score',
    options: SCORE.map(v => prepareOption(v))
  })

  res.push({
    name: 'season',
    options: SEASON.map(v => prepareOption(v))
  })

  return res
}

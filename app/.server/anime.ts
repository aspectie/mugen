import { TAnime } from '@/types/api/shiki/TAnime'
import { LooseObject } from '@/types'
import { clearHTML } from '@/utils/utils'
import {
  getAnime,
  getAnimeGroupedRelations,
  getAnimeScreenshots,
  getAnimeVideos
} from '@/lib/shiki'

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

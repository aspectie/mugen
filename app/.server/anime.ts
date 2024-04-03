import { TAnime } from '@/types/api/shiki/TAnime'
import { LooseObject } from '@/types'
import { clearHTML } from '@/utils/utils'
import { useApi } from '@/hooks/api'
import { shikiApi } from '@/lib/shiki'

export async function getAnimeData(id: string) {
  let data: {
    rawData?: Partial<TAnime>
    screenshots?: string[]
    imageUrl?: string
    videos?: string[]
    info?: Record<string, string>[]
    related?: LooseObject
  } = {}

  const {
    getAnime,
    getAnimeGroupedRelations,
    getAnimeScreenshots,
    getAnimeVideos
  } = useApi(shikiApi)

  await Promise.allSettled([
    getAnime(id).then((res) => {
      data.rawData = res as TAnime
      data.rawData.description_html = data.rawData.description_html
        ? clearHTML(data.rawData.description_html)
        : ''
      data.imageUrl = process.env.SHIKI_URL + data.rawData.image?.original
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
          value: data.rawData.studios?.reduce(
            (acc, el) => acc + el.name + ' ',
            ''
          )
        }
      ]
    }),

    getAnimeScreenshots(id).then((res) => {
      if (res instanceof Array) {
        data.screenshots = res.map(
          (item) => process.env.SHIKI_URL + item.original
        )
      }
    }),

    getAnimeVideos(id).then((res) => {
      if (res instanceof Array) {
        data.videos = res.slice(0, 1).map((item) => item.player_url)
      }
    }),

    getAnimeGroupedRelations(id, 3).then((res) => {
      if (res) {
        data.related = res
      }
    })
  ])

  return data.rawData ? data : null
}

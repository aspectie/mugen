import { TAnime } from '@/types/api/shiki/TAnime'
import { LooseObject } from '@/types'
import { clearHTML, convertObjectsArrayToList } from '@/utils/utils'
import { useApi } from '@/hooks/api'
import { shikiApi } from '@/lib/shiki'
import { CONSTANTS } from '@/constants'

const { COMMA } = CONSTANTS

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
      if (!process.env.SHIKI_URL) {
        throw new Error('Env var `SHIKI_URL` is not defined')
      }
      data.imageUrl = process.env.SHIKI_URL + data.rawData.image?.original

      const textFields: Array<keyof TAnime> = [
        'kind',
        'episodes',
        'aired_on',
        'status',
        'rating'
      ]
      const arrayFields = [
        { name: 'genres', value: 'russian' },
        { name: 'studios', value: 'name' }
      ]

      textFields.map((field) => {
        if (!data.info) {
          data.info = []
        }
        if (!data.rawData) {
          return
        }
        data.info.push({ title: field, value: data.rawData[field] })
      })

      arrayFields.map((field) => {
        if (!data.info) {
          data.info = []
        }
        if (!data.rawData) {
          return
        }
        data.info.push({
          title: field.name,
          value: convertObjectsArrayToList(
            data.rawData[field.name as keyof TAnime],
            field.value,
            COMMA
          )
        })
      })
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

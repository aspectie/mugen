import { toList, useApi } from '@shared/lib'

import animeConfig from '@/config/anime'
import { COMMA } from '@shared/constants'
import { getPlayerLink, TAnime } from '@entities'

export type TGetAnimeData = typeof getAnimeData

export const {
  getAnime,
  getAnimeGroupedRelations,
  getAnimeScreenshots,
  getAnimeVideos,
  getAnimeFilters
} = useApi(animeConfig.baseApi)

export async function getAnimeData(id: string) {
  let data: {
    rawData?: TAnime
    screenshots?: string[]
    imageUrl?: string
    videos?: string[]
    info?: Record<string, string>[]
    related?: Record<string, TAnime[]>
    playerLink?: string
  } = {}

  await Promise.allSettled([
    getAnime(id).then(res => {
      data.rawData = res as TAnime
      if (!process.env.SHIKI_URL) {
        throw new Error('Env var `SHIKI_URL` is not defined')
      }
      data.imageUrl = data.rawData.image

      const textFields: (
        | 'type'
        | 'episodes'
        | 'aired_on'
        | 'status'
        | 'rating'
      )[] = ['type', 'episodes', 'aired_on', 'status', 'rating']

      const arrayFields: Array<{
        name: 'genres' | 'studios'
        value: 'russian' | 'name'
      }> = [
        { name: 'genres', value: 'russian' },
        { name: 'studios', value: 'name' }
      ]

      textFields.map((field): undefined | void => {
        if (!data.info) {
          data.info = []
        }
        if (!data.rawData) {
          return
        }
        data.info.push({ title: field, value: String(data.rawData[field]) })
      })

      arrayFields.map(field => {
        if (!data.info) {
          data.info = []
        }
        if (!data.rawData) {
          return
        }

        data.info.push({
          title: field.name,
          value: toList(data.rawData[field.name], field.value, COMMA)
        })
      })
    }),

    getAnimeScreenshots(id).then(res => {
      if (res instanceof Array) {
        data.screenshots = res.map(
          item => process.env.SHIKI_URL + item.original
        )
      }
    }),

    getAnimeVideos(id).then(res => {
      if (res instanceof Array) {
        data.videos = res.slice(0, 1).map(item => item.player_url)
      }
    }),

    getAnimeGroupedRelations(id, 3).then(res => {
      if (res) {
        data.related = res
      }
    }),

    getPlayerLink(id).then(res => {
      if (res) {
        data.playerLink = res
      }
    })
  ])

  return data.rawData ? data : null
}

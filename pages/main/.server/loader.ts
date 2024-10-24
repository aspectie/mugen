import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node'
import { i18next, getAnime } from 'shared/.server'

import { TAnime } from '@entities'

export type TLoaderResponse = {
  seasonAnime: TAnime[]
  popularAnime: TAnime[]
  metaTitle: string
} | null

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const seasonAnimeRequest = (await getAnime({
    limit: 36,
    season: '2024',
    status: 'ongoing',
    order: 'popularity'
  })) as TAnime[] | null

  const popularAnimeRequest = (await getAnime({
    limit: 26,
    page: 1,
    order: 'popularity'
  })) as TAnime[] | null

  const t = await i18next.getFixedT(request, 'meta')
  const metaTitle = t('root title')

  if (!seasonAnimeRequest) return null
  if (!popularAnimeRequest) return null

  return json({
    seasonAnime: seasonAnimeRequest,
    popularAnime: popularAnimeRequest,
    metaTitle
  })
}

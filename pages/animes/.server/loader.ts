import { json, LoaderFunctionArgs, TypedResponse } from '@remix-run/node'
import { getAnime, getAnimeFilters, i18next } from 'shared/.server'

import { TAnime } from '@entities'
import { TFilterSelection } from '@widgets'

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const url = new URL(request.url)
  const limit = 10
  const order = 'ranked'
  const search = url.searchParams.get('search')

  const requestParams = {
    limit,
    order
  }

  if (search) {
    requestParams.search = search
  }

  url.searchParams.forEach((value, key) => {
    requestParams[key] = value
  })

  const data = (await getAnime(requestParams)) as TAnime[] | null

  const t = await i18next.getFixedT(request, 'meta')
  const metaTitle = t('anime page')

  if (!data) {
    return null
  }

  return json({
    animes: data,
    metaTitle,
    filterSelects: await getAnimeFilters()
  })
}

export type TLoaderResponse = {
  animes: TAnime[]
  metaTitle: string
  filterSelects: TFilterSelection[]
} | null

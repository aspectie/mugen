import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import i18n from '@/.server/i18n'

import { TAnime } from '@/types/api/anime'

import { shikiApi } from '@/lib/shiki'
import { useApi } from '@/hooks/useApi'
import { prepareCardData } from '@/utils/card'
import CardList from '@/components/card/CardList'
import Filter from '@/components/filter/Filter'

export const handle = { i18n: ['default', 'account', 'ui', 'anime'] }

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const { getAnime, getAnimeFilters } = useApi(shikiApi)
  const url = new URL(request.url);
  const limit = 10;
  const order = 'ranked';
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

  const t = await i18n.getFixedT(request, 'meta')
  const metaTitle = t('anime page')

  if (!data) {
    return null
  }

  return json({ animes: data, metaTitle, filterSelects: await getAnimeFilters() })
}

type TLoaderResponse = {
  animes: TAnime[]
  metaTitle: string
} | null

export const meta = ({ data }: { data: TLoaderResponse }) => {
  return [
    { title: data ? data.metaTitle : null },
    { name: 'description', content: 'The best anime project' }
  ]
}

export default function AnimesPage() {
  const data: TLoaderResponse = useLoaderData<typeof loader>()

  return (
    <div className="container mx-auto text-black-100">
      <div className="grid grid-cols-12 pt-xl mb-2xl">
        {data && data.animes && (
          <div className="col-span-8">
            <div className="mb-l">
              <Filter
                selects={data.filterSelects}
                type="detailed"
              />
            </div>
            <div>
              {/*<h2 className="font-bold mb-l">{t('anime')}</h2>*/}
              <CardList
                cards={prepareCardData(data.animes)}
                type="horizontal"
                size="large"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

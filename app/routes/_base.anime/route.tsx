import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import i18n from '@/.server/i18n'

import { TAnime } from '@/types/api/anime'

import { filterSelects, shikiApi } from '@/lib/shiki'
import { useApi } from '@/hooks/api'
import { prepareCardData } from '@/utils/card'
import CardList from '@/components/card/CardList'
import Filter from '@/components/filter/Filter'

export const handle = { i18n: ['default', 'account', 'ui'] }

export const loader = async ({
  request,
  params
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const { getAnime } = useApi(shikiApi)
  console.log(params.id)
  const data = (await getAnime({
    limit: 10
  })) as TAnime[] | null

  const t = await i18n.getFixedT(request, 'meta')
  const metaTitle = t('root title')

  if (!data) {
    return null
  }

  return json({ animes: data, metaTitle })
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
  const { t } = useTranslation()

  return (
    <div className="container mx-auto text-black-100">
      <div className="grid grid-cols-12 pt-xl">
        {data && data.animes && (
          <div className="col-span-8">
            <div className="mb-l">
              <Filter
                selects={filterSelects}
                type="detailed"
              />
            </div>
            <div>
              <h2 className="font-bold mb-l">{t('winter season')}</h2>
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

import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import i18n from '@/.server/i18n'

import { TAnime } from '@/types/api/anime'

import { shikiApi } from '@/lib/shiki'
import { useApi } from '@/hooks/useApi'
import { prepareCardData } from '@/utils/card'
import CardList from '@/components/card/CardList'

export const handle = { i18n: ['default', 'account'] }

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const { getAnime } = useApi(shikiApi)

  const data = (await getAnime({
    limit: 5,
    season: 'winter_2024',
    order: 'ranked'
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

export default function Index() {
  const data: TLoaderResponse = useLoaderData<typeof loader>()
  const { t, i18n } = useTranslation()

  return (
    <div className="container mx-auto text-black-100">
      <div className="grid grid-cols-12 pt-xl">
        {data && data.animes && (
          <div className="col-span-8">
            <div className="mb-l">
              <h2 className="font-bold mb-l">{t('winter season')}</h2>
              <div className="p-m bg-black-100 border border-black-20">
                <CardList
                  cards={prepareCardData(data.animes, i18n.language)}
                  className="columns-5 text-white"
                />
              </div>
            </div>
            <div>
              <h2 className="font-bold mb-l">{t('popular')}</h2>
              <div className="col-span-8 p-m">
                <CardList
                  cards={prepareCardData(data.animes, i18n.language)}
                  className="columns-5"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

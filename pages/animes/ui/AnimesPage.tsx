import { useLoaderData } from '@remix-run/react'

import { loader, type TLoaderResponse } from '../.server/loader'
import { prepareCardData } from '@/utils/card'

import { CardList } from 'shared/ui'
import { Filter } from 'widgets/filter'

export function AnimesPage() {
  const data: TLoaderResponse = useLoaderData<typeof loader>()

  return (
    <div className="text-black-100">
      <div className="grid mb-2xl w-2/3">
        {data && data.animes && (
          <div className="">
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

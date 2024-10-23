import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { getAnimeData } from 'shared/.server'

import { prepareCardData } from '@/utils/card'
import { CardList } from 'shared/ui'
import { TAnime } from '@/types/api/anime'

export function Related({
  id,
  related
}: {
  id: Pick<TAnime, 'id'>['id']
  related: NonNullable<
    Pick<
      NonNullable<Awaited<ReturnType<typeof getAnimeData>>>,
      'related'
    >['related']
  >
}) {
  const { i18n } = useTranslation()

  return (
    <>
      <div>
        {Object.entries(related).map(entry => (
          <div
            key={entry[0]}
            className="[&:not(:last-child)]:mb-l "
          >
            <h4 className="font-bold mb-l">{entry[0]}</h4>
            <CardList
              type="horizontal"
              size="small"
              isHighlight={true}
              cards={prepareCardData(entry[1], i18n.language)}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Link to={`/anime/${id}/related`}>
          <h5 className="text-black-200 hover:text-accent-120">Смотреть все</h5>
        </Link>
      </div>
    </>
  )
}

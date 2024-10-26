import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import { prepareCard } from '@shared/lib'
import { CardList } from '@shared/ui'
import { TAnime } from '@entities'

export function Related({
  id,
  related
}: {
  id: number
  related: Record<string, TAnime[]>
}) {
  const { i18n } = useTranslation()

  return (
    <>
      <div>
        {Object.entries(related).map(([key, value]) => (
          <div
            key={key}
            className="[&:not(:last-child)]:mb-l "
          >
            <h4 className="font-bold mb-l">{key}</h4>
            <CardList
              type="horizontal"
              size="small"
              isHighlight={true}
              cards={prepareCard(value, i18n.language)}
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

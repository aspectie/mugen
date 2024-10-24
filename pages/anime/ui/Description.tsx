import { useTranslation } from 'react-i18next'

import { TAnime } from '@entities'

export function Description({
  description
}: {
  description: Pick<TAnime, 'description'>['description']
}) {
  const { t } = useTranslation(['default', 'anime'])

  return (
    <>
      <h4 className="font-bold text-black-80">
        {t('description', { ns: 'default' })}
      </h4>
      <p className="mt-m text-black-80">
        {
          //TODO: Add locale empty description
          description ? description : t('empty description', { ns: 'anime' })
        }
      </p>
    </>
  )
}

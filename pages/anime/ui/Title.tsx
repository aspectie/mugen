import { useTranslation } from 'react-i18next'

import { StarIcon } from '@/assets/icons'
import { TAnime } from '@/types/api/anime'

export function Title({
  title,
  score
}: {
  title: Pick<TAnime, 'title'>['title']
  score: Pick<TAnime, 'score'>['score']
}) {
  const { i18n } = useTranslation(['default'])

  return (
    <>
      <div className="flex items-start md:flex-nowrap flex-wrap sm:justify-start justify-center">
        {Object.keys(title).includes(i18n.language) && (
          <h1 className="text-2xl font-bold w-full sm:text-start text-center text-black-100 xl:text-2xl">
            {title[i18n.language as keyof typeof title]}
          </h1>
        )}
        <div className="flex items-center">
          <StarIcon className="w-l h-l fill-accent-80" />
          <h3 className="font-bold text-black-80 ml-s">{score}</h3>
        </div>
      </div>
    </>
  )
}

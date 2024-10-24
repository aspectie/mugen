import { MutableRefObject } from 'react'
import { useTranslation } from 'react-i18next'

import { UserRateStatus } from '@entities'

import { Button, FieldSize } from '@shared/ui'
import { Select } from '@shared/ui'
import { ButtonJustify, ButtonType } from '@shared/ui'
import { TAnime } from '@/types/api/anime'

export function MainCard({
  playerRef,
  image,
  title
}: {
  image?: Pick<TAnime, 'image'>['image']
  title: Pick<TAnime, 'title'>['title']
  playerRef: MutableRefObject<HTMLDivElement | null>
}) {
  const { t, i18n } = useTranslation(['default', 'actions', 'anime'])

  const scrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {image && (
        <>
          <div className="rounded-s mb-m w-2/3 mx-auto relative md:w-full">
            <img
              className="rounded block w-full object-center object-cover"
              src={image}
              alt={`${t('poster of', { ns: 'default' })} ${
                Object.keys(title).includes(i18n.language)
                  ? title[i18n.language as keyof typeof title]
                  : ''
              }`}
            />
          </div>
        </>
      )}
      <div className="flex flex-col gap-s">
        <Button
          text={t('watch', { ns: 'actions' })}
          onClick={scrollToPlayer}
          size={FieldSize.medium}
        />
        <Button
          text={`${t('add to', { ns: 'actions' })} ${t('favourites', {
            ns: 'default'
          }).toLocaleLowerCase()}`}
          type={ButtonType.ghost}
          size={FieldSize.small}
        />
        <Select
          onChange={() => {}}
          placeholder={`${t('add to', { ns: 'actions' })} ${t('list', {
            ns: 'default'
          }).toLocaleLowerCase()}`}
          options={[
            {
              title: t('completed', { ns: 'anime' }),
              name: UserRateStatus.completed
            },
            {
              title: t('dropped', { ns: 'anime' }),
              name: UserRateStatus.dropped
            },
            {
              title: t('on hold', { ns: 'anime' }),
              name: UserRateStatus.on_hold
            },
            {
              title: t('planned', { ns: 'anime' }),
              name: UserRateStatus.planned
            },
            {
              title: t('rewatching', { ns: 'anime' }),
              name: UserRateStatus.rewatching
            },
            {
              title: t('watching', { ns: 'anime' }),
              name: UserRateStatus.watching
            }
          ]}
          size={FieldSize.small}
          justify={ButtonJustify.center}
        />
      </div>
    </>
  )
}

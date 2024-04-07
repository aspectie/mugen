import { useEffect, MutableRefObject, useRef, useState } from 'react'
import { Link, useLoaderData } from '@remix-run/react'
import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'
import { TGetAnimeData, getAnimeData } from '@/.server/anime'

import { UserRateStatus } from '@/types/user'

import { prepareCardData } from '@/utils/card'
import Button from '@/ui/button/Button'
import { StarIcon } from '@/assets/icons'
import CardList from '@/components/card/CardList'
import Select from '@/ui/select/Select'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/carousel/Carousel'
import { TAnime } from '@/types/api/anime'
import Player from '@/components/player/Player'

export const handle = { i18n: ['default', 'account', 'anime', 'actions'] }

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.id, 'Expected params.id')

  const data = await getAnimeData(params.id)

  if (!data) {
    throw new Response('Not Found', { status: 404 })
  }

  return json(data)
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      title: `${
        data && data.rawData ? data.rawData.title.ru : 'Anime page'
      } - Аниме`
    },
    { name: 'description', content: 'The best anime project' }
  ]
}

export default function AnimePage() {
  const anime = useLoaderData<typeof loader>()
  const { t } = useTranslation(['anime', 'default', 'actions'])

  const playerRef = useRef<null | HTMLDivElement>(null)

  return (
    anime &&
    anime.rawData && (
      <div className="container mx-auto mt-xl grid grid-cols-12 mb-4xl">
        <div className="col-span-2">
          <MainCard
            image={anime.imageUrl}
            title={anime.rawData.title}
            playerRef={playerRef}
          />
        </div>
        <div className="flex flex-col col-span-7 px-l">
          <div className="mb-2xl">
            <Title
              title={anime.rawData.title}
              score={anime.rawData.score}
            />
            <h5 className="mt-xs text-black-80">{anime.rawData.title.en}</h5>
          </div>
          {anime.info && <Information info={anime.info} />}
        </div>
        {/* TODO: move out of this container because sections on the left are affected */}
        {anime.related && Object.keys(anime.related).length > 0 && (
          <div className="row-span-2 h-fit col-start-10 col-span-3 bg-gray-40 p-m rounded-[8px] flex flex-col justify-between">
            <Related
              id={anime.rawData.id}
              related={anime.related}
            />
          </div>
        )}
        {anime.rawData.description && (
          <Description description={anime.rawData.description} />
        )}
        {anime.screenshots && (
          <div className="mt-l col-span-9">
            <Screenshots
              title={anime.rawData.title}
              screenshots={anime.screenshots}
            />
          </div>
        )}
        {anime.playerLink && (
          <div
            ref={playerRef}
            className="col-start-1 col-end-10 self-end mt-l"
          >
            <Player link={anime.playerLink} />
          </div>
        )}
      </div>
    )
  )
}

function MainCard({
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
        <div className="rounded-s mb-m">
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
      )}
      <div className="flex flex-col gap-s">
        <Button
          text={t('watch', { ns: 'actions' })}
          onClick={scrollToPlayer}
          size="small"
        />
        <Button
          text={`${t('add to', { ns: 'actions' })} ${t('favourites', {
            ns: 'default'
          }).toLocaleLowerCase()}`}
          type="ghost"
          size="small"
        />
        <Select
          placeholder={`${t('add to', { ns: 'actions' })} ${t('list', {
            ns: 'default'
          }).toLocaleLowerCase()}`}
          options={[
            {
              label: t('status.completed', { ns: 'anime' }),
              value: UserRateStatus.completed
            },
            {
              label: t('status.dropped', { ns: 'anime' }),
              value: UserRateStatus.dropped
            },
            {
              label: t('status.on hold', { ns: 'anime' }),
              value: UserRateStatus.on_hold
            },
            {
              label: t('status.planned', { ns: 'anime' }),
              value: UserRateStatus.planned
            },
            {
              label: t('status.rewatching', { ns: 'anime' }),
              value: UserRateStatus.rewatching
            },
            {
              label: t('status.watching', { ns: 'anime' }),
              value: UserRateStatus.watching
            }
          ]}
          size="small"
          align="center"
        />
      </div>
    </>
  )
}

function Title({
  title,
  score
}: {
  title: Pick<TAnime, 'title'>['title']
  score: Pick<TAnime, 'score'>['score']
}) {
  const { i18n } = useTranslation(['default'])

  return (
    <>
      <div className="flex items-start">
        {Object.keys(title).includes(i18n.language) && (
          <h1 className="font-bold w-5/6 text-black-100">
            {title[i18n.language as keyof typeof title]}
          </h1>
        )}
        <div className="flex items-center ml-l">
          <StarIcon className="w-l h-l" />
          <h1 className="font-bold text-black-80 ml-s">{score}</h1>
        </div>
      </div>
    </>
  )
}

function Information({
  info
}: {
  info: NonNullable<
    Pick<NonNullable<Awaited<ReturnType<TGetAnimeData>>>, 'info'>['info']
  >
}) {
  const { t } = useTranslation(['default'])

  return (
    <>
      <h4 className="font-bold mb-m text-black-80">
        {t('info', { ns: 'default' })}
      </h4>
      <ul>
        {info.map((el, index) => (
          <li
            key={index}
            className="flex mb-s "
          >
            <span className="w-2/6 mr-xs bg-gray-40 py-xs px-s capitalize ">
              {el.title}
            </span>
            <span className="w-full mr-xs bg-gray-40 py-xs px-s capitalize">
              {el.value}
            </span>
          </li>
        ))}
      </ul>
    </>
  )
}

function Description({
  description
}: {
  description: Pick<TAnime, 'description'>['description']
}) {
  const { t } = useTranslation(['default'])

  return (
    <div className="mt-l col-span-9 pr-l">
      <h4 className="font-bold text-black-80">
        {t('description', { ns: 'default' })}
      </h4>
      <p className="mt-m text-black-80">{description}</p>
    </div>
  )
}

function Screenshots({
  title,
  screenshots
}: {
  title: Pick<TAnime, 'title'>['title']
  screenshots: NonNullable<
    Pick<
      NonNullable<Awaited<ReturnType<typeof getAnimeData>>>,
      'screenshots'
    >['screenshots']
  >
}) {
  const { t } = useTranslation(['default'])

  return (
    <>
      <h4 className="font-bold text-black-80">
        {t('screenshots', { ns: 'default' })}
      </h4>
      <div className="flex mt-m bg-gray-40 p-s rounded-[8px]">
        <Carousel>
          <CarouselContent>
            {screenshots.map((item) => (
              <CarouselItem
                className="lg:basis-1/2 xl:basis-1/4"
                key={item}
              >
                <img
                  src={item}
                  alt={`Кадр из ${title.ru}`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  )
}

function Related({
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
  return (
    <>
      <div>
        {Object.entries(related).map((entry) => (
          <div
            key={entry[0]}
            className="[&:not(:last-child)]:mb-l "
          >
            <h4 className="font-bold mb-l">{entry[0]}</h4>
            <CardList
              type="horizontal"
              size="small"
              isHighlight={true}
              cards={prepareCardData(entry[1])}
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

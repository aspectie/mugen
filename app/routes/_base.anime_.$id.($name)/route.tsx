import { MutableRefObject, useRef } from 'react'
import { Link, useLoaderData } from '@remix-run/react'
import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'
import { TGetAnimeData, getAnimeData } from 'shared/api'

import { UserRateStatus } from '@/types/user'

import { prepareCardData } from '@/utils/card'
import { Button } from 'shared/ui'
import { StarIcon } from '@/assets/icons'
import CardList from '@/components/card/CardList'
import { Select } from 'shared/ui'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/carousel/Carousel'
import { TAnime } from '@/types/api/anime'
import Player from '@/components/player/Player'
import { ButtonJustify, ButtonType, FieldSize } from '@/types/ui'
import Rating from '@/components/rating/Rating'

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
      <div className="mx-auto grid grid-cols-12 mb-4xl">
        <div className="xl:col-span-2 lg:col-span-3 md:col-span-4 sm:col-span-5 col-span-12 sm:mb-auto mb-l gap-s">
          <MainCard
            image={anime.imageUrl}
            title={anime.rawData.title}
            playerRef={playerRef}
          />
        </div>
        <div className="flex flex-col xl:col-span-7 lg:col-span-9 md:col-span-8 sm:col-span-7 col-span-12 sm:px-l px-auto">
          <div className="mb-l">
            <Title
              title={anime.rawData.title}
              score={anime.rawData.score}
            />
            <h5 className="mt-xs text-black-80 sm:text-start text-center xl:font-semibold hidden xl:block">
              {anime.rawData.title.en}
            </h5>
          </div>
          <div className="mb-l">
            <Rating />
          </div>
          {anime.info && <Information info={anime.info} />}
        </div>
        {anime.screenshots && anime.screenshots.length > 0 && (
          <div className="mt-4xl xl:col-span-9 lg:col-span-12 col-span-12 xl:pr-l">
            <Description description={anime.rawData.description} />
          </div>
        )}
        {/* TODO: move out of this container because sections on the left are affected */}
        {anime.related && Object.keys(anime.related).length > 0 && (
          <div className="row-start-1 row-end-3 h-fit col-start-10 col-span-3 bg-gray-40 p-m rounded-[8px] flex-col justify-between xl:flex hidden">
            <Related
              id={anime.rawData.id}
              related={anime.related}
            />
          </div>
        )}
        {anime.rawData.description && (
          <div className="mt-l pr-l xl:col-span-9 col-span-12">
            <Screenshots
              title={anime.rawData.title}
              screenshots={anime.screenshots}
            />
          </div>
        )}
        {anime.playerLink && (
          <div
            ref={playerRef}
            className=" xl:col-span-9 lg:col-span-12 xl:h-[573px] col-span-12 mt-l"
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
      <ul className="lg:w-2/3 xl:w-2/3">
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
        <Carousel
          opts={{
            loop: true,
            align: 'start'
          }}
        >
          <CarouselContent>
            {screenshots.map(item => (
              <CarouselItem
                className="basis-1/2 sm:basis-1/2 md:basis-1/3 lg:basis-1/3 xl:basis-1/4 "
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

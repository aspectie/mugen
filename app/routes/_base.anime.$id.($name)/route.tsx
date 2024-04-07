import { useEffect, useRef, useState } from 'react'
import { Link, useLoaderData } from '@remix-run/react'
import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { useTranslation } from 'react-i18next'
import invariant from 'tiny-invariant'
import { getAnimeData } from '@/.server/anime'

import { UserRateStatus } from '@/types/api/shiki/TAnime'

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
import { isRussianLang } from '@/utils/locale'

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
        data && data.rawData ? data.rawData.russian : 'Anime page'
      } - Аниме`
    },
    { name: 'description', content: 'The best anime project' }
  ]
}

export default function AnimePage() {
  const anime = useLoaderData<typeof loader>()
  const { t } = useTranslation(['anime', 'default', 'actions'])

  /*todo: rework after create api*/
  const [animeLink, setAnimeLink] = useState(null)
  useEffect(() => {
    const getAnimeLink = async () => {
      const response = await fetch(
        `https://kodikapi.com/search?shikimori_id=${anime.rawData.id}&token=a5726fece69584dc582e201bcac30ce6`
      )
      const data = await response.json()
      setAnimeLink(data.results[0].link)
    }
    getAnimeLink()
  }, [])

  const playerRef = useRef<null | HTMLDivElement>(null)

  const scrollToPlayer = () => {
    if (playerRef.current) {
      playerRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    anime &&
    anime.rawData && (
      <div className="container mx-auto mt-xl grid grid-cols-12 mb-4xl">
        <div className="col-span-2">
          <div className="rounded-s mb-m">
            <img
              className="rounded block w-full object-center object-cover"
              src={anime.imageUrl}
              alt={`${t('poster of', { ns: 'default' })} ${
                isRussianLang() ? anime.rawData.russian : anime.rawData.name
              }`}
            />
          </div>
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
        </div>
        <div className="flex flex-col col-span-7 px-l">
          <div className="mb-2xl">
            <div className="flex items-start">
              <h1 className="font-bold w-5/6 text-black-100">
                {isRussianLang() ? anime.rawData.russian : anime.rawData.name}
              </h1>
              <div className="flex items-center ml-l">
                <StarIcon className="w-l h-l" />
                <h1 className="font-bold text-black-80 ml-s">
                  {anime.rawData.score}
                </h1>
              </div>
            </div>
            <h5 className="mt-xs text-black-80">{anime.rawData.name}</h5>
          </div>
          {anime.info && (
            <>
              <h4 className="font-bold mb-m text-black-80">
                {t('info', { ns: 'default' })}
              </h4>
              <ul>
                {anime.info.map((el, index) => (
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
          )}
        </div>
        {/* TODO: move out of this container because sections on the left are affected */}
        {anime && anime.related && Object.keys(anime.related).length > 0 && (
          <div className="row-span-2 h-fit col-start-10 col-span-3 bg-gray-40 p-m rounded-[8px] flex flex-col justify-between">
            <div>
              {Object.keys(anime.related).map(
                relation =>
                  anime.related &&
                  Object.keys(anime.related[relation]).map(type => (
                    <div
                      key={relation}
                      className="[&:not(:last-child)]:mb-l "
                    >
                      <h4 className="font-bold mb-l">{relation}</h4>
                      <CardList
                        type="horizontal"
                        size="small"
                        isHighlight={true}
                        cards={prepareCardData(
                          anime.related ? anime.related[relation][type] : []
                        )}
                      />
                    </div>
                  ))
              )}
            </div>
            <div className="flex justify-end">
              <Link to={`/anime/${anime.rawData.id}/related`}>
                <h5 className="text-black-200 hover:text-accent-120">
                  Смотреть все
                </h5>
              </Link>
            </div>
          </div>
        )}
        {anime.rawData.description_html && (
          <div className="mt-l col-span-9 pr-l">
            <h4 className="font-bold text-black-80">
              {t('description', { ns: 'default' })}
            </h4>
            <p className="mt-m text-black-80">
              {anime.rawData.description_html}
            </p>
          </div>
        )}
        {anime.screenshots && (
          <div className="mt-l col-span-9">
            <h4 className="font-bold text-black-80">
              {t('screenshots', { ns: 'default' })}
            </h4>
            <div className="flex mt-m bg-gray-40 p-s rounded-[8px]">
              <Carousel>
                <CarouselContent>
                  {anime.screenshots.map(item => (
                    <CarouselItem
                      className="lg:basis-1/2 xl:basis-1/4"
                      key={item}
                    >
                      <img
                        src={item}
                        alt={`Кадр из ${anime.rawData?.russian}`}
                      />
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        )}
        <div
          id="player"
          ref={playerRef}
          className="col-start-1 col-end-10 self-end mt-l"
        >
          <h4 className="font-bold text-black-80">
            {t('trailer', { ns: 'default' })}
          </h4>
          <iframe
            className="mt-m"
            key="12"
            src={animeLink}
            width="100%"
            height="588px"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    )
  )
}

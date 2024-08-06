import { LoaderFunctionArgs, TypedResponse, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import i18n from '@/.server/i18n'

import { TAnime } from '@/types/api/anime'

import { shikiApi } from '@/lib/shiki'
import { useApi } from '@/hooks/useApi'
import { prepareCardData } from '@/utils/card'
import CardList from '@/components/card/CardList'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/carousel/Carousel'
import Heading from '@/ui/heading/Heading'

export const handle = { i18n: ['default', 'account'] }

export const loader = async ({
  request
}: LoaderFunctionArgs): Promise<TypedResponse<TLoaderResponse> | null> => {
  const { getAnime } = useApi(shikiApi)

  const seasonAnimePageOne = (await getAnime({
    limit: 6,
    page: 1,
    season: 'summer_2024',
    status: 'ongoing',
    order: 'popularity'
  })) as TAnime[] | null

  const seasonAnimePageTwo = (await getAnime({
    limit: 6,
    page: 2,
    season: 'summer_2024',
    status: 'ongoing',
    order: 'popularity'
  })) as TAnime[] | null

  const seasonAnimePageThree = (await getAnime({
    limit: 6,
    page: 3,
    season: 'summer_2024',
    status: 'ongoing',
    order: 'popularity'
  })) as TAnime[] | null

  const popularPageOne = (await getAnime({
    limit: 6,
    page: 1,
    order: 'popularity'
  })) as TAnime[] | null

  const popularPageTwo = (await getAnime({
    limit: 6,
    page: 2,
    order: 'popularity'
  })) as TAnime[] | null

  const popularPageThree = (await getAnime({
    limit: 6,
    page: 3,
    order: 'popularity'
  })) as TAnime[] | null

  const t = await i18n.getFixedT(request, 'meta')
  const metaTitle = t('root title')
  if (!seasonAnimePageOne) {
    return null
  }
  if (!seasonAnimePageTwo) {
    return null
  }
  if (!seasonAnimePageThree) {
    return null
  }
  if (!popularPageOne) return null
  if (!popularPageTwo) return null
  if (!popularPageThree) return null

  return json({
    seasonAnime: {
      pageOne: seasonAnimePageOne,
      pageTwo: seasonAnimePageTwo,
      pageThree: seasonAnimePageThree
    },
    popularAnime: {
      pageOne: popularPageOne,
      pageTwo: popularPageTwo,
      pageThree: popularPageThree
    },
    metaTitle
  })
}

type TLoaderResponse = {
  seasonAnime: {
    pageOne: TAnime[]
    pageTwo: TAnime[]
    pageThree: TAnime[]
  }
  popularAnime: {
    pageOne: TAnime[]
    pageTwo: TAnime[]
    pageThree: TAnime[]
  }
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
    <>
      <div className="grid lg:grid-cols-12 lg:grid-rows-2">
        <section className="mx-auto text-black-100 dark:text-white mb-s sm lg:col-start-1 lg:col-end-9 lg:row-start-1 lg:row-end-1">
          {data && data.seasonAnime && (
            <>
              <Heading size="h3">{t('summer season')}</Heading>
              <div className="p-s bg-black-100 border-black-20 mt-s mx-[-8px] sm:mx-[-16px] md:mx-[-24px] lg:mx-[0] h-fit">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.seasonAnime.pageOne,
                          i18n.language
                        )}
                        className="text-white grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.seasonAnime.pageTwo,
                          i18n.language
                        )}
                        className="text-white grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.seasonAnime.pageThree,
                          i18n.language
                        )}
                        className="text-white grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </>
          )}
        </section>
        <div className="hidden lg:block lg:col-start-9 lg:col-end-13 lg:pl-2xl">
          <Filter selects={[{ name: 'Спорт', title: 'Sport', options: [] }]} />
        </div>
        <section className="mx-auto text-black-100 dark:text-white lg:col-start-1 lg:col-end-9 lg:row-start-2 lg:row-end-2">
          {data && data.popularAnime && (
            <>
              <Heading size="h3">{t('popular')}</Heading>
              <div className="p-s border-black-20 mt-s mx-[-8px] sm:mx-[0] h-fit">
                <Carousel>
                  <CarouselContent>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.popularAnime.pageOne,
                          i18n.language
                        )}
                        className="grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.popularAnime.pageTwo,
                          i18n.language
                        )}
                        className="grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                    <CarouselItem>
                      <CardList
                        cards={prepareCardData(
                          data.popularAnime.pageThree,
                          i18n.language
                        )}
                        className="grid grid-cols-3 items-start gap-s sm:grid sm:grid-cols-5 sm:grid-rows-2 overflow-hidden"
                        size="small"
                      />
                    </CarouselItem>
                  </CarouselContent>
                </Carousel>
              </div>
            </>
          )}
        </section>
      </div>
    </>
  )
}

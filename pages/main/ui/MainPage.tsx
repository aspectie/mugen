import { useLoaderData } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/carousel/Carousel'
import Card from '@/components/card/Card'
import { loader, TLoaderResponse } from '../.server/loader'

export const handle = { i18n: ['default', 'account'] }

export const meta = ({ data }: { data: TLoaderResponse }) => {
  return [
    { title: data ? data.metaTitle : null },
    { name: 'description', content: 'The best anime project' }
  ]
}

export function MainPage() {
  const data: TLoaderResponse = useLoaderData<typeof loader>()
  const { t } = useTranslation()

  return (
    <>
      <section className="mx-auto text-black-100 mb-s">
        {data && data.seasonAnime && (
          <>
            <h2 className="font-semibold text-m sm:text-m md:text-2xl lg:text-xl xl:text-3xl mb-s">
              {t('summer season')}
            </h2>
            <div className="p-s bg-black-100 border-black-20 mx-[-8px] sm:mx-[0] h-fit xl:w-5/6 xl:mb-xl">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true
                }}
              >
                <CarouselContent>
                  {data.seasonAnime.map(anime => {
                    return (
                      <CarouselItem
                        key={anime.id}
                        //TODO: Fix bug with basis on super-small displays
                        className="text-white basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6"
                      >
                        <Card
                          url={`/anime/${anime.id}`}
                          title={anime.title.ru}
                          id={anime.id}
                          imageUrl={anime.image}
                          size="small"
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </>
        )}
      </section>
      <section className="mx-auto text-black-100">
        {data && data.popularAnime && (
          <>
            <h2 className="font-semibold text-m sm:text-m md:text-2xl lg:text-2xl xl:text-3xl mb-s">
              {t('popular')}
            </h2>
            <div className="p-s border-black-20 mx-[-8px] sm:mx-[0] h-fit xl:w-5/6">
              <Carousel
                opts={{
                  align: 'start',
                  loop: true
                }}
              >
                <CarouselContent>
                  {data.popularAnime.map(anime => {
                    return (
                      <CarouselItem
                        key={anime.id}
                        //TODO: Fix bug with basis on super-small displays
                        className="basis-1/3 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-1/6"
                      >
                        <Card
                          url={`/anime/${anime.id}`}
                          title={anime.title.ru}
                          id={anime.id}
                          imageUrl={anime.image}
                          size="small"
                        />
                      </CarouselItem>
                    )
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </>
        )}
      </section>
    </>
  )
}

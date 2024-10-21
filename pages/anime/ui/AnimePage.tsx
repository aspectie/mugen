import { useRef } from 'react'
import { useLoaderData } from '@remix-run/react'

import Player from '@/components/player/Player'
import Rating from '@/components/rating/Rating'

import { loader } from '../.server/loader'
import { MainCard } from './MainCard'
import { Title } from './Title'
import { Information } from './Information'
import { Description } from './Description'
import { Related } from './Related'
import { Screenshots } from './Screenshots'

export const handle = { i18n: ['default', 'account', 'anime', 'actions'] }

export function AnimePage() {
  const anime = useLoaderData<typeof loader>()

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

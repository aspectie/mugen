import { useTranslation } from 'react-i18next'
import { getAnimeData } from 'shared/.server'
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/carousel/Carousel'
import { TAnime } from '@/types/api/anime'

export function Screenshots({
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

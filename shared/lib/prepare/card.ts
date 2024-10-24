import { TAnime, TManga } from '@entities'
import { toDashed } from '../convert'
import { TCardData } from '@shared/ui'
import { RU } from '@shared/constants'

export function prepareCard(
  data: TAnime[] | TManga[],
  lang: string = RU
): TCardData[] {
  // TODO: get by endpoint
  const mangaTypes = [
    'manga',
    'manhwa',
    'manhua',
    'light_novel',
    'novel',
    'one_shot',
    'doujin'
  ]
  const animeTypes = ['tv', 'movie', 'ova', 'ona', 'special', 'music']

  return data.map(item => {
    const name = toDashed(item.title.en)
    const url = animeTypes.includes(item.type)
      ? `${import.meta.env.BASE_URL}anime/${item.id}/${name}`
      : `${import.meta.env.BASE_URL}manga/${item.id}/${name}`
    const title = Object.keys(item.title).includes(lang)
      ? item.title[lang as keyof typeof item.title]
      : ''
    const kind = item.type

    return {
      id: item.id,
      url,
      imageUrl: item.image,
      title,
      date: item?.released,
      kind
    }
  })
}

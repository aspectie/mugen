import { LooseObject } from '@/types'
import { TAnime } from '@/types/api/anime'
import {
  TShikiAnime,
  TShikiAnimeRelation,
  TShikiAnimeScreenshot,
  TShikiAnimeVideo,
  TShikiManga
} from '@/types/api/shiki/anime'
import { castToAnother } from '@/utils/api'
import { clearHTML, groupBy } from '@/utils/utils'
import { TFilterSelection } from '@/types/ui'

type TShikiApi = {
  getAnime: (
    params: Parameters<typeof getAnime>[0]
  ) => ReturnType<typeof getAnime>
  getAnimeScreenshots: (
    id: Parameters<typeof getAnimeScreenshots>[0]
  ) => ReturnType<typeof getAnimeScreenshots>
  getAnimeVideos: (
    id: Parameters<typeof getAnimeVideos>[0]
  ) => ReturnType<typeof getAnimeVideos>
  getAnimeGroupedRelations: (
    id: Parameters<typeof getAnimeGroupedRelations>[0],
    limit: Parameters<typeof getAnimeGroupedRelations>[1]
  ) => ReturnType<typeof getAnimeGroupedRelations>
}

const map = {
  id: 'id',
  title: {
    en: 'name',
    ru: 'russian'
  },
  type: 'kind',
  image: 'image',
  released: 'released_on',
  description: 'description_html', //only russian description
  episodes: 'episodes',
  aired_on: 'aired_on',
  status: 'status',
  rating: 'rating',
  score: 'score',
  genres: 'genres',
  studios: 'studios'
}

function prepareAnimeData(item: TShikiAnime | TShikiManga): TAnime {
  const res = castToAnother(item, map) as TAnime

  res.image = `${import.meta.env.VITE_SHIKI_URL}/${item.image.original}`
  res.description = item.description ? clearHTML(item.description) : ''

  return res
}

export function shikiApi(): TShikiApi {
  return {
    getAnime,
    getAnimeScreenshots,
    getAnimeVideos,
    getAnimeGroupedRelations
  }
}

async function getAnime(
  params: string | Record<string, string | number>
): Promise<TAnime[] | TAnime | null> {
  let url = `${process.env.VITE_SHIKI_URL}/api/animes`

  if (params) {
    if (typeof params === 'string') {
      url += `/${params}`
    } else {
      url += '?'
      Object.entries(params).map(([key, value]) => {
        url += `${key}=${value}&`
      })
    }
  }

  const res = await fetch(url)

  if (res.ok) {
    const data = await res.json()
    return data instanceof Array
      ? data.map(item => prepareAnimeData(item))
      : prepareAnimeData(data)
  }
  return null
}

async function getAnimeWithNestedRoute({
  id,
  route
}: {
  id: string
  route: string
}) {
  let url = `${process.env.VITE_SHIKI_URL}/api/animes/${id}/${route}`

  const res = await fetch(url)

  if (!res.ok) {
    return null
  }

  return await res.json()
}

async function getAnimeScreenshots(
  id: string
): Promise<TShikiAnimeScreenshot[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'screenshots' })
}

async function getAnimeVideos(id: string): Promise<TShikiAnimeVideo[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'videos' })
}

async function getAnimeRelated(
  id: string
): Promise<TShikiAnimeRelation[] | null> {
  return await getAnimeWithNestedRoute({ id, route: 'related' })
}

async function getAnimeGroupedRelations(id: string, limit?: number) {
  let data = await getAnimeRelated(id)

  if (!data) {
    return
  }

  if (limit) {
    data = data.slice(0, limit)
  }

  const groupedData: Record<string, TShikiAnimeRelation[]> = groupBy(
    data,
    'relation'
  )

  const res: LooseObject = {}

  Object.entries(groupedData).map(entries => {
    const key = entries[0]
    const value = entries[1]

    res[key] = value.map(item => {
      if (item.anime) {
        return prepareAnimeData(item.anime)
      }
      if (item.manga) {
        return prepareAnimeData(item.manga)
      }
      return item
    })
  })

  return res
}

/*TODO: remove it when API will be create */
export const filterSelects: TFilterSelection[] = [
  {
    title: 'Тип',
    name: 'kind',
    options: [
      {
        title: 'ТВ',
        name: 'tv'
      },
      {
        title: 'Фильм',
        name: 'movie'
      },
      {
        title: 'OVA',
        name: 'ova'
      },
      {
        title: 'ONA',
        name: 'ona'
      },
      {
        title: 'Спешл',
        name: 'special'
      }
    ]
  },
  {
    title: 'Сезон',
    name: 'season',
    options: [
      {
        title: 'Зима',
        name: 'winter'
      },
      {
        title: 'Лето',
        name: 'summer'
      }
    ]
  },
  {
    title: 'Статус',
    name: 'status',
    options: [
      {
        title: 'Анонсированно',
        name: 'anons'
      },
      {
        title: 'Онгоинг',
        name: 'ongoing'
      },
      {
        title: 'Вышло',
        name: 'released'
      }
    ]
  },
  {
    title: 'Оценка',
    name: 'score',
    options: [
      {
        title: '10',
        name: '10'
      },
      {
        title: '9',
        name: '9'
      },
      {
        title: '8',
        name: '8'
      },
      {
        title: '7',
        name: '7'
      },
      {
        title: '6',
        name: '6'
      }
    ]
  },
  {
    title: 'Рейтинг',
    name: 'rating',
    options: [
      {
        title: '0+',
        name: 'g'
      },
      {
        title: '12+',
        name: 'pg-13'
      },
      {
        title: '16+',
        name: 'r-17'
      },
      {
        title: '18+',
        name: 'r+'
      }
    ]
  },
  {
    title: 'Жанр',
    name: 'genre',
    options: [
      {
        id: 8,
        name: 'Drama',
        title: 'Драма'
      },
      {
        id: 11,
        name: 'Game',
        title: 'Игры'
      },
      {
        id: 40,
        name: 'Psychological',
        title: 'Психологическое'
      },
      {
        id: 19,
        name: 'Music',
        title: 'Музыка'
      },
      {
        id: 1,
        name: 'Action',
        title: 'Экшен'
      },
      {
        id: 4,
        name: 'Comedy',
        title: 'Комедия'
      },
      {
        id: 6,
        name: 'Demons',
        title: 'Демоны'
      },
      {
        id: 39,
        name: 'Police',
        title: 'Полиция'
      },
      {
        id: 9,
        name: 'Ecchi',
        title: 'Этти'
      },
      {
        id: 10,
        name: 'Fantasy',
        title: 'Фэнтези'
      },
      {
        id: 12,
        name: 'Hentai',
        title: 'Хентай'
      },
      {
        id: 13,
        name: 'Historical',
        title: 'Исторический'
      },
      {
        id: 16,
        name: 'Magic',
        title: 'Магия'
      },
      {
        id: 18,
        name: 'Mecha',
        title: 'Меха'
      },
      {
        id: 20,
        name: 'Parody',
        title: 'Пародия'
      },
      {
        id: 21,
        name: 'Samurai',
        title: 'Самураи'
      },
      {
        id: 22,
        name: 'Romance',
        title: 'Романтика'
      },
      {
        id: 23,
        name: 'School',
        title: 'Школа'
      },
      {
        id: 27,
        name: 'Shounen',
        title: 'Сёнен'
      },
      {
        id: 32,
        name: 'Vampire',
        title: 'Вампиры'
      },
      {
        id: 33,
        name: 'Yaoi',
        title: 'Яой'
      },
      {
        id: 34,
        name: 'Yuri',
        title: 'Юри'
      },
      {
        id: 35,
        name: 'Harem',
        title: 'Гарем'
      },
      {
        id: 36,
        name: 'Slice of Life',
        title: 'Повседневность'
      },
      {
        id: 26,
        name: 'Shoujo Ai',
        title: 'Сёдзё-ай'
      },
      {
        id: 43,
        name: 'Josei',
        title: 'Дзёсей'
      },
      {
        id: 37,
        name: 'Supernatural',
        title: 'Сверхъестественное'
      },
      {
        id: 41,
        name: 'Thriller',
        title: 'Триллер'
      },
      {
        id: 24,
        name: 'Sci-Fi',
        title: 'Фантастика'
      },
      {
        id: 25,
        name: 'Shoujo',
        title: 'Сёдзё'
      },
      {
        id: 31,
        name: 'Super Power',
        title: 'Супер сила'
      },
      {
        id: 38,
        name: 'Military',
        title: 'Военное'
      },
      {
        id: 7,
        name: 'Mystery',
        title: 'Детектив'
      },
      {
        id: 15,
        name: 'Kids',
        title: 'Детское'
      },
      {
        id: 3,
        name: 'Cars',
        title: 'Машины'
      },
      {
        id: 17,
        name: 'Martial Arts',
        title: 'Боевые искусства'
      },
      {
        id: 5,
        name: 'Dementia',
        title: 'Безумие'
      },
      {
        id: 30,
        name: 'Sports',
        title: 'Спорт'
      },
      {
        id: 42,
        name: 'Seinen',
        title: 'Сэйнэн'
      },
      {
        id: 28,
        name: 'Shounen Ai',
        title: 'Сёнен-ай'
      },
      {
        id: 543,
        name: 'Gourmet',
        title: 'Гурман'
      },
      {
        id: 29,
        name: 'Space',
        title: 'Космос'
      },
      {
        id: 541,
        name: 'Work Life',
        title: 'Работа'
      },
      {
        id: 14,
        name: 'Horror',
        title: 'Ужасы'
      },
      {
        id: 2,
        name: 'Adventure',
        title: 'Приключения'
      },
      {
        id: 539,
        name: 'Erotica',
        title: 'Эротика'
      }
    ]
  }
]

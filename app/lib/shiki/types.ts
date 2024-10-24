export type TShikiAnime = {
  id: number
  name: string
  russian?: string
  image: {
    original: string
    preview: string
    x96: string
    x48: string
  }
  url?: string
  kind: string
  score: string
  status: string
  episodes: number
  episodes_aired: number
  aired_on?: any
  released_on?: any
  rating: string
  english?: Array<any>
  japanese?: Array<any>
  synonyms?: Array<any>
  license_name_ru?: any
  duration: number
  description?: any
  description_html: string
  description_source?: any
  franchise?: any
  favoured: boolean
  anons: boolean
  ongoing: boolean
  thread_id: number
  topic_id: number
  myanimelist_id: number
  rates_scores_stats?: Array<any>
  rates_statuses_stats?: Array<any>
  updated_at: string
  next_episode_at?: any
  fansubbers?: Array<any>
  fandubbers?: Array<any>
  licensors?: Array<any>
  genres: TShikiAnimeGenre[]
  studios: TShikiAnimeStudio[]
  videos?: Array<any>
  screenshots?: Array<any>
  user_rate?: any
}

export type TShikiManga = {
  id: number
  name: string
  russian: string
  image: {
    original: string
    preview: string
    x96: string
    x48: string
  }
  url: string
  kind: string
  score: string
  status: string
  volumes: number
  chapters: number
  aired_on?: any
  released_on?: any
  english?: Array<any>
  japanese?: Array<any>
  synonyms?: Array<any>
  license_name_ru?: any
  description?: any
  description_html: string
  description_source?: any
  franchise?: any
  favoured: boolean
  anons: boolean
  ongoing: boolean
  thread_id: number
  topic_id: number
  myanimelist_id: number
  rates_scores_stats?: Array<any>
  rates_statuses_stats?: Array<any>
  licensors?: Array<any>
  genres?: Array<any>
  publishers?: Array<any>
  user_rate?: any
}

export type TShikiAnimeGenre = {
  id: number
  name: string
  russian: string
  kind: string
  entry_type: string
}

export type TShikiAnimeStudio = {
  id: number
  name: string
  filtered_name: string
  real: boolean
  image: string
}

export type TShikiAnimeVideo = {
  id: number
  url: string
  image_url: string
  player_url: string
  name?: string
  kind: string
  hosting: string
}

export type TShikiAnimeScreenshot = {
  original: string
  preview: string
}

export type TShikiAnimeRelation = {
  relation: string
  relation_russian: string
  anime?: TShikiAnime
  manga?: TShikiManga
}

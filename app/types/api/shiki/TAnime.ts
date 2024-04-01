export type TAnime = {
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
  genres: TAnimeGenre[]
  studios: TAnimeStudio[]
  videos?: Array<any>
  screenshots?: Array<any>
  user_rate?: any
}

export type TManga = {
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

export type TAnimeGenre = {
  id: number
  name: string
  russian: string
  kind: string
  entry_type: string
}

export type TAnimeStudio = {
  id: number
  name: string
  filtered_name: string
  real: boolean
  image: string
}

export type TAnimeVideo = {
  id: number
  url: string
  image_url: string
  player_url: string
  name?: string
  kind: string
  hosting: string
}

export type TAnimeScreenshot = {
  original: string
  preview: string
}

export type TAnimeRelation = {
  relation: string
  relation_russian: string
  anime?: TAnime
  manga?: TManga
}

export const enum UserRateStatus {
  planned = "planned",
  watching = "watching",
  rewatching = "rewatching",
  completed = "completed",
  on_hold = "on_hold",
  dropped = "dropped"
}

export type TUserRateStatus = keyof typeof UserRateStatus
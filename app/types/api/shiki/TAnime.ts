export type TAnime = {
  id: number
  russian: string
  name: string
  description: string
  description_html: string
  image: {
    original: string
  },
  score: number
  url: string
  episodes: string
  kind: string
  aired_on: string
  status: string
  genres: TAnimeGenre[]
  rating: string
  studios: TAnimeStudio[]
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

export type TAnimeScreenshots = {
  original: string
  preview: string
}
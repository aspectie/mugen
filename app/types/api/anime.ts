export type TAnime = {
  id: number
  title: {
    en: string
    ru?: string
  }
  type: string
  image: string
  released: string
  description: string
  episodes: number
  aired_on: string
  status: string
  rating: string
  score: string
}

export type TManga = {
  id: number
  title: {
    en: string
    ru?: string
  }
  type: string
  image: string
  released: string
}

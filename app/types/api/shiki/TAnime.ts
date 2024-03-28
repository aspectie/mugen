export type TAnime = {
  id: number,
  russian: string,
  name: string,
  description: string,
  description_html: string,
  image: {
    original: string,
  },
  score: number,
  url: string,
  episodes: string,
  kind: string,
  aired_on: string,
  status: string,
  genres: [
  ],
  rating: string,
  studios: [
  ],
}

export type TAnimeInfo =
  {
    title: string,
    value: string
  }

export type TAnimeScreenshots =
{
  original: string,
  preview: string,
}
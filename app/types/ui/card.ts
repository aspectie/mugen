import { TFieldSize } from '.'

export const enum CardSize {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export type TCardPreferences = {
  type?: `${CardSize}`
  size?: TFieldSize
  isHighlight?: boolean
}

export type TCardData = {
  id: number
  url?: string
  imageUrl: string
  date?: string
  title?: string
  series?: string
}

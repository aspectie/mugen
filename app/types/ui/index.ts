export const enum FieldSize {
  small = 'small',
  medium = 'medium',
  large = 'large'
} 
export type TFieldSize = keyof typeof FieldSize

export const enum CardSize {
  vertical = 'vertical',
  horizontal = 'horizontal'
} 
export type TCardPreferences = {
  type?: keyof typeof CardSize,
  size?: TFieldSize
  isHighlight?: boolean
}

export type TCardData = {
  id: number
  url?: string
  imageUrl: string
  date?: string
  title: string
  series?: string
}
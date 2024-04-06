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
  type?: keyof typeof CardSize
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

export const enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  ghost = 'ghost'
}
export type TButtonType = keyof typeof ButtonType

export const enum InputType {
  transparent = 'transparent'
}
export type TInputType = keyof typeof InputType

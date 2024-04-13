import {
  ButtonType,
  TButtonType,
  ButtonJustify,
  TButtonJustify
} from './button'
import { CardSize, TCardPreferences, TCardData } from './card'
import { TOption } from './select'
import { FilterType, TFilterType, TFilterSelection } from './filter'
import { InputType, TInputType } from './input'

enum FieldSize {
  smallest = 'smallest',
  extraSmall = 'extra-small',
  small = 'small',
  medium = 'medium',
  large = 'large'
}
type TFieldSize = `${FieldSize}`

enum Space {
  xs = 'xs',
  s = 's',
  m = 'm',
  l = 'l',
  xl = 'xl'
}
type TSpace = `${Space}`

export {
  FieldSize,
  ButtonType,
  ButtonJustify,
  CardSize,
  FilterType,
  InputType,
  Space
}

export type {
  TFieldSize,
  TButtonType,
  TButtonJustify,
  TCardPreferences,
  TCardData,
  TOption,
  TFilterType,
  TFilterSelection,
  TInputType,
  TSpace
}

import { TOption } from './select'
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

export { FieldSize, InputType, Space }

export type { TFieldSize, TOption, TInputType, TSpace }

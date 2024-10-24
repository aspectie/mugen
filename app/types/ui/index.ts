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

export { FieldSize, Space }

export type { TFieldSize, TSpace }

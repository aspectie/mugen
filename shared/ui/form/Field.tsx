import { Children, cloneElement } from 'react'
import { useField } from 'remix-validated-form'

import style from './field.module.scss'

export enum FieldSize {
  smallest = 'smallest',
  extraSmall = 'extra-small',
  small = 'small',
  medium = 'medium',
  large = 'large'
}
export type TFieldSize = `${FieldSize}`

export const FormField = ({
  children,
  name,
  type
}: {
  children: React.ReactElement
  name: string
  type: string
}) => {
  const { error, touched, getInputProps } = useField(name)
  const childrenWithProps = Children.map(children, child => {
    const props = { inputType: type, ...getInputProps({ type }) }
    delete props.type

    return cloneElement(child, { ...props })
  })
  return (
    <div className={style.field}>
      {childrenWithProps}
      {error && touched && <p className={style.field__error}>{error}</p>}
    </div>
  )
}

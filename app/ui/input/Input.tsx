import { HTMLInputTypeAttribute } from 'react'
import classNames from 'classnames'

import { FieldSize, TFieldSize } from '@/types/ui'

import styles from './input.module.scss'

type TInput = {
  type?: HTMLInputTypeAttribute
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
  value?: string
  name?: string
  onChange?: any  
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, TInput> = (props: TInput) => {
  const {
    type = 'text',
    size = FieldSize.medium,
    disabled = false,
    placeholder = 'Default placeholder',
    value,
    name,
    onChange,
    ...rest
  } = props

  const classes = classNames(styles.input, {
    [styles[`input--${size}`]]: size
  })

  return (
    <input
      type={type}
      className={classes}
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      name={name}
      onChange={onChange}
    />
  )
}

export default Input

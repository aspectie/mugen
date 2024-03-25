import { HTMLInputTypeAttribute } from 'react'
import classNames from 'classnames'

import { TFieldSize } from '@/types/ui'

import styles from './input.module.scss'

type TInput = {
  type?: HTMLInputTypeAttribute
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
}

const Input: React.ForwardRefRenderFunction<HTMLInputElement, TInput> = (props: TInput) => {
  const {
    type = 'text',
    size = 'medium',
    disabled = false,
    placeholder = 'Default placeholder',
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
    />
  )
}

export default Input

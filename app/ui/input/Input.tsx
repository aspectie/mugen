import classNames from 'classnames'

import { FieldSize, TFieldSize, TInputType } from '@/types/ui'

import styles from './input.module.scss'
import { ChangeEvent, forwardRef } from 'react'

type TInput = {
  inputType?: 'text'
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
  value?: string
  name?: string
  type?: TInputType
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input = forwardRef<HTMLInputElement, TInput>((props: TInput, ref) => {
  const {
    inputType = 'text',
    size = FieldSize.medium,
    disabled = false,
    placeholder = 'Default placeholder',
    name,
    type,
    onChange,
    value
  } = props

  const classes = classNames(styles.input, {
    [styles[`input--${size}`]]: size,
    [styles[`input--${type}`]]: type,
    [styles[`input--disabled`]]: disabled
  })

  return (
    <input
      type={inputType}
      className={classes}
      disabled={disabled}
      placeholder={placeholder}
      name={name}
      value={value}
      onInput={onChange}
      ref={ref}
    />
  )
})

Input.displayName = 'Input'

export default Input

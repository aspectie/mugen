import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import classNames from 'classnames'

import styles from './input.module.scss'
import { FieldSize, TFieldSize } from '../form'

export const enum InputType {
  transparent = 'transparent'
}
type TInputType = `${InputType}`

type TInput = {
  inputType?: 'text'
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
  value?: string
  name?: string
  type?: TInputType
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

export const Input = forwardRef<HTMLInputElement, TInput>(
  (props: TInput, ref) => {
    const {
      inputType = 'text',
      size = FieldSize.medium,
      disabled = false,
      placeholder = 'Default placeholder',
      name,
      type,
      onChange,
      onKeyDown,
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
        onKeyDown={onKeyDown}
        ref={ref}
      />
    )
  }
)

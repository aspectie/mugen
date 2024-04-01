import classNames from 'classnames'

import {FieldSize, TFieldSize} from '@/types/ui'

import styles from './input.module.scss'

const enum InputType {
  transparent = 'transparent'
}

type TInputType  = keyof typeof InputType

type TInput = {
  inputType?: "text"
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
  value?: string
  name?: string
  onChange?: any
  type?: TInputType

const Input: React.ForwardRefRenderFunction<HTMLInputElement, TInput> = (props: TInput) => {
  const {
    inputType = "text",
    size = FieldSize.medium,
    disabled = false,
    placeholder = 'Default placeholder',
    value,
    name,
    onChange,
    type,
    ...rest
  } = props

  const classes = classNames(styles.input, {
    [styles[`input--${size}`]]: size,
    [styles[`input--${type}`]]: type,
    [styles[`input--disabled`]]: disabled,
  })

  return (
    <input
      type={inputType}
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

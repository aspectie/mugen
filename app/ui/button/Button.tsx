import classNames from 'classnames'
import { forwardRef, ReactNode, MouseEvent, CSSProperties } from 'react'
import {
  ButtonType,
  FieldSize,
  TButtonJustify,
  TButtonType,
  TFieldSize,
  TSpace
} from '@/types/ui'
import styles from './button.module.scss'

type TButton = {
  type?: TButtonType
  size?: TFieldSize
  justify?: TButtonJustify
  disabled?: boolean
  children?: ReactNode
  style?: CSSProperties
  text?: string
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  suffix?: ReactNode
  prefix?: ReactNode
  gap?: TSpace
}

const Button = forwardRef<HTMLButtonElement, TButton>((props, ref) => {
  const {
    type = ButtonType.primary,
    size = FieldSize.extraSmall,
    justify,
    disabled = false,
    text,
    style,
    onClick,
    suffix,
    prefix,
    gap,
    children
  } = props

  const classes = classNames(styles.button, {
    [styles[`button--${size}`]]: size,
    [styles[`button--${type}`]]: type,
    [styles[`button--${justify}`]]: justify,
    [styles[`button--gap-${gap}`]]: gap,
    [styles[`button--disabled`]]: disabled
  })

  return (
    <button
      ref={ref}
      className={classes}
      style={{ ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {/*TODO: Maybe remove this prefix, suffix from default button?*/}
      {prefix}
      {text && <span className={styles.button__text}>{text}</span>}
      {children}
      {suffix}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

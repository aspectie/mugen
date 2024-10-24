import classNames from 'classnames'
import { forwardRef, ReactNode, MouseEvent, CSSProperties } from 'react'
import { FieldSize, TFieldSize, TSpace } from '@/types/ui'
import styles from './button.module.scss'

export const enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
  ghost = 'ghost',
  transparent = 'transparent'
}
export type TButtonType = `${ButtonType}`

export const enum ButtonJustify {
  start = 'start',
  center = 'center',
  between = 'between'
}
export type TButtonJustify = `${ButtonJustify}`

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

export const Button = forwardRef<HTMLButtonElement, TButton>((props, ref) => {
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
      {prefix}
      {text && <span className={styles.button__text}>{text}</span>}
      {children}
      {suffix}
    </button>
  )
})

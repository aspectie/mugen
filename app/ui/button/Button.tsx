import classNames from 'classnames'

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
  children?: React.ReactNode
  style?: React.CSSProperties
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  suffix?: React.ReactNode
  prefix?: React.ReactNode
  gap?: TSpace
}

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  TButton
> = props => {
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
    children,
    ...rest
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
}

export default Button

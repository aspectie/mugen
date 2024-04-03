import classNames from 'classnames'

import { ButtonType, FieldSize, TButtonType, TFieldSize } from '@/types/ui'
import styles from './button.module.scss'

type TButton = {
  type?: TButtonType
  size?: TFieldSize
  align?: string
  disabled?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
  suffix?: React.ReactNode
  prefix?: React.ReactNode
}

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  TButton
> = props => {
  const {
    type = ButtonType.primary,
    size = FieldSize.medium,
    align,
    disabled = false,
    text = 'Default text',
    style,
    onClick,
    suffix,
    prefix,
    ...rest
  } = props

  const classes = classNames(styles.button, {
    [styles[`button--${size}`]]: size,
    [styles[`button--${type}`]]: type,
    [styles[`button--${align}`]]: align,
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
      <span className={styles.button__text}>{text}</span>
      {suffix}
    </button>
  )
}

export default Button

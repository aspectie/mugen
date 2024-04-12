import classNames from 'classnames'

import {
  ButtonType,
  FieldSize,
  TButtonJustify,
  TButtonType,
  TFieldSize
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
  isActive?: boolean
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
    text = 'Default text',
    style,
    onClick,
    suffix,
    prefix,
    isActive,
    ...rest
  } = props

  const classes = classNames(styles.button, {
    [styles[`button--${size}`]]: size,
    [styles[`button--${type}`]]: type,
    [styles[`button--${justify}`]]: justify,
    [styles[`button--disabled`]]: disabled,
    [styles[`active`]]: isActive
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

import classNames from 'classnames'

import { FieldSize, TFieldSize } from '@/types/ui'
import styles from './button.module.scss'

const enum ButtonType {
  primary = 'primary',
  secondary = 'secondary'
  select = 'select'  
}

type TButtonType = keyof typeof ButtonType

type TButton = {
  type?: TButtonType
  size?: TFieldSize
  disabled?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.ForwardRefRenderFunction<
  HTMLButtonElement | HTMLAnchorElement,
  TButton
> = (props) => {
  const {
    type = ButtonType.primary,
    size = FieldSize.medium,
    disabled = false,
    text = 'Default text',
    style,
    onClick,
    ...rest
  } = props

  const classes = classNames(styles.button, {
    [styles[`button--${size}`]]: size,
    [styles[`button--${type}`]]: type,
    [styles[`button--disabled`]]: disabled
  })

  return (
    <button
      className={classes}
      style={{ ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}

export default Button

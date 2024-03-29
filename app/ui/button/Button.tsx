import classNames from 'classnames'

import { TFieldSize } from '@/types/ui'
import styles from './button.module.scss'

type TButtonType = 'primary' | 'secondary'

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
    type = 'primary',
    size = 'medium',
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

import styles from './button.module.scss'

import classNames from 'classnames'

type TButtonType = 'primary'
type TButtonShape = 'primary'
type TButtonSize = 'small' | 'medium' | 'large'

type TButton = {
  type?: TButtonType
  shape?: TButtonShape
  size?: TButtonSize
  disabled?: boolean
  children?: React.ReactNode
  style?: React.CSSProperties
  text?: string
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
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

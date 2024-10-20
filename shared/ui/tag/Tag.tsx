import classNames from 'classnames'

import { FieldSize, TFieldSize } from '@/types/ui'

import { CloseIcon } from '@/assets/icons'
import styles from './tag.module.scss'

export const Tag = (props: {
  name: string
  text: string
  size?: TFieldSize
  onClick?: (name: string) => void
}) => {
  const {
    text = 'Default text',
    size = FieldSize.small,
    onClick = () => {},
    name
  } = props

  const classes = classNames(styles.tag, {
    [styles[`tag--${size}`]]: size
  })

  return (
    <span className={classes}>
      <CloseIcon
        className={styles.tag__close}
        onClick={() => onClick(name)}
      />
      <span className={styles.tag__text}>{text}</span>
    </span>
  )
}

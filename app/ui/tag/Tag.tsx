import { CloseIcon } from '@/assets/icons'
import styles from './tag.module.scss'
import classNames from 'classnames';
import { TFieldSize } from '@/types/ui';

const Tag = (props: {
  text: string,
  size?: TFieldSize,
  onClick: (event: React.MouseEvent<HTMLOrSVGElement>) => void
}) => {
  const {
    text = 'Default text',
    size = 'small',
    onClick
  } = props;

  const classes = classNames(styles.tag, {
    [styles[`tag--${size}`]]: size
  })

  return (
    <span className={classes}>
      <CloseIcon className={styles.tag__close} onClick={onClick}/>
      <span className={styles.tag__text}>{text}</span>
    </span>
  )
}

export default Tag

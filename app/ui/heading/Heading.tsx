import { ReactNode } from 'react'
import styles from './heading.module.scss'
import { Link } from '@remix-run/react'

type THeadingProps = {
  children?: ReactNode
}

const Heading = (props: THeadingProps) => {
  return (
    <Link
      className={styles.heading__container}
      to={'/anime'}
    >
      <h3 className={styles.heading}>{props.children}</h3>
    </Link>
  )
}

export default Heading

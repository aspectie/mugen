import { ReactNode } from 'react'
import styles from './heading.module.scss'

type THeadingProps = {
  size: string
  children: ReactNode
}

const Heading = (props: THeadingProps) => {
  switch (props.size) {
    case 'h1': {
      return <h1 className={styles.heading}>{props.children}</h1>
    }
    case 'h2': {
      return <h2 className={styles.heading}>{props.children}</h2>
    }
    case 'h3': {
      return <h3 className={styles.heading}>{props.children}</h3>
    }
    case 'h4': {
      return <h4 className={styles.heading}>{props.children}</h4>
    }
    case 'h5': {
      return <h5 className={styles.heading}>{props.children}</h5>
    }
    case 'h6': {
      return <h6 className={styles.heading}>{props.children}</h6>
    }
  }
}

export default Heading

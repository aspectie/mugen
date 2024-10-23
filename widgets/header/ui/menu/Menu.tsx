import { Link } from '@remix-run/react'
import classNames from 'classnames'

import style from './menu.module.scss'

export type TLink = {
  title: string
  route: string
}

export const Menu = ({ links, isRow }: { links: TLink[]; isRow?: boolean }) => {
  const classes = classNames(style.nav__list, { [style.col]: isRow })

  return (
    <nav className={style.nav}>
      <ul className={classes}>
        {links.map(link => (
          <li
            key={link.route}
            className={style['nav__list-item']}
          >
            <Link to={link.route}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

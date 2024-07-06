import { Link } from '@remix-run/react'
import style from './menu.module.scss'
import classNames from 'classnames'

export type TLink = {
  title: string
  route: string
}

const Menu = ({ links, isRow }: { links: TLink[]; isRow?: boolean }) => {
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

export default Menu

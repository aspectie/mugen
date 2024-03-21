import style from './header.module.scss'
import logo from '/logo.svg'

export function Header() {
  const links: Array<any> = []
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        {/* TODO: replace with "a" remix link component */}
        <a href="/#">
          <img
            src={logo}
            alt="logo"
            className={style.header__logo}
          />
        </a>
        {/* TODO: create menu component */}
        <nav className={style.nav}>
          <ul className={style.nav__list}>
            {links.map((link) => (
              <li
                key={link.id}
                className={style['nav__list-item']}
              >
                <a href={link.link}>{link.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}

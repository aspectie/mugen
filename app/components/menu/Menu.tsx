import { Link } from '@remix-run/react';
import style from './menu.module.scss';

export type TLink = {
  title: string
  route: string
};

const Menu = ({ links } : { links: TLink[]}) => {
  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {links.map((link) => (
          <li key={link.route} className={style['nav__list-item']}>
            <Link to={link.route}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
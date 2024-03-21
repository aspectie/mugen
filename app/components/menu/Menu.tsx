import style from '@/components/menu/menu.module.scss';
import { Link } from '@remix-run/react';

const Menu = ({ links }) => {
  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {links.map((link) => (
          <li key={link.id} className={style['nav__list-item']}>
            <Link to={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;

import { Link } from '@remix-run/react';
import style from '@/components/menu/menu.module.scss';

type TLinks = {
    id: number,
    title: string,
    link: string,
};


const Menu = ({ links } : { links : TLinks}) => {
  return (
    <nav className={style.nav}>
      <ul className={style.nav__list}>
        {links.map((link : TLinks) => (
          <li key={link.id} className={style['nav__list-item']}>
            <Link to={link.link}>{link.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
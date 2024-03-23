import { Link } from '@remix-run/react';

import Menu, { TLink } from '@/components/menu/Menu';
import logo from '@/icons/logo.svg';
import style from './header.module.scss';

const Header = () => {
  const links: TLink[] = [];

  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        <Link to="/">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        <Menu links={links} />
      </div>
    </header>
  );
};

export default Header;

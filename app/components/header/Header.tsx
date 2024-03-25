import { Link } from '@remix-run/react';

import Menu, { TLink } from '@/components/menu/Menu';
import logo from '@/assets/icons/logo.svg';
import style from './header.module.scss';
import classNames from "classnames";

const Header = ({className} : {className : string}) => {
  const links: TLink[] = [];
  const classes  = classNames(
      [
          style.header__wrapper,
          className
      ]
  )

  return (
    <header className={style.header}>
      <div className={classes}>
        <Link to="/">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        <Menu links={links} />
      </div>
    </header>
  );
};

export default Header;

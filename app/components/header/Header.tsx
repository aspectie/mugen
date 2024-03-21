import style from './header.module.scss';
import {Link} from "@remix-run/react";
import logo from '../../../public/logo.svg';
import Menu from '../menu/Menu'

const Header = () => {
  return (
    <header className={style.header}>
      <div className={style.header__wrapper}>
        {/* TODO: replace with "a" remix link component */}
        <Link to="/">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        {/* TODO: create menu component */}
        <Menu />
      </div>
    </header>
  );
};

export default Header;

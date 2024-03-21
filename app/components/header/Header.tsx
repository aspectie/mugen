import style from './header.module.scss';
import { Link } from '@remix-run/react';
import logo from '../../../public/logo.svg';
import Menu from '../menu/Menu';

const Header = () => {
  const links = [
    {
      id: 1,
      title: 'Аниме',
      link: '/anime',
    },
  ];

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

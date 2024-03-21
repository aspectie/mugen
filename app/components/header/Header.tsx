import style from '@/components/header/header.module.scss';
import { Link } from '@remix-run/react';
// eslint-disable-next-line import/no-unresolved
import logo from '@public/logo.svg';
import Menu from '@/components/menu/Menu';

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

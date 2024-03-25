import { Link } from '@remix-run/react';

import Menu, { TLink } from '@/components/menu/Menu';
import logo from '@/assets/icons/logo.svg';
import style from './header.module.scss';

const Header = () => {
  const links: TLink[] = [
    {
      id: 1,
      title: 'Аниме',
      route: '123'
    }, {
      id: 2,
      title: 'Манга',
      route: '123'
    }
  ];

  return (
    <header className={style.header}>
      <div className={`container ${style.header__wrapper}`}>
        <Link to="/">
          <img src={logo} alt="logo" className={style.header__logo} />
        </Link>
        {links.length > 0 && <div className='ml-xl'>
          <Menu links={links} />
        </div>}
      </div>
    </header>
  );
};

export default Header;

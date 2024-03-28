import { Link } from '@remix-run/react';

import Menu, { TLink } from '@/components/menu/Menu';
import logo from '@/assets/icons/logo.svg';

const Header = () => {
  const links: TLink[] = [
    {
      title: 'Аниме',
      route: '/anime'
    }, {
      title: 'Манга',
      route: '/manga'
    }
  ];

  return (
    <header className="sticky top-[0] w-full py-s bg-black-100">
      <div className="container flex m-auto items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="-mt-s">
            <img src={logo} alt="Логотип"/>
          </Link>
          {links.length > 0 &&
            <div className='ml-xl'>
              <Menu links={links} />
            </div>}
        </div>
        <div>
          <Link to="/login"><p className="text-white font-bold hover:text-accent-100">Войти</p></Link>
        </div>
      </div>
    </header>
  );
};

export default Header;

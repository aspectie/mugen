import { Link } from '@remix-run/react';

import Menu, { TLink } from '@/components/menu/Menu';
import {LogoIcon} from '@/assets/icons';
import Search from '@/ui/search/Search'
import LanguageToggle from '@/components/language-toggle/LanguageToggle'

const Header = () => {
  const links: TLink[] = [
    {
      title: 'Аниме',
      route: '/anime'
    },
    {
      title: 'Манга',
      route: '/manga'
    }
  ]

  return (
    <header className="sticky z-50 top-[0] w-full py-s bg-black-100">
      <div className="container flex m-auto items-center justify-between">
        <div className="flex items-center">
          <Link
            to="/"
            className="-mt-s"
          >
            <LogoIcon />
          </Link>
          {links.length > 0 && (
            <div className="ml-xl">
              <Menu links={links} />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex gap-4xl items-center">
            <Search placeholder="аниме, манга, студия..." />
            <Link to="/login">
              <p className="text-white font-bold hover:text-accent-100">
                Войти
              </p>
            </Link>
          </div>
          <div className="ml-m">
            <LanguageToggle />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;

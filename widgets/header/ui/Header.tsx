import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { LogoIcon } from '@/assets/icons'
import { Menu, TLink } from './menu/Menu'
import { HeaderSearch } from './search/HeaderSearch'

export const Header = () => {
  const { t } = useTranslation(['default', 'account'])

  const links: TLink[] = [
    {
      title: t('anime'),
      route: '/anime'
    },
    {
      title: t('manga'),
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
            <div className="ml-xl hidden md:block">
              <Menu links={links} />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex md:gap-4xl gap-m items-center text-white">
            <div className="hidden md:block">
              <HeaderSearch />
            </div>
            <Link to="/login">
              <p className="text-white font-bold hover:text-accent-100">
                {t('sign in', { ns: 'account' })}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

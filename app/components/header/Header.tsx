import { Link } from '@remix-run/react'

import Menu, { TLink } from '@/components/menu/Menu'
import { LogoIcon } from '@/assets/icons'
import Search from '@/ui/search/Search'
import LanguageToggle from '@/components/language-toggle/LanguageToggle'

import { useTranslation } from 'react-i18next'

const Header = () => {
  let { t } = useTranslation()

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
            <div className="ml-xl">
              <Menu links={links} />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex gap-4xl items-center text-white">
            <Search placeholder={t('header search placeholder')} />
            <Link
              to="/login"
              className="transition ease-in delay-100 hover:text-accent-120"
            >
              {t('login')}
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

export default Header

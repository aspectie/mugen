import { Link } from '@remix-run/react';
import { useTranslation } from 'react-i18next'

import { useSearch } from '@/hooks/useSearch'
import { LogoIcon } from '@/assets/icons'
import Search from '@/ui/search/Search'
import Menu, { TLink } from '@/components/menu/Menu'
import LanguageToggle from '@/components/language-toggle/LanguageToggle'

const Header = () => {
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
            <div className="ml-xl">
              <Menu links={links} />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex gap-4xl items-center text-white">
            <HeaderSearch />
            <Link to="/login">
              <p className="text-white font-bold hover:text-accent-100">
                {t('sign in', { ns: 'account' })}
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

function HeaderSearch() {
  const { t } = useTranslation()
  const { setSearch } = useSearch()

  function onKeyDown(e: KeyboardEvent & { target: HTMLInputElement }) {
    if (e.code === 'Enter' && e.target) {
      setSearch(e.target.value)
    }
  }

  return (
    <Search
      placeholder={t('header search placeholder')}
      onKeyDown={onKeyDown}
    />
  )
}

export default Header

import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { LogoIcon } from '@/assets/icons'
import { Search } from 'shared/ui'
import Menu, { TLink } from '@/components/menu/Menu'
import { useQuery } from '@/hooks/useQuery'

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
    },
    {
      title: 'Тест',
      route: '/test'
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

function HeaderSearch() {
  const { t } = useTranslation()
  const { setQuerySearch } = useQuery()

  function onKeyDown(e: KeyboardEvent & { target: HTMLInputElement }) {
    if (e.code === 'Enter' && e.target) {
      setQuerySearch(e.target.value)
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

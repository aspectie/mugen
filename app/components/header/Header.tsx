import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { LogoIcon, MobileMenu } from '@/assets/icons'
import Search from '@/ui/search/Search'
import Menu, { TLink } from '@/components/menu/Menu'
import { useQuery } from '@/hooks/useQuery'
import { useEffect, useRef, useState } from 'react'
import { useOutsideClick } from '@/hooks/useOutsideClick'

const Header = () => {
  const { t } = useTranslation(['default', 'account'])
  const mobileMenuRef = useRef(null)
  const [isMobileMenuShow, setIsMobileMenuShow] = useState(false)
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

  useEffect(() => {
    if (isMobileMenuShow) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }, [isMobileMenuShow])

  const toggleMobileMenu = () => {
    setIsMobileMenuShow(!isMobileMenuShow)
  }

  useOutsideClick(mobileMenuRef, () => setIsMobileMenuShow(false))

  return (
    <header className="py-xs sticky z-50 top-[0] sm:py-s sm:relative bg-black-100">
      <div className="container flex m-auto items-center justify-between relative">
        <div className="flex items-center">
          <button
            className="text-accent-80 p-xs mr-s sm:hidden"
            onClick={() => toggleMobileMenu()}
          >
            <MobileMenu />
          </button>
          <Link
            to="/"
            className="-mt-xs"
          >
            <LogoIcon />
          </Link>
          {links.length > 0 && (
            <div className="ml-xl hidden sm:block">
              <Menu links={links} />
            </div>
          )}
        </div>
        <div className="flex">
          <div className="flex md:gap-4xl gap-m items-center text-white">
            <div className="hidden sm:block">
              <HeaderSearch />
            </div>
            <Link to="/login">
              <p className="text-white font-bold hover:text-accent-100 pr-s">
                {t('sign in', { ns: 'account' })}
              </p>
            </Link>
          </div>
        </div>
      </div>
      {isMobileMenuShow && (
        <>
          <div
            ref={mobileMenuRef}
            className="w-2/3 absolute z-[99] bg-black-100 text-black-100 top-[-48] left-[0] py-s px-s h-[100vh] font-black "
          >
            <Menu
              links={links}
              isRow
            />
          </div>
          <div className="w-full h-[100vh] absolute z-[98] left-0 top-0 bg-black-100 opacity-90" />
        </>
      )}
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

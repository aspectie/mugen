import { NavLink } from '@remix-run/react'
import { useTranslation } from 'react-i18next'
import LanguageToggle from '@/components/language-toggle/LanguageToggle'
import { LogoIcon } from '@/assets/icons'
import ThemeToggle from '@/components/theme-toggle/ThemeToggle'

const Footer = () => {
  const { t } = useTranslation(['default'])

  return (
    <footer className="bg-black-100 text-gray-20 py-s sm:py-m md:py-l lg:py-xl">
      <section className="container">
        <ul className="p-m bg-black-80 rounded min-w-[200px] flex flex-col gap-m sm:min-w-full">
          <li className="hover:text-accent-100 hover:cursor-pointer w-fit">
            <NavLink to="/anime">{t('anime')}</NavLink>
          </li>
          <li className="hover:text-accent-100 hover:cursor-pointer w-fit">
            <NavLink to="/manga">{t('manga')}</NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <LogoIcon />
        </NavLink>
        <div className="flex justify-between sm:max-w-xs">
          <div className="sm:max-w-1/2">
            <LanguageToggle />
          </div>
          <div className="sm:max-w-1/2">
            <ThemeToggle />
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer

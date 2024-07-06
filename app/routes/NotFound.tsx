import { Link } from '@remix-run/react'
import { NotFoundIcon } from '@/assets/icons'
import { useTranslation } from 'react-i18next'

export const handle = { i18n: ['404'] }

export default function NotFound() {
  const { t } = useTranslation('404')
  return (
    <main className="container py-s sm:py-m md:py-l lg:py-xl text-black-100 min-h-[100vh] flex flex-col justify-center gap-l">
      <div className="mx-auto text-center">
        <h1 className="text-[48px] mb-m text-black-80 font-bold">
          {t('page not found')}
        </h1>
        <h3 className="text-black-60 mb-s">{t('sorry, page not found')}</h3>
        <Link to="/">
          <h3 className="text-accent-80 hover:text-accent-120">
            {t('go to home')}
          </h3>
        </Link>
      </div>
      <div className="w-full md:w-[80%] mx-auto inline-block">
        <NotFoundIcon />
      </div>
    </main>
  )
}

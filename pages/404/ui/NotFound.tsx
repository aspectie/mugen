import { Link } from '@remix-run/react'
import { useTranslation } from 'react-i18next'

import { NotFoundIcon } from '@/assets/icons'

export function NotFoundPage() {
  const { t } = useTranslation('404')

  return (
    <main className="container py-s sm:py-s md:py-l lg:py-l text-black-100 flex flex-col justify-center items-center">
      <div className="text-center flex justify-center items-center">
        <div className="flex flex-col items-center gap-s">
          <h1 className="text-xl text-black-80 md:text-3xl font-semibold">
            {t('page not found')}
          </h1>
          <h3 className="text-s md:text-m sm:w-2/3 text-black-60">
            {t('sorry, page not found')}
          </h3>
          <Link
            to="/"
            className="underline text-accent-80 hover:text-accent-120"
          >
            <h3 className="text-xs md:text-m">{t('go to home')}</h3>
          </Link>
        </div>
      </div>
      <div className="mt-xl md:mt-4xl w-full md:w-2/3 lg:w-3/5 mb-s">
        <NotFoundIcon className="w-full h-full" />
      </div>
    </main>
  )
}

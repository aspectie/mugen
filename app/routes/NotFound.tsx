import { Link } from "@remix-run/react"
import {NotFoundIcon} from '@/assets/icons'
import { useTranslation } from 'react-i18next'

export const handle = { i18n: ['404'] }

export default function NotFound() {
  const { t } = useTranslation('404')
  return (
    <div className="h-screen relative">
      <div className="lg:h-3/5 h-full text-center lg:block flex items-center">
        <div className="lg:pt-[10%] absolute w-full">
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
      </div>
      <div className="bg-gray-60 lg:h-2/5 lg:block hidden lg:relative absolute w-full bottom-[0]">
        <div className="absolute top-[-120px] w-full lg:block hidden">
          <NotFoundIcon className="m-auto" />
        </div>
      </div>
    </div>
  )
}
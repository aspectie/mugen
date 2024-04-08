import { Link } from "@remix-run/react"
import {NotFoundIcon} from '@/assets/icons'
import { useTranslation } from 'react-i18next'

export const handle = { i18n: ['404'] }

export default function NotFound() {
  const { t } = useTranslation('404')
  return (
    <div className="h-screen">
      <div className="h-3/5 text-center">
        <div className="pt-[10%] absolute w-full">
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
      <div className="bg-gray-60 h-2/5 relative">
        <div className="absolute top-[-120px] w-full ">
          <NotFoundIcon className="m-auto" />
        </div>
      </div>
    </div>
  )
}
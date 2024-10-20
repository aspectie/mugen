import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@/ui/button/Button'
import { EN, RU } from '@/constants/locales'

function LanguageToggle() {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  useEffect(() => {
    if (!window.localStorage.getItem('lang')) {
      window.localStorage.setItem('lang', lang)
    }
    setLang(window.localStorage.getItem('lang')!)
    i18n.changeLanguage(window.localStorage.getItem('lang')!).finally()
  }, [lang, i18n.language, i18n])

  const toggleLanguage = () => {
    const toggledLang = lang === EN ? RU : EN
    setLang(toggledLang)
    window.localStorage.setItem('lang', toggledLang)
    // TODO: delegate to search ?lng=
    i18n.changeLanguage(toggledLang).finally()
  }

  return (
    <Button
      text={lang === RU ? 'Русский' : 'English'}
      type="secondary"
      size="small"
      onClick={() => {
        toggleLanguage()
      }}
    />
  )
}

export default LanguageToggle

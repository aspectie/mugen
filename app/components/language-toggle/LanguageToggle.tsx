import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Button from '@/ui/button/Button'

function LanguageToggle() {
  const { i18n } = useTranslation()
  const [lang, setLang] = useState(i18n.language)

  const toggleLanguage = () => {
    const toggledLang = lang === 'ru' ? 'en' : 'ru'
    setLang(toggledLang)
    // TODO: delegate to search ?lng=
    i18n.changeLanguage(toggledLang)
  }

  return (
    <Button
      text={lang}
      type="secondary"
      size="small"
      onClick={() => {
        toggleLanguage()
      }}
    />
  )
}

export default LanguageToggle

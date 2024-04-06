import Button from '@/ui/button/Button'
import { getLang, getToggledLangPath } from '@/utils/locale'
import { Link, useLocation, useParams } from '@remix-run/react'
import { useState } from 'react'

function LanguageToggle() {
  const { pathname } = useLocation()
  const params = useParams()

  const [lang, setLang] = useState(getLang(params) || 'ru')

  const newPath = getToggledLangPath(getLang(params), pathname)

  const toggleLanguage = () => {
    const toggledLang = lang === 'ru' ? 'en' : 'ru'
    setLang(toggledLang)
  }

  return (
    <Link to={newPath}>
      <Button
        text={lang}
        type="secondary"
        size="small"
        onClick={() => {
          toggleLanguage()
        }}
      />
    </Link>
  )
}

export default LanguageToggle

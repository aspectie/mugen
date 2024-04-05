import { useTranslation } from 'react-i18next'
import { CONSTANTS } from '@/constants'

const { RU } = CONSTANTS

export function isRussianLang() {
  const { i18n } = useTranslation()
  return i18n.language === RU
}

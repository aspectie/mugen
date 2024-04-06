import { useTranslation } from 'react-i18next'
import { CONSTANTS } from '@/constants'
import { Params } from '@remix-run/react'

const { RU, EN } = CONSTANTS

export function isRussianLang() {
  const { i18n } = useTranslation()
  return i18n.language === RU
}

export function getLang(params: Params<string>) {
  if (!params.lang || (params.lang !== RU && params.lang !== EN)) {
    return
  }
  return params.lang
}

export function getToggledLangPath(lang: string | undefined, path: string) {
  let newPath = path
  if (!lang) {
    newPath = `/en${path}`
  }
  if (lang === EN) {
    newPath = path.replace(/^\/en/, 'ru')
  }
  if (lang === RU) {
    newPath = path.replace(/^\/ru/, 'en')
  }
  return newPath
}
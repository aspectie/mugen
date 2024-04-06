import { CONSTANTS } from '@/constants'
import { Params } from '@remix-run/react'

const { RU, EN } = CONSTANTS

export function getLang(params: Params<string>) {
  if (!params.lang || (params.lang !== RU && params.lang !== EN)) {
    return
  }
  return params.lang
}

export function getToggledLangPath(lang: string | undefined, path: string) {
  let newPath = path

  if (!lang) {
    newPath = `/${EN + path}`
  }
  if (lang === EN) {
    newPath = path.replace(/^\/en/, RU)
  }
  if (lang === RU) {
    newPath = path.replace(/^\/ru/, EN)
  }
  return newPath
}

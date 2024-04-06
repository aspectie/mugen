import { LooseObject } from '@/types'

// TODO: fix types
export function castToAnother(item, mapping) {
  const res: LooseObject = {}

  Object.keys(mapping).map((key) => {
    const resKey = mapping[key]
    if (Object.keys(item).includes(resKey)) {
      res[key] = item[resKey]
    }
    if (typeof resKey === 'object') {
      res[key] = castToAnother(item, resKey)
    }
  })

  return res
}

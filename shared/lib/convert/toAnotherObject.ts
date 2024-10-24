// TODO: fix types
export function toAnotherObject<
  T extends object,
  M extends Record<string, keyof Partial<T>>
>(item: T, mapping: M) {
  const res: any = {}

  Object.keys(mapping).map(key => {
    const mapValue = mapping[key as keyof M]
    if (typeof mapValue === 'string') {
      if (Object.keys(item).includes(mapValue)) {
        res[key as keyof M] = item[mapValue as keyof T]
      }
    } else if (typeof mapValue === 'object') {
      res[key] = toAnotherObject(item, mapValue)
    }
  })

  return res as Record<keyof M, any>
}

export function toList(
  array: Record<string, any>[],
  key: string,
  separator: string
): string {
  return array.reduce((acc, el, index) => {
    if (!Object.hasOwn(el, key)) {
      return ''
    }
    return index < array.length - 1
      ? acc + el[key] + separator + ' '
      : acc + el[key]
  }, '')
}

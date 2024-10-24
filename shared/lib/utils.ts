export function clearHTML(text: string): string {
  return text.replace(/<[^>]+>/g, '')
}

// TODO: remove when remix will support typescript 5.4
// @ts-expect-error
export function groupBy(array, key) {
  return array && array instanceof Array
    ? array.reduce((acc, value) => {
        const keyValue = value[key]
        ;(acc[keyValue] = acc[keyValue] || []).push(value)
        return acc
      }, {})
    : array
}

export type LooseObject = {
  [key: string]: any
}

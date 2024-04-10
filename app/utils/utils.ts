export function clearHTML(text: string): string {
  return text.replace(/<[^>]+>/g, '');
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

export function convertToDashed(value: string): string {
  return value.split(' ').reduce((previous, current, index) => {
    const clearedValue = current
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLocaleLowerCase()

    return index > 0 ? `${previous}-${clearedValue}` : clearedValue
  }, '')
}

export function convertObjectsArrayToList(
  array: Record<string, any>[],
  key: string,
  separator: string
): string {
  return array.reduce((acc, el, index) => {
    return index < array.length - 1
      ? acc + el[key] + separator + ' '
      : acc + el[key]
  }, '')
}

// TODO: fix types
export function urlParamsToObject(params) {
  const obj = {}
  const searchParams = new URLSearchParams(params)

  for (const [key, value] of searchParams) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value)
      } else {
        obj[key] = [obj[key], value]
      }
    } else {
      obj[key] = value
    }
  }

  return obj
}

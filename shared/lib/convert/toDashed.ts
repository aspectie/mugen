export function toDashed(value: string): string {
  if (!value.trim()) {
    return ''
  }
  if (/^[a-z0-9]+(-[a-z0-9]+)*$/.test(value)) {
    return value
  }

  return value.split(' ').reduce((previous, current, index) => {
    const clearedValue = current
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLocaleLowerCase()

    return index > 0 ? `${previous}-${clearedValue}` : clearedValue
  }, '')
}

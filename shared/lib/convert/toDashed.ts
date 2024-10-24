export function toDashed(value: string): string {
  return value.split(' ').reduce((previous, current, index) => {
    const clearedValue = current
      .replace(/[^a-zA-Z0-9]/g, '')
      .toLocaleLowerCase()

    return index > 0 ? `${previous}-${clearedValue}` : clearedValue
  }, '')
}

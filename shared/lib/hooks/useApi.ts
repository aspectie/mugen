export function useApi<T extends (...args: any[]) => any>(
  adapter: T
): ReturnType<T> {
  const _adapter = adapter()

  let res = {} as ReturnType<T>
  Object.keys(_adapter).map((key) => {
    res[key] = _adapter[key]
  })

  return res
}

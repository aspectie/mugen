import { urlParamsToObject } from '@/utils/utils'
import { useSearchParams } from '@remix-run/react'
import { useMemo } from 'react'

const PARSE = (x: string) => JSON.parse(atob(x))
const STRINGIFY = (x: unknown) => btoa(JSON.stringify(x))

// TODO: use react-singleton-hook ?
// TODO: fix types
export function useSearch(initialValues = '') {
  const [searchParams, setSearchParams] = useSearchParams()

  const params = urlParamsToObject(searchParams)

  const search = useMemo(() => {
    return params.search ? PARSE(params.search) : initialValues
  }, [initialValues, params.search])

  const setSearch = (newSearchData) => {
    const stringifiedSearch = STRINGIFY({
      ...newSearchData
    })
    let updatedParams = {
      ...params,
      search: stringifiedSearch
    }
    if (newSearchData.trim() === '') {
      updatedParams = {}
    }

    setSearchParams(updatedParams)
  }

  return { search, setSearch }
}

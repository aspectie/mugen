import { TFilterSelects } from '@/types/ui/filter'
import { useSearchParams } from '@remix-run/react'
import { useEffect, useState } from 'react'

export function useQuery(
  initialValue = {
    search: '',
    filter: {}
  }
) {
  const [searchParams, setSearchParams] = useSearchParams()

  const [search, setSearch] = useState(initialValue.search)
  const [filter, setFilter] = useState(initialValue.filter)

  const setQuerySearch = (newSearchData: string) => {
    setSearch(newSearchData)
  }

  const setQueryParams = (_params: TFilterSelects) => {
    let res = {}

    Object.entries(_params).map(entry => {
      const key = entry[0]
      const value = entry[1]
      res[key] = value.map(v => (v.id ? v.id : v.name)).toString()
    })

    setFilter(res)
  }

  useEffect(() => {
    const res = {
      ...filter
    }
    if (search.trim() !== '') {
      res.search = search
    }
    setSearchParams(res)
  }, [search, filter])

  return { setQuerySearch, setQueryParams }
}

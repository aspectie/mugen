import { useTranslation } from 'react-i18next'

import { Search } from 'shared/ui'
import { useQuery } from '@/hooks/useQuery'

export function HeaderSearch() {
  const { t } = useTranslation()
  const { setQuerySearch } = useQuery()

  function onKeyDown(e: KeyboardEvent & { target: HTMLInputElement }) {
    if (e.code === 'Enter' && e.target) {
      setQuerySearch(e.target.value)
    }
  }

  return (
    <Search
      placeholder={t('header search placeholder')}
      onKeyDown={onKeyDown}
    />
  )
}

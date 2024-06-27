import { ChangeEvent, forwardRef, KeyboardEvent } from 'react'
import Input from '@/ui/input/Input'
import { FieldSize, InputType, TFieldSize } from '@/types/ui'
import { SearchIcon } from '@/assets/icons'
import styles from './search.module.scss'

type TSearch = {
  size?: TFieldSize
  disabled?: boolean
  placeholder?: string
  value?: string
  name?: string
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void
}

const Search = forwardRef<HTMLInputElement, TSearch>((props, ref) => {
  const {
    size = FieldSize.small,
    placeholder = 'default placeholder',
    disabled = false,
    name,
    onInputChange,
    onKeyDown,
    value
  } = props

  return (
    <div className={styles.search}>
      <Input
        type={InputType.transparent}
        size={size}
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        disabled={disabled}
        ref={ref}
      />
      <span className="px-s">
        <SearchIcon className="cursor-pointer w-m min-w-m h-m" />
      </span>
    </div>
  )
})

Search.displayName = 'Search'

export default Search

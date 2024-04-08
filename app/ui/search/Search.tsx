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
  onChange?: any
  onKeyDown?: any
}

const Search = (props: TSearch) => {
  const {
    size = FieldSize.small,
    placeholder = 'default placeholder',
    disabled = false,
    value,
    name,
    onChange,
    onKeyDown
  } = props
  return (
    <div className={styles.search}>
      <Input
        type={InputType.transparent}
        size={size}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <span className="px-s">
        <SearchIcon className="cursor-pointer w-m min-w-m h-m" />
      </span>
    </div>
  )
}

export default Search

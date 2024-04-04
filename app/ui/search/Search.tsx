import Input from "@/ui/input/Input";
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
}

const Search = (props: TSearch) => {
  const {
    size = FieldSize.small,
    placeholder = 'default placeholder',
    disabled = false,
    value,
    name,
    onChange
  } = props

  return (
    <div className={styles.search}>
      <Input
        size={size}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
        type={InputType.transparent}
      />
      <span className="px-s">
        <SearchIcon
          className="cursor-pointer w-m min-w-m h-m"
          onClick={onChange}
        />
      </span>
    </div>
  )
}

export default Search;
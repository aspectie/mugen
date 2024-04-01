import Input from "@/ui/input/Input";
import {TFieldSize} from "@/types/ui";
import {SearchIcon} from "@/assets/icons";
import styles from "./search.module.scss"

type TSearch = {
    size?: TFieldSize
    disabled?: boolean
    placeholder?: string
    value?: string
    name?: string
    onChange?: any
}

const Search = (props:TSearch) => {
    const {
        size = 'small',
        placeholder = 'default placeholder',
        disabled = false,
        value,
        name,
        onChange
    } = props
    return (
        <div className={styles.search}>
            <Input size={size}
                   placeholder={placeholder}
                   value={value}
                   name={name}
                   disabled={disabled}>

            </Input>
            <SearchIcon className={styles["search__icon"]} onClick={onChange}/>
        </div>

    )
}

export default Search;
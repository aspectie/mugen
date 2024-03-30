import { ChangeEventHandler } from "react"
import style from "./checkbox.module.scss"

const Checkbox = ({text, id, onChange, checked} : {
    text: string
    id: string
    onChange: ChangeEventHandler
    checked: boolean
}) => {
    return (
        <label htmlFor={id} className={style.label}>
            <input className={style.checkbox}
                type="checkbox"
                id={id}
                name={id}
                onChange={onChange}
                checked={checked}
            />
            {text}
        </label>
    )
}

export default Checkbox
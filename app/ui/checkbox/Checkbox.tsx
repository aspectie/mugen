import { ChangeEventHandler } from "react"
import style from "./checkbox.module.scss"

const Checkbox = ({text, id, onChange} : {
    text: string
    id: string
    onChange: ChangeEventHandler
}) => {
    return (
        <label htmlFor={id} className={style.label}>
            <input className={style.checkbox}
                type="checkbox"
                id={id}
                name={id}
                onChange={onChange}
            />
            {text}
        </label>
    )
}

export default Checkbox
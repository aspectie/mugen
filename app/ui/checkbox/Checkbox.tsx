import style from "./checkbox.module.scss"

const Checkbox = ({value} : {value : string}) => {

    return (
        <label htmlFor="genre" className={style.checkbox}>
            <input className={style["visually-hidden"]} type="checkbox" id="genre" name="genre"></input>
            <span></span>
            {value}
        </label>
    )
}

export default Checkbox
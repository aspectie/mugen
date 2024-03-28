import style from "./checkbox.module.scss"

const Checkbox = ({text} : {text : string}) => {

    return (
        <label htmlFor="genre" className={style.label}>
            <input className={style["checkbox"]} type="checkbox" id="genre" name="genre"></input>
            <span></span>
            {text}
        </label>
    )
}

export default Checkbox
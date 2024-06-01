import style from './checkbox.module.scss'

const Checkbox = ({
  text,
  id,
  onChange,
  isChecked
}: {
  text: string
  id: string
  onChange: () => void
  isChecked: boolean
}) => {
  return (
    <label
      htmlFor={id}
      className={style.label}
    >
      <input
        className={style.checkbox}
        type="checkbox"
        id={id}
        name={id}
        onChange={onChange}
        checked={isChecked}
      />
      {text}
    </label>
  )
}

export default Checkbox

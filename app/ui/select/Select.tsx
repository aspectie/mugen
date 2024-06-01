import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react'
import Button from '@/ui/button/Button'
import Checkbox from '@/ui/checkbox/Checkbox'
import { ButtonJustify, ButtonType, FieldSize, TOption } from '@/types/ui'
import { TSelect } from '@/types/ui/select'
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons'
import { useOutsideClick } from '@/hooks/useOutsideClick'

import styles from './select.module.scss'

const Select = (props: TSelect): ReactElement => {
  const {
    options,
    isMulti = false,
    size = FieldSize.medium,
    disabled = false,
    justify = ButtonJustify.between,
    placeholder = 'Default text',
    isChecked,
    onClick,
    id
  } = props

  const [icon, setIcon] = useState(<ArrowDownIcon />)
  const [isOpened, setIsOpened] = useState(false)
  const [placeholderText, setPlaceholderText] = useState(placeholder)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const toggleDropdown = (event: MouseEvent) => {
    event.preventDefault()
    setIsOpened(!isOpened)
  }

  const onOptionClick = (option: TOption, event: MouseEvent) => {
    // updateOptions(option.name, option.title)
    setPlaceholderText(option.title)
    toggleDropdown(event)
  }

  useEffect(() => {
    setPlaceholderText(placeholder)
  }, [placeholder])

  useEffect(() => {
    setIcon(isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />)
  }, [isOpened])

  useOutsideClick(dropdownRef, () => setIsOpened(false))

  return (
    <div
      className={styles.select}
      ref={dropdownRef}
    >
      <Button
        type={ButtonType.secondary}
        size={size}
        text={placeholderText}
        justify={justify}
        disabled={disabled}
        onClick={toggleDropdown}
        suffix={icon}
      />
      {isOpened && (
        <ul className={styles.options}>
          {options.map(option =>
            isMulti ? (
              <li
                className={styles.option}
                key={option.name}
              >
                <Checkbox
                  id={option.name}
                  text={option.title}
                  isChecked={isChecked(option, id!)}
                  onChange={() => onClick(option, id!)}
                />
              </li>
            ) : (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
              <li
                className={styles.option}
                key={option.name}
                onClick={() => onOptionClick(option)}
              >
                {option.title}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}

export default Select

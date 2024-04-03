import Button from '@/ui/button/Button'
import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import Checkbox from '@/ui/checkbox/Checkbox'
import { ButtonType, FieldSize, TFieldSize } from '@/types/ui'
import { KeyboardArrowDown, KeyboardArrowUp } from '@/assets/icons'

import styles from './select.module.scss'

type TOption = {
  label: string
  value: string
}
type TSelect = {
  options: TOption[]
  isMulti?: boolean
  size?: TFieldSize
  disabled?: boolean
  align?: string
  children?: React.ReactNode
  style?: React.CSSProperties
  placeholder?: string
}
const Select: React.ForwardRefRenderFunction<HTMLSelectElement, TSelect> = (
  props: TSelect
) => {
  const {
    options,
    isMulti = false,
    size = FieldSize.medium,
    disabled = false,
    align = 'between',
    placeholder = 'Default text'
  } = props

  const [icon, setIcon] = useState(<KeyboardArrowDown />)
  const [isOpened, setIsOpened] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [placeholderText, setPlaceholderText] = useState(placeholder)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpened(!isOpened)
    setIcon(!isOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />)
  }

  const updateOptions = (value: string) => {
    if (selectedOptions.includes(value)) {
      const options = selectedOptions.filter(item => item !== value)
      setSelectedOptions([...options])
    } else {
      setSelectedOptions([...selectedOptions, value])
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false)
      setIcon(isOpened ? <KeyboardArrowUp /> : <KeyboardArrowDown />)
    }
  }

  const onOptionClick = (option: TOption) => {
    updateOptions(option.value)
    setPlaceholderText(option.label)
    toggleDropdown()
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return (
    <div
      className={styles.select}
      ref={dropdownRef}
    >
      <Button
        type={ButtonType.secondary}
        size={size}
        text={placeholderText}
        align={align}
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
                key={option.value}
              >
                <Checkbox
                  id={option.value}
                  text={option.label}
                  onChange={() => updateOptions(option.value)}
                  isChecked={selectedOptions.includes(option.value)}
                />
              </li>
            ) : (
              <li
                className={styles.option}
                key={option.value}
                onClick={() => onOptionClick(option)}
              >
                {option.label}
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}

export default Select

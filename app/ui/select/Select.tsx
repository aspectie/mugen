import Button from '@/ui/button/Button'
import React, { useEffect, useRef, useState } from 'react'
import Checkbox from '@/ui/checkbox/Checkbox'
import {
  ButtonJustify,
  ButtonType,
  FieldSize,
  TFieldSize,
  TOption
} from '@/types/ui'
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons'

import styles from './select.module.scss'

type TSelect = {
  options: TOption[]
  isMulti?: boolean
  size?: TFieldSize
  disabled?: boolean
  justify?: ButtonJustify
  children?: React.ReactNode
  style?: React.CSSProperties
  placeholder?: string
  onChange?: (options: string[]) => void
  selectedOptions?: string[]
}
const Select: React.ForwardRefRenderFunction<HTMLSelectElement, TSelect> = (
  props: TSelect
) => {
  const {
    options,
    isMulti = false,
    size = FieldSize.medium,
    disabled = false,
    justify = ButtonJustify.between,
    placeholder = 'Default text',
    onChange = () => {},
    selectedOptions = []
  } = props

  const [icon, setIcon] = useState(<ArrowDownIcon />)
  const [isOpened, setIsOpened] = useState(false)
  const [placeholderText, setPlaceholderText] = useState(placeholder)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpened(!isOpened)
  }

  const removeOption = (value: string) => {
    const newValue = selectedOptions.filter(option => option.name !== value)
    onChange(newValue)
  }

  const addOption = (name: string, title) => {
    const newValue = [...selectedOptions, { name: name, title: title }]
    onChange(newValue)
  }

  const updateOptions = (value: string, label) => {
    if (selectedOptions.some(option => option.name === value)) {
      removeOption(value)
    } else {
      addOption(value, label)
    }
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpened(false)
    }
  }

  const onOptionClick = (option: TOption) => {
    updateOptions(option.value, option.label)
    setPlaceholderText(option.label)
    toggleDropdown()
  }

  // TODO: to be moved
  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    setPlaceholderText(placeholder)
  }, [placeholder])

  useEffect(() => {
    setIcon(isOpened ? <ArrowUpIcon /> : <ArrowDownIcon />)
  }, [isOpened])

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
                key={option.value}
              >
                <Checkbox
                  id={option.value}
                  text={option.label}
                  onChange={() => updateOptions(option.value, option.label)}
                  isChecked={selectedOptions.some(
                    selectedOption => selectedOption.name === option.value
                  )}
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

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
  onChange?: (options: TOption[]) => void
  selectedOptions?: TOption[]
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

  const removeOption = (name: string) => {
    const newValue: TOption[] = selectedOptions.filter(
      (option: TOption) => option.name !== name
    )

    onChange(newValue)
  }

  const addOption = (name: string, title: string) => {
    const newValue: TOption[] = [
      ...selectedOptions,
      { name: name, title: title }
    ]
    onChange(newValue)
  }

  const updateOptions = (name: string, title: string) => {
    if (selectedOptions.some((option: TOption) => option.name === name)) {
      removeOption(name)
    } else {
      addOption(name, title)
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
    updateOptions(option.name, option.title)
    setPlaceholderText(option.title)
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
                key={option.name}
              >
                <Checkbox
                  id={option.name}
                  text={option.title}
                  onChange={() => updateOptions(option.name, option.title)}
                  isChecked={selectedOptions.some(
                    (selectedOption: TOption) =>
                      selectedOption.name === option.name
                  )}
                />
              </li>
            ) : (
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

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
import { useOutsideClick } from '@/hooks/useOutsideClick'

type TSelect = {
  options: TOption[]
  selectName?: string | undefined
  isMulti?: boolean
  size?: TFieldSize
  disabled?: boolean
  justify?: ButtonJustify
  children?: React.ReactNode
  style?: React.CSSProperties
  placeholder?: string
  updateOptions?: (name: string | undefined, option: TOption) => void
  selectedOptions?: TOption[]
}
const Select: React.ForwardRefRenderFunction<HTMLSelectElement, TSelect> = (
  props: TSelect
) => {
  const {
    options,
    selectName,
    isMulti = false,
    size = FieldSize.medium,
    disabled = false,
    justify = ButtonJustify.between,
    placeholder = 'Default text',
    updateOptions,
    selectedOptions
  } = props

  const [icon, setIcon] = useState(<ArrowDownIcon />)
  const [isOpened, setIsOpened] = useState(false)
  const [placeholderText, setPlaceholderText] = useState(placeholder)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpened(!isOpened)
  }

  const onOptionClick = (option: TOption) => {
    // updateOptions(option.name, option.title)
    setPlaceholderText(option.title)
    toggleDropdown()
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
      {isOpened && selectedOptions && updateOptions && (
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
                  onChange={() => updateOptions(selectName, option)}
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

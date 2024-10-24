import { MouseEvent, ReactElement, useEffect, useRef, useState } from 'react'
import { Button } from '@shared/ui'
import { Checkbox } from '@shared/ui'
import { ButtonJustify, ButtonType } from '@shared/ui'
import { FieldSize, TOption } from '@/types/ui'
import { TSelect } from '@/types/ui/select'
import { ArrowDownIcon, ArrowUpIcon } from '@/assets/icons'
import { useOutsideClick } from '@shared/lib'

import styles from './select.module.scss'
import { useTranslation } from 'react-i18next'

export const Select = (props: TSelect): ReactElement => {
  const {
    options,
    isMulti = false,
    size = FieldSize.medium,
    disabled = false,
    justify = ButtonJustify.between,
    placeholder = 'Default text',
    value = [],
    onChange
  } = props

  const [icon, setIcon] = useState(<ArrowDownIcon />)
  const [isOpened, setIsOpened] = useState(false)
  const [placeholderText, setPlaceholderText] = useState(placeholder)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const { t } = useTranslation(['default', 'anime'])

  const toggleDropdown = (event: MouseEvent) => {
    event.preventDefault()
    setIsOpened(!isOpened)
  }

  const onOptionClick = (option: TOption) => {
    if (isMulti) {
      onChange(option)
    } else {
      setPlaceholderText(option.title)
      onChange(option)
      setIsOpened(!isOpened)
    }
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
        text={t(placeholderText.toLocaleLowerCase(), { ns: 'anime' })}
        justify={justify}
        disabled={disabled}
        onClick={toggleDropdown}
        suffix={icon}
      />
      {/*TODO: Fix Semantic Problems*/}
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
                  text={
                    option.title
                      ? option.title
                      : t(option.name.toLocaleLowerCase(), { ns: 'anime' })
                  }
                  isChecked={value.some(
                    (el: TOption) => el.name === option.name
                  )}
                  onChange={() => onOptionClick(option)}
                />
              </li>
            ) : (
              <li
                key={option.name}
                className={styles.option}
              >
                <option onClick={() => onOptionClick(option)}>
                  {option.title}
                </option>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  )
}

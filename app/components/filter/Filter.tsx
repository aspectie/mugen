import { useTranslation } from 'react-i18next'
import { useState, ChangeEvent, useRef, MouseEvent, FormEvent } from 'react'
import classNames from 'classnames'

import {
  ButtonJustify,
  ButtonType,
  FieldSize,
  FilterType,
  TFilterSelection,
  TFilterType,
  TOption
} from '@/types/ui'
import { TFilterParams, TSelectedOptions } from '@/types/ui/filter'

import styles from './filter.module.scss'
import { FilterIcon } from '@/assets/icons'

import Select from '@/ui/select/Select'
import Search from '@/ui/search/Search'
import Button from '@/ui/button/Button'
import Tag from '@/ui/tag/Tag'

type TFilterProps = {
  type?: TFilterType
  selects: TFilterSelection[]
}

const Filter = (props: TFilterProps) => {
  const { selects, type = FilterType.small } = props
  const { t } = useTranslation('ui')
  const [searchInputValue, setSearchInputValue] = useState<string>('')

  const [selectedOptions, setSelectedOptions] = useState<TSelectedOptions>({})
  const [filterParams, setFilterParams] = useState<TFilterParams>({
    selectedOptions,
    searchOption: searchInputValue
  })

  const [isFiltersHidden, setIsFiltersHidden] = useState(
    type === FilterType.detailed
  )
  const inputRef = useRef(null)

  const classes = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })

  const filtersClasses = classNames(styles.filters, {
    [styles[`filters--hidden`]]: isFiltersHidden
  })

  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--hidden`]]: Object.keys(selectedOptions!).length === 0
  })

  const toggleFiltersVisibility = () => {
    setIsFiltersHidden(!isFiltersHidden)
  }
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(event.target.value)

    setFilterParams({
      ...filterParams,
      searchOption: searchInputValue
    })
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFiltersVisibility()
  }

  const handleSelectClick = (option: TOption, id: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const currentOptions = prevSelectedOptions[id] || []
      const optionExists = currentOptions.some(
        existingOption => existingOption === option
      )

      const updatedOptions = optionExists
        ? currentOptions.filter(existingOption => existingOption !== option)
        : [...currentOptions, option]

      const newSelectedOptions = { ...prevSelectedOptions }

      if (updatedOptions.length > 0) {
        newSelectedOptions[id] = updatedOptions
      } else {
        delete newSelectedOptions[id]
      }

      setFilterParams(prevFilterParams => ({
        ...prevFilterParams,
        selectedOptions: newSelectedOptions
      }))

      return newSelectedOptions
    })
  }

  const onRemoveTag = (tag: string) => {
    setSelectedOptions(prevSelectedOptions => {
      const newSelectedOptions = {}

      Object.keys(prevSelectedOptions).forEach((id: string) => {
        const currentOptions = prevSelectedOptions[id]
        const updatedOptions = currentOptions.filter(
          option => option.name !== tag
        )

        if (updatedOptions.length > 0) {
          newSelectedOptions[id] = updatedOptions
        }
      })

      setFilterParams(prevFilterParams => ({
        ...prevFilterParams,
        selectedOptions: newSelectedOptions
      }))

      return newSelectedOptions
    })
  }

  const isOptionChecked = (option: TOption, id: string) => {
    const currentOptions = selectedOptions![id] || []
    return currentOptions.includes(option)
  }

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(filterParams)
    setSelectedOptions({})
    setSearchInputValue('')
    setFilterParams({
      selectedOptions,
      searchOption: searchInputValue
    })
  }

  return (
    <form
      id="filter"
      className={classes}
      onSubmit={handleSubmitForm}
    >
      <div className={filtersClasses}>
        <div className={styles.filter__selects}>
          {selects.map((item: TFilterSelection) => (
            <Select
              size={
                type === FilterType.detailed
                  ? FieldSize.small
                  : FieldSize.medium
              }
              key={item.name}
              placeholder={item.title}
              options={item.options}
              isMulti={true}
              id={item.name}
              onClick={handleSelectClick}
              isChecked={isOptionChecked}
            />
          ))}
        </div>
        <div className={tagsClasses}>
          {Object.values(selectedOptions).map((option: TOption[]) =>
            option.map(tag => (
              <Tag
                name={tag.name}
                text={tag.title}
                key={tag.name}
                onClick={onRemoveTag}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles['filter__search-area']}>
        {type === FilterType.detailed && (
          <div className="hover:text-accent-120">
            <Button
              text={t('extended filter')}
              type={ButtonType.ghost}
              prefix={<FilterIcon />}
              size={FieldSize.extraSmall}
              justify={ButtonJustify.center}
              onClick={handleButtonClick}
            />
          </div>
        )}
        <div className={styles['search-area__search-input']}>
          <Search
            placeholder={t('title')}
            ref={inputRef}
            value={searchInputValue}
            onInputChange={handleInputChange}
          />
        </div>
        <div className={styles['search-area__search-button']}>
          <Button
            text={t('search')}
            size={FieldSize.small}
            disabled={
              searchInputValue === '' &&
              Object.values(selectedOptions).length === 0
            }
          />
        </div>
      </div>
    </form>
  )
}
export default Filter

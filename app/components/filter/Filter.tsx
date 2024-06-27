import { useTranslation } from 'react-i18next'
import { useState, ChangeEvent, MouseEvent } from 'react'
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
import { TFilterParams, TFilterSelects } from '@/types/ui/filter'

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

export const Filter = (props: TFilterProps) => {
  const { selects, type = FilterType.small } = props
  const { t } = useTranslation('ui')

  // const [searchInputValue, setSearchInputValue] = useState<string>('')
  const [params, setParams] = useState<TFilterSelects>({})
  const [filterParams, setFilterParams] = useState<TFilterParams>({
    params,
    search: ''
  })

  const [isFiltersHidden, setIsFiltersHidden] = useState(
    type === FilterType.detailed
  )

  const classes = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })

  const filtersClasses = classNames(styles.filters, {
    [styles[`filters--hidden`]]: isFiltersHidden
  })

  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--hidden`]]: Object.keys(params!).length === 0
  })

  const toggleFiltersVisibility = () => {
    setIsFiltersHidden(!isFiltersHidden)
  }

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterParams({
      ...filterParams,
      search: event.target.value
    })
  }

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFiltersVisibility()
  }

  const handleSelectChange = (option: TOption, selectName: string) => {
    setParams(prevSelectedOptions => {
      const currentOptions = prevSelectedOptions[selectName] || []
      const optionExists = currentOptions.some(
        existingOption => existingOption === option
      )

      const updatedOptions = optionExists
        ? currentOptions.filter(existingOption => existingOption !== option)
        : [...currentOptions, option]

      const newSelectedOptions = { ...prevSelectedOptions }

      if (updatedOptions.length > 0) {
        newSelectedOptions[selectName] = updatedOptions
      } else {
        delete newSelectedOptions[selectName]
      }

      setFilterParams(prevFilterParams => ({
        ...prevFilterParams,
        params: newSelectedOptions
      }))

      return newSelectedOptions
    })
  }

  const onRemoveTag = (tag: string) => {
    setParams(prevSelectedOptions => {
      const newSelectedOptions: TFilterSelects = {}

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
        params: newSelectedOptions
      }))

      return newSelectedOptions
    })
  }

  return (
    <div className={classes}>
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
            value={filterParams.search}
            onInputChange={handleSearchChange}
          />
        </div>
        <div className={styles['search-area__search-button']}>
          <Button
            text={t('search')}
            size={FieldSize.small}
            disabled={
              filterParams.search === '' && Object.values(params).length === 0
            }
          />
        </div>
      </div>
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
              isMulti
              options={item.options}
              onChange={option => handleSelectChange(option, item.name)}
              value={filterParams.params![item.name]}
            />
          ))}
        </div>
        <div className={tagsClasses}>
          {Object.values(params).map((option: TOption[]) =>
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
    </div>
  )
}
export default Filter

import { useTranslation } from 'react-i18next'
import { useState, ChangeEvent, MouseEvent } from 'react'
import classNames from 'classnames'

import styles from './filter.module.scss'
import { FilterIcon } from '@/assets/icons'
import { useQuery } from '@shared/lib'

import {
  ButtonJustify,
  ButtonType,
  Select,
  TOption,
  Search,
  Button,
  Tag,
  FieldSize
} from '@shared/ui'

enum FilterType {
  detailed = 'detailed',
  small = 'small'
}

type TFilterType = `${FilterType}`

type TFilterSelection = {
  title: string
  name: string
  options: TOption[]
}

export type TFilterSelects = {
  [selectName: string]: TOption[]
}

type TFilterProps = {
  type?: TFilterType
  selects: TFilterSelection[]
}

export const Filter = (props: TFilterProps) => {
  const { selects, type = FilterType.small } = props
  const { t } = useTranslation('ui')

  const [params, setParams] = useState<TFilterSelects>({})
  const [search, setSearch] = useState<string>('')
  const { setQuerySearch, setQueryParams } = useQuery()

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

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  const onToggleFilterClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    toggleFiltersVisibility()
  }

  const onSearchButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    setQuerySearch(search)
    setQueryParams(params)
  }

  const onSelectChange = (option: TOption, selectId: string) => {
    setParams(prevParams => {
      const currentOptions = prevParams[selectId] || []
      const isOptionExists = currentOptions.some(
        existingOption => existingOption.name === option.name
      )

      const updatedOptions = isOptionExists
        ? currentOptions.filter(
            existingOption => existingOption.name !== option.name
          )
        : [...currentOptions, option]

      const newSelectedOptions = { ...prevParams }

      if (updatedOptions.length > 0) {
        newSelectedOptions[selectId] = updatedOptions
      } else {
        delete newSelectedOptions[selectId]
      }

      return newSelectedOptions
    })
  }

  const onTagRemove = (tag: string) => {
    setParams(prevParams => {
      const newParams: TFilterSelects = {}

      Object.keys(prevParams).forEach((selectId: string) => {
        const currentOptions = prevParams[selectId]
        const updatedOptions = currentOptions.filter(
          option => option.name !== tag
        )

        if (updatedOptions.length > 0) {
          newParams[selectId] = updatedOptions
        }
      })

      return newParams
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
              onClick={onToggleFilterClick}
            />
          </div>
        )}
        <div className={styles['search-area__search-input']}>
          <Search
            placeholder={t('title')}
            value={search}
            onInputChange={onSearchChange}
          />
        </div>
        <div className={styles['search-area__search-button']}>
          <Button
            text={t('search')}
            size={FieldSize.small}
            disabled={search === '' && Object.values(params).length === 0}
            onClick={onSearchButtonClick}
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
              placeholder={item.name}
              isMulti
              options={item.options}
              onChange={option => onSelectChange(option, item.name)}
              value={params![item.name]}
            />
          ))}
        </div>
        <div className={tagsClasses}>
          {Object.values(params).map((option: TOption[]) =>
            option.map(tag => (
              <Tag
                name={tag.name}
                text={t(tag.name.toLocaleLowerCase(), { ns: 'anime' })}
                key={tag.name}
                onClick={onTagRemove}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

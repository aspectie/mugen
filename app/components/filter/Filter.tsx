import { useTranslation } from 'react-i18next'
import { useState } from 'react'
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
import { TSelectedOptions } from '@/types/ui/filter'

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

  const [filterParams, setFilterParams] = useState<TSelectedOptions>({})
  const [searchParams, setSearchParams] = useState('')
  const [isFiltersHidden, setIsFiltersHidden] = useState(
    type === FilterType.detailed
  )
  const toggleFiltersVisibility = () => {
    setIsFiltersHidden(!isFiltersHidden)
  }

  const addOption = (name: string, option: TOption) => {
    if (filterParams[name]) {
      const newValues = [
        ...filterParams[name],
        { name: option.name, title: option.title }
      ]
      const newFilterParams = {
        ...filterParams,
        [name]: newValues
      }
      setFilterParams(newFilterParams)
    } else {
      setFilterParams(prevState => ({
        ...prevState,
        [name]: [{ name: option.name, title: option.title }]
      }))
    }
  }

  const removeOption = (name: string, option: TOption) => {
    const newValues: TOption[] = filterParams[name].filter(
      (item: TOption) => item.name !== option.name
    )
    const newFilterParams = {
      ...filterParams,
      [name]: newValues
    }
    setFilterParams(newFilterParams)
    const newValue: TSelectedOptions = { ...filterParams, [name]: newValues }
    Object.keys(newValue).forEach((key: string) => {
      checkIsParamsEmpty(newValue, key)
    })
    setFilterParams(newValue)
  }

  const updateOptions = (name: string, option: TOption) => {
    if (filterParams[name]) {
      if (filterParams[name].some(item => item.name === option.name)) {
        removeOption(name, option)
      } else {
        addOption(name, option)
      }
    } else {
      addOption(name, option)
    }
  }

  const onTagRemove = (name: TOption) => {
    const updatedParams: TSelectedOptions = { ...filterParams }
    Object.keys(updatedParams).forEach((key: string) => {
      updatedParams[key] = updatedParams[key].filter(
        (value: TOption) => value !== name
      )
      checkIsParamsEmpty(updatedParams, key)
    })
    setFilterParams(updatedParams)
  }

  const checkIsParamsEmpty = (params: TSelectedOptions, key: string) => {
    if (params[key].length === 0) {
      delete params[key]
    }
  }

  const searchHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams(event.target.value)
  }

  const classes = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })

  const filtersClasses = classNames(styles.filters, {
    [styles[`filters--hidden`]]: isFiltersHidden
  })

  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--hidden`]]: Object.keys(filterParams).length === 0
  })

  return (
    <div className={classes}>
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
              selectName={item.name}
              options={item.options}
              isMulti={true}
              updateOptions={updateOptions}
              selectedOptions={filterParams[item.name] || []}
            />
          ))}
        </div>
        {Object.keys(filterParams).length > 0 && (
          <div className={tagsClasses}>
            {Object.values(filterParams).map((option: TOption[]) =>
              option.map((tag: TOption) => (
                <Tag
                  name={tag.name}
                  text={tag.title}
                  key={tag.name}
                  onClick={() => onTagRemove(tag)}
                />
              ))
            )}
          </div>
        )}
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
              onClick={toggleFiltersVisibility}
            />
          </div>
        )}
        <div className={styles['search-area__search-input']}>
          <Search
            placeholder={t('title')}
            onChange={searchHandler}
          />
        </div>
        <div className={styles['search-area__search-button']}>
          <Button
            text={t('search')}
            size={FieldSize.small}
            disabled={
              searchParams.length === 0 &&
              Object.keys(filterParams).length === 0
            }
          />
        </div>
      </div>
    </div>
  )
}

export default Filter

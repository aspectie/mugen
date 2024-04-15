import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import classNames from 'classnames'

import {
  ButtonJustify,
  ButtonType,
  FieldSize,
  FilterType,
  TFilterSelection,
  TFilterType
} from '@/types/ui'

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

  const [filterParams, setFilterParams] = useState({})
  const [searchParams, setSearchParams] = useState('')
  const [isFiltersHidden, setIsFiltersHidden] = useState(
    type === FilterType.detailed
  )

  const toggleFiltersVisibility = () => {
    setIsFiltersHidden(!isFiltersHidden)
  }

  const onSelectChange = (name: string, options: string[]) => {
    const newValue = { ...filterParams, [name]: options }
    setFilterParams(newValue)
  }

  const onTagRemove = (name: string) => {
    const updatedParams: object = { ...filterParams }
    // TODO: fix types
    Object.keys(updatedParams).forEach((key: string) => {
      updatedParams[key] = updatedParams[key].filter(
        (value: string) => value !== name
      )

      if (updatedParams[key].length === 0) {
        delete updatedParams[key]
      }
    })
    setFilterParams(updatedParams)
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
          {selects.map(item => (
            // TODO: fix types
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
              onChange={name => onSelectChange(item.name, name)}
              selectedOptions={filterParams[item.name] || []}
            />
          ))}
        </div>
        {Object.keys(filterParams).length > 0 && (
          <div className={tagsClasses}>
            {Object.values(filterParams).map(option =>
              // TODO: fix types
              option.map((tag: string) => (
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

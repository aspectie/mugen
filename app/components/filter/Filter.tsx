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
import { FilterIcon, SortIcon } from '@/assets/icons'

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
  const [isFiltersHidden, setIsFiltersHidden] = useState(true)

  const toggleFiltersVisibility = () => {
    setIsFiltersHidden(!isFiltersHidden)
  }

  const onSelectChange = (name: string, options: string[]) => {
    const newValue = { ...filterParams, [name]: options }
    setFilterParams(newValue)
  }

  const onTagRemove = (name: string) => {
    const updatedParams: object = { ...filterParams }

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
    [styles[`filters--isHidden`]]: isFiltersHidden
  })

  return (
    <div className={classes}>
      <Button
        text={t('extended filter')}
        type={ButtonType.transparent}
        prefix={<FilterIcon />}
        size={FieldSize.smallest}
        justify={ButtonJustify.start}
        onClick={toggleFiltersVisibility}
      />
      <div className={filtersClasses}>
        <div className={styles.filter__selects}>
          {selects.map((item) => (
            <Select
              key={item.name}
              placeholder={item.title}
              options={item.options}
              isMulti={true}
              onChange={(name) => onSelectChange(item.name, name)}
            />
          ))}
        </div>
        <div className={styles.filter__tags}>
          {Object.entries(filterParams).map(([key, value]) =>
            value.map((tagName) => (
              <Tag
                key={tagName}
                name={tagName}
                text={tagName}
                onClick={() => onTagRemove(tagName)}
              />
            ))
          )}
        </div>
      </div>
      <div className={styles['filter__search-area']}>
        <div className={styles['search-area__search-input']}>
          <Search
            placeholder={t('title...')}
            onChange={searchHandler}
          />
        </div>
        <div className={styles['search-area__search-button']}>
          <Button
            text={t('search')}
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter

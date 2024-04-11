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

  const [filterParams, setfilterParams] = useState({})

  const [isShowed, setIsShowed] = useState(true)

  const toggleVisibility = () => {
    setIsShowed(!isShowed)
  }

  const onSelectChange = (name: string, options: string[]) => {
    // TODO: update state with new value
    const newValue = { ...filterParams, [name]: options }
    setfilterParams(newValue)
  }

  const onTagRemove = (name: string) => {
    // TODO: remove selected value from state
  }

  const filterClasses = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })

  const selectsClasses = classNames(styles.filter__selects, {
    [styles[`filter__selects--displayed`]]: !isShowed
  })

  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--displayed`]]: !isShowed
  })

  return (
    <div className={filterClasses}>
      <div className={styles['filter__controls']}>
        <div className={styles['filter__controls-item']}>
          {/* TODO: implement sort control with state */}
          <Button
            text={t('sort by')}
            type={ButtonType.transparent}
            prefix={<SortIcon />}
            size={FieldSize.smallest}
            justify={ButtonJustify.between}
          />
        </div>
        <div className={styles['filter__controls-item']}>
          <Button
            text={t('extended filter')}
            type={ButtonType.transparent}
            prefix={<FilterIcon />}
            size={FieldSize.smallest}
            justify={ButtonJustify.between}
            onClick={toggleVisibility}
          />
        </div>
      </div>
      <div className={selectsClasses}>
        {selects.map(item => (
          <Select
            key={item.name}
            placeholder={item.title}
            options={item.options}
            isMulti={true}
            onChange={b => onSelectChange(item.name, b)}
          />
        ))}
      </div>
      <div className={tagsClasses}>
        {/* TODO: map values from state */}
        {Object.entries(filterParams).map(([key, value]) =>
          value.map(tagName => (
            <Tag
              key={tagName}
              name={tagName}
              text={tagName}
              onClick={onTagRemove}
            />
          ))
        )}
      </div>
      <div className={styles['filter__search-area']}>
        {/* TODO: add state for search */}
        <div className={styles['search-area__search-input']}>
          <Search placeholder={t('title...')} />
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

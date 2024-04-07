import { useState } from 'react'
import Select from '@/ui/select/Select'
import Search from '@/ui/search/Search'
import Button from '@/ui/button/Button'
import Tag from '@/ui/tag/Tag'
import classNames from 'classnames'
import styles from './filter.module.scss'
import { FilterType, TFilterSelections, TFilterType } from '@/types/ui'
import { FilterIcon, SortIcon } from '@/assets/icons'
import { useTranslation } from 'react-i18next'

type TFilter = {
  type: TFilterType
  selects: TFilterSelections[]
}

const Filter = (props: TFilter) => {
  const { selects, type = FilterType.small } = props

  const { t } = useTranslation()

  const [isShowed, setIsShowed] = useState(true)

  const toggleVisibility = () => {
    setIsShowed(!isShowed)
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
          <Button
            text={t('by order')}
            type="transparent"
            prefix={<SortIcon />}
            size="small"
            align="between"
          />
        </div>
        <div className={styles['filter__controls-item']}>
          <Button
            text={t('extended filter')}
            type="transparent"
            prefix={<FilterIcon />}
            size="small"
            align="between"
            onClick={toggleVisibility}
          />
        </div>
      </div>
      <div className={selectsClasses}>
        {selects.map(item => (
          <Select
            key={item.name}
            placeholder={item.name}
            options={item.options}
            isMulti={true}
          />
        ))}
      </div>
      <div className={tagsClasses}>
        {selects.map(item => (
          <Tag
            key={item.name}
            text={item.name}
          />
        ))}
      </div>
      <div className={styles['filter__search-area']}>
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
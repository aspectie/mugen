import { useState } from 'react'
import Select from '@/ui/select/Select'
import Search from '@/ui/search/Search'
import Button from '@/ui/button/Button'
import Tag from '@/ui/tag/Tag'
import classNames from 'classnames'
import styles from './filter.module.scss'
import { FilterType, TFilterSelections, TFilterType } from '@/types/ui'
import { FilterIcon, SortIcon } from '@/assets/icons'

type TFilter = {
  type: TFilterType
  selects: TFilterSelections[]
  style?: React.CSSProperties
}

const Filter = (props: TFilter) => {
  const { selects, type = FilterType.small } = props

  const [isShow, setIsShow] = useState(true)

  const toggleVisibility = () => {
    setIsShow(!isShow)
  }

  const filterClasses = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })

  const selectsClasses = classNames(styles.filter__selects, {
    [styles[`filter__selects--display`]]: !isShow
  })

  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--display`]]: !isShow
  })

  return (
    <div className={filterClasses}>
      <div className={styles.filter__sort}>
        <div className={styles['filter__sort-item']}>
          <Button
            text="Упорядочить"
            type="transparent"
            prefix={<SortIcon />}
            size="small"
            align="between"
            onClick={toggleVisibility}
          />
        </div>
        <div className={styles['filter__sort-item']}>
          <Button
            text="Расширенный фильтр"
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
      <div className={styles['filter__inner']}>
        <div className={styles.filter__inner__search}>
          <Search placeholder="Название..." />
        </div>
        <div className={styles.filter__inner__button}>
          <Button
            text="Искать"
            size="small"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter

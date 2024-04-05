import { useState, useEffect } from 'react'
import Select, { TOption } from '@/ui/select/Select'
import Search from '@/ui/search/Search'
import Button from '@/ui/button/Button'
import Tag from '@/ui/tag/Tag'
import classNames from 'classnames'
import styles from './filter.module.scss'
import { FilterIcon, SortIcon } from '@/assets/icons'

type TFilter = {
  type: 'small' | 'full'
  selects: [
    {
      name: string
      options: TOption[]
    }
  ]
  style?: React.CSSProperties
}

const Filter = (props: TFilter) => {
  const { selects, type } = props

  const [isShow, setIsShow] = useState(true)

  const toggleVisibility = () => {
    setIsShow(!isShow)
  }

  const filterClasses = classNames(styles.filter, {
    [styles[`filter--${type}`]]: type
  })
  const selectClasses = classNames(styles.filter__selects, {
    [styles[`filter__selects--${type}`]]: type,
    [styles[`filter__selects--full--show`]]: !isShow
  })
  const innerClasses = classNames(styles.filter__inner, {
    [styles[`filter__inner--${type}`]]: type
  })
  const sortClasses = classNames(styles.filter__sort, {
    [styles[`filter__sort--${type}`]]: type
  })
  const tagsClasses = classNames(styles.filter__tags, {
    [styles[`filter__tags--show`]]: !isShow
  })

  return (
    <div className={filterClasses}>
      <div className={sortClasses}>
        <div className={styles['filter__sort-item']}>
          <SortIcon />
          <span>Упорядочить</span>
        </div>
        <div
          className={styles['filter__sort-item']}
          onClick={toggleVisibility}
        >
          <FilterIcon />
          <span>Расширенный фильтр</span>
        </div>
      </div>
      <div className={selectClasses}>
        {selects.map(item => (
          <Select
            key={item.name}
            placeholder={item.name}
            options={item.options}
            isMulti={true}
          />
        ))}
      </div>
      {type === 'full' && (
        <div className={tagsClasses}>
          {selects.map(item => (
            <Tag
              key={item.name}
              text={item.name}
            />
          ))}
        </div>
      )}
      <div className={innerClasses}>
        <div className={styles.filter__inner__search}>
          <Search placeholder="Название..." />
        </div>
        <div className={styles.filter__inner__button}>
          <Button text="Искать" />
        </div>
      </div>
    </div>
  )
}

export default Filter

import { TCardData, TCardPreferences } from '@/types/ui'

import classNames from 'classnames'

import { Card } from './Card'

export const CardList = (
  props: {
    cards: TCardData[]
    className?: string
  } & TCardPreferences
) => {
  const {
    cards,
    className,
    type = 'vertical',
    size = 'medium',
    isHighlight = false
  } = props

  const classes = classNames({
    '[&:not(:last-child)]:mb-l': type === 'horizontal'
  })

  return (
    cards.length > 0 && (
      <ul className={className}>
        {cards.map(item => (
          <li
            key={item.id}
            className={classes}
          >
            <Card
              type={type}
              size={size}
              isHighlight={isHighlight}
              id={item.id}
              url={item.url}
              imageUrl={item.imageUrl}
              title={item.title}
              date={item.date}
              kind={item.kind}
            />
          </li>
        ))}
      </ul>
    )
  )
}

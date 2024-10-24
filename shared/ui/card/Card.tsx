import { Link } from '@remix-run/react'

import classNames from 'classnames'

import style from './card.module.scss'
import { FieldSize, TFieldSize } from '../form'

const enum CardSize {
  vertical = 'vertical',
  horizontal = 'horizontal'
}

export type TCardPreferences = {
  type?: `${CardSize}`
  size?: TFieldSize
  isHighlight?: boolean
}

export type TCardData = {
  id: number
  url?: string
  imageUrl: string
  date?: string
  title?: string
  series?: string
  kind?: string
}

type TCardProps = TCardData & TCardPreferences

const Description = ({ title, date, series, kind }: Partial<TCardData>) => {
  const preparedDate = date?.slice(0, 4)

  return (
    <div className={style.card__description}>
      {title && <h5 className={style.card__title}>{title}</h5>}
      {series && <h5 className="text-black-40 p-s bg-accent-60">{series}</h5>}
      {kind && (
        <h5 className="text-black-80 mr-s py-xs px-m bg-gray-40 inline-block rounded-lg border border-gray-60">
          {kind.toUpperCase()}
        </h5>
      )}
      {date && (
        <h5 className="text-black-80 py-xs px-m bg-gray-40 inline-block rounded-lg border border-gray-60">
          {preparedDate}
        </h5>
      )}
    </div>
  )
}

const BaseCard = (props: TCardProps) => {
  const {
    type = 'vertical',
    size = 'medium',
    isHighlight = false,
    imageUrl,
    title,
    date,
    kind,
    series
  } = props

  const _series = size === FieldSize.medium ? series : undefined

  const cardClasses = classNames(style.card, style[`card--${type}`], {
    ['hover:bg-gray-60']: isHighlight
  })
  const imageWrapperClasses = classNames(
    style['card__image-wrapper'],
    // TODO: maybe move to media query
    // TODO: maybe remove link with card in index and others cards?
    {
      'xl:h-[252px] lg:h-[228px] md:h-[252px] sm:h-[172px] h-[172px]':
        type === CardSize.vertical && size === FieldSize.small,
      'xl:h-[200px] lg:h-[170px] sm:h-[150px]':
        type === CardSize.vertical && size === FieldSize.medium
    },
    {
      '2xl:w-[90px] xl:w-[80px] lg:w-[70px] sm:w-[50px]':
        type === CardSize.horizontal && size === FieldSize.small,
      '2xl:w-[120px] xl:w-[100px] lg:w-[80px] sm:w-[70px]':
        type === CardSize.horizontal && size === FieldSize.medium
    }
  )

  return (
    <div className={cardClasses}>
      <div className={imageWrapperClasses}>
        <img
          className={style.card__image}
          src={imageUrl}
          alt={`Постер аниме ${title}`}
        />
      </div>
      {type === 'horizontal' ? (
        <Description
          title={title}
          date={date}
          series={_series}
          kind={kind}
        />
      ) : (
        <h5 className={style.card__title}>{title}</h5>
      )}
    </div>
  )
}

const CardWithLink = (props: TCardProps & { url: string }) => {
  const { url } = props

  return (
    <Link to={url}>
      <BaseCard {...props} />
    </Link>
  )
}

export const Card = (props: TCardProps) => {
  return (
    <>
      {props.url ? (
        <CardWithLink
          url={props.url}
          {...props}
        />
      ) : (
        <BaseCard {...props} />
      )}
    </>
  )
}

import {Link} from "@remix-run/react";

import classNames from "classnames";

import { CardSize, FieldSize, TCardData, TCardPreferences} from "@/types/ui";

import style from "./card.module.scss";

type TCardProps = TCardData & TCardPreferences;

const Description = ({title, date, series}: Partial<TCardData>) => {
    return (
        <div className={style.card__description}>
            {title && <h5 className={style.card__title}>{title}</h5>}
            {series && <h5 className="text-black-40">{series}</h5>}
            {date && <h5 className="text-black-40">{date}</h5>}
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
        series
    } = props;

    const _series = size === FieldSize.medium ? series : undefined

    const cardClasses = classNames(
        style.card,
        style[`card--${type}`],
        {
            ['hover:bg-gray-60']: isHighlight
        }
    )
    const imageWrapperClasses = classNames(
        style['card__image-wrapper'],
        // TODO: maybe move to media query
        {
            '2xl:h-[150px] xl:h-[100px] lg:h-[70px] sm:h-[50px]': type === CardSize.vertical && size === FieldSize.small,
            '2xl:h-[250px] xl:h-[200px] lg:h-[170px] sm:h-[150px]': type === CardSize.vertical && size === FieldSize.medium
        },
        {
            '2xl:w-[90px] xl:w-[80px] lg:w-[70px] sm:w-[50px]': type === CardSize.horizontal && size === FieldSize.small,
            '2xl:w-[120px] xl:w-[100px] lg:w-[80px] sm:w-[70px]': type === CardSize.horizontal && size === FieldSize.medium
        }
    )

    return (
        <div className={cardClasses}>
            <div className={imageWrapperClasses}>
                <img className={style.card__image}
                    src={imageUrl}
                    alt={`Постер аниме ${title}`}
                />
            </div>
            {type === 'horizontal' 
                ? <Description title={title} date={date} series={_series}/>
                : <h5 className={style.card__title}>{title}</h5>
            }
        </div>
    )
}

const CardWithLink = (props: TCardProps & {url: string}) => {
    const {url} = props;

    return (
        <Link to={url}>
            <BaseCard {...props}/>
        </Link>
    )
}

const Card = (props: TCardProps) => {
    return (
        <>
            {props.url
                ? <CardWithLink url={props.url} {...props} />
                : <BaseCard {...props} />
            }
        </>
    )
}

export default Card
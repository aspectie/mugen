import listStyle from '@/components/card-list/card-list.module.scss';
import style from "./card.module.scss"

const Card = ({index, card}) => {
    return (
        <li key={index} className={[listStyle['card__list-item'], style.card].join(' ')}>
            <div className={style['card__img--wrapper']}>
                <img className={style.card__img} src={`https://shikimori.one/${card.image.original}`} alt={`Постер аниме ${card.russian}`}/>
            </div>
            <span className={style.card__title}>{card.russian}</span>
        </li>
    )
}

export default Card
import style from "./card.module.scss";
import {Link} from "@remix-run/react";

type TCard = {
    russian: string;
    image: {
        original: string;
    }
    url: string;
}

const Card = ({card} : {card : TCard}) => {
    return (
        <Link to='#'>
            <div className={[style['card__list-item'], style.card].join(' ')}>
                <div className={style['card__img--wrapper']}>
                    <img className={style.card__img} src={`${window.ENV.SHIKI_URL}/${card.image.original}`}
                         alt={`Постер аниме ${card.russian}`}/>
                </div>
                <span className={style.card__title}>{card.russian}</span>
            </div>
        </Link>
    )
}

export default Card
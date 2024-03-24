import { TAnime } from "@/types/api/shiki/TAnime";

import Card from './Card'
import style from "./card.module.scss";

const CardList = ({cards}: {cards: TAnime[]}) => {
    return (cards.length > 0 && <ul className={style.card__list}>
        {cards.map(card => (<li key={card.id}><Card card={card}/></li>))}
    </ul>)
}

export default CardList
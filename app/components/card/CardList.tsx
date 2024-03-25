import { TAnime } from "@/types/api/shiki/TAnime";

import Card from './Card'
import style from "./card.module.scss";
import classNames from "classnames";

const CardList = ({cards, className}: {cards: TAnime[], className: string}) => {
    const classes = classNames([
        style.card__list,
        className
    ])
    return (cards.length > 0 && <ul className={classes}>
        {cards.map(card => (<li key={card.id}><Card card={card}/></li>))}
    </ul>)
}

export default CardList
import {useEffect, useState} from "react";
import Card, { TCard } from './Card'
import style from "./card.module.scss";

const CardList = () => {
    const [cards, setCards] = useState<TCard[]>([]);
    useEffect(() => {
        fetch(`${window.ENV.SHIKI_URL}/api/animes?&limit=5`)
            .then(response => response.json())
            .then(json => setCards(json))
    }, [])

    return (
        cards && cards.length > 0 &&
         <ul className={style.card__list}>
            {cards.map(card => (<li key={card.id}><Card card={card}/></li>))}
        </ul>
    )
}

export default CardList
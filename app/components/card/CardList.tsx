import {useEffect, useState} from "react";
import Card from '@/components/card/Card'
import style from "./card.module.scss";
const CardList = () => {
    const [cards, setCards] = useState(null);
    useEffect(() => {
        fetch('https://shikimori.one/api/animes?season=spring_2024&limit=5&order=popularity')
            .then(response => response.json())
            .then(json => setCards(json))
    }, [])

    return (
        cards && <ul className={style.card__list}>{cards.map(card => (
            <li key={card.id}><Card card={card}/></li>
        ))}</ul>
    )
}

export default CardList
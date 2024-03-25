import {Link} from "@remix-run/react";

import { TAnime } from "@/types/api/shiki/TAnime";

import style from "./card.module.scss";

const Card = ({card} : {card : Partial<TAnime>}) => {
    const imageUrl = `${import.meta.env.VITE_SHIKI_URL}/${card.image?.original}`;

    return (
        <Link to={`anime/${card.id}`}>
            <div className={style.card}>
                {/* TODO: adjust heights */}
                <div className={`${style['card__img-wrapper']} xl:h-[200px] lg:h-[170px] sm:h-[150px]`}>
                    <img className={style.card__img}
                        src={imageUrl}
                        alt={`Постер аниме ${card.russian}`}
                    />
                </div>
                <span className={style.card__title}>{card.russian}</span>
            </div>
        </Link>
    )
}

export default Card
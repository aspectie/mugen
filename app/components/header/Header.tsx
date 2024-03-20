import React from "react";
import './Header.css'
import logo from "../../public/logo.svg"
export function Header() {
    return (
        <header className="header">
            <div className='header--wrapper'>
                <img src={logo} alt="logo" className='logo'/>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className='nav__list-item'>
                            <a href="#">Аниме</a></li>
                        <li className='nav__list-item'>
                            <a href="#">Манга</a></li>
                        <li className='nav__list-item'>
                            <a href="#">Сообщество</a></li>
                    </ul>
                </nav>
            </div>
        </header>)
}
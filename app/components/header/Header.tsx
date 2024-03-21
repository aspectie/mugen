import './Header.scss';
import '../../public/fonts/fonts.scss'

import logo from "../../public/logo.svg";

export function Header() {
    const links = [
        {id: 1,title: 'Аниме', link: '#'},
    ]
    return (
        <header className="header">
            <div className='header--wrapper'>
                <a href="/#">
                    <img src={logo} alt="logo" className='logo'/>
                </a>
                <nav className="nav">
                    <ul className="nav__list">
                        {links.map(link => (
                            <li key={link.id} className="nav__list-item">
                                <a href={link.link}>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>)
}
import React from 'react'
import s from './header.module.scss';
import Link from 'next/link';


const navigation = ({gamburgerActive, setGamburgerActive}) => {
 
    const links = [
        {
            id: 1,
            title: 'Главная',
            href: '/',
        },
        {
            id: 2,
            title: 'Новости',
            href: '/news',
        },
        {
            id: 3,
            title: 'Коллекции',
            href: '/',
        },
        {
            id: 4,
            title: 'Продукции',
            href: '/',
        },
        {
            id: 5,
            title: 'О нас',
            href: '/about',
        },
    ]

    const closeGamburger = () => {
        if (gamburgerActive) setGamburgerActive(!gamburgerActive);
    }
    return (
        <nav className={s.navigation}>
            <ul>
                {links.map((link) => (
                    <li key={link.id} onClick={closeGamburger}><Link href={link.href}>{link.title}</Link></li>
                ))}
            </ul>
        </nav>
    )
}

export default navigation
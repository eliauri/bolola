import React from 'react'
import s from './header.module.scss';
import Link, { LinkProps } from "next/link"
import { useRouter } from "next/router"
import { ActiveLink } from './ActiveLink';

const Navigation = ({ gamburgerActive, setGamburgerActive }) => {

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
            id: 4,
            title: 'Продукция',
            href: '/products',
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
                    <li key={link.id} onClick={closeGamburger}>
                        <ActiveLink href={link.href} activeClassName={s.active}>
                            {link.title}
                        </ActiveLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Navigation
import React from 'react'
import { ActiveLink } from '../header/ActiveLink'
import s from './AccountNav.module.scss'

const AccountNav = () => {
    return (
        <nav className={s.nav}> 
            <ul>
                <li>
                    <ActiveLink href={'/account'} activeClassName={s.active}>
                        Мои данные
                    </ActiveLink>
                </li>
                <li>
                    <ActiveLink href={'/account/collection'} activeClassName={s.active}>
                        Коллекция боликов
                    </ActiveLink>
                </li>
            </ul>
        </nav>
    )
}

export default AccountNav
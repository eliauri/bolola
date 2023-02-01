import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cl from 'classnames'
import s from './header.module.scss';

import Container from '../Container';
import Navigation from './Navigation';
import MiniProfile from './MiniProfile';

import logo from '../../public/logo.svg'
import add from '../../public/add-bolik.svg'





const Header = () => {
  const [gamburgerActive, setGamburgerActive] = useState(false);

  useEffect(() => {
    gamburgerActive ?
      document.querySelector("body").classList.add("noscroll") :
      document.querySelector("body").classList.remove("noscroll");
  }, [gamburgerActive])

  const gamburgerToggle = () => {
    setGamburgerActive(!gamburgerActive)
  }
  return (
    <header>
      <Container className='container--noIndex'>
        <div className={s.header}>
          <Link href="/">
            <Image
              src={logo}
              alt='logo'
              width={140}
              height={30} />
          </Link>
          <Navigation />
          <div className={s.actions}>
            <MiniProfile />
            <Link href="/addbolik" className={s.header__scanner}>
              <Image
                src={add}
                alt='Добавить болик'
              />
            </Link>
            <button
              className={cl(s.burger, { [s.burgerActive]: gamburgerActive })}
              onClick={gamburgerToggle}
            >
              <span className={s.burger__line}></span>
            </button>
            <div className={cl(s.menu, { [s.menuActive]: gamburgerActive })}>
              <div className={s.menu__content}>
                <Navigation gamburgerActive setGamburgerActive={setGamburgerActive} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
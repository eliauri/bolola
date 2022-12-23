import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import cl from 'classnames'
import s from './header.module.scss';

import Container from '../container/Container';
import Navigation from './navigation';
import AddBolik from './addBolik';

import logo from '../../public/logo.png'
import auto from '../../public/authorization.svg'



const Header = () => {
  const [gamburgerActive, setGamburgerActive] = useState(false);

  useEffect(() => {
    document.querySelector("body").classList.toggle("noscroll");
  }, [gamburgerActive])
  
  const gamburgerToggle = () => {
    setGamburgerActive(!gamburgerActive)
  }
  return (
    <header>
      <Container className='container--noIndex'>
        <div className={s.header}>
          <Link href="/"> <Image src={logo} alt='logo' /></Link>
          <Navigation />
          <div className={s.user}>
            <Link href="/">
              <Image
                src={auto}
                alt="authorization icon"
              />
            </Link>
            <AddBolik />
            <button
              className={cl(s.burger, { [s.burgerActive]: gamburgerActive })}
              onClick={gamburgerToggle}
            >
              <span className={s.burger__line}></span>
            </button>
            <div className={cl(s.menu, { [s.menuActive]: gamburgerActive })}>
              <div className={s.menu__content}>
                <Navigation />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
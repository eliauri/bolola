import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import s from './header.module.scss';
import Navigation from './navigation';
import AddBolik from './addBolik';

import logo from '../../public/logo.png'
import auto from '../../public/authorization.svg'
import Container from '../container/Container';

const header = () => {
  return (
    <header>
      <Container>
        <div className={s.header}>
          <Link href="/"> <Image src={logo} alt='logo' /></Link>
          <Navigation/>
          <div className={s.user}>
            <Link href="/">
              <Image
                src={auto}
                alt="authorization icon"
              />
            </Link>
            <AddBolik/>
          </div>
        </div>
      </Container>
    </header>
  )
}

export default header
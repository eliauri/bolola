import React from 'react'
import s from './footer.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../public/logo.svg'
import vk from '../../public/social/vk.png'
import instgram from '../../public/social/instagram.png'
import whatsapp from '../../public/social/whatsapp.png'
import telegram from '../../public/social/telegram.png'
import Container from '../Container';

const footer = () => {
  const social = [
    { id: 0, link: "", img: instgram },
    { id: 1, link: "", img: telegram },
    { id: 2, link: "", img: whatsapp },
    { id: 3, link: "", img: vk },
  ]
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
      href: '/account/collection',
    },
    {
      id: 4,
      title: 'Продукции',
      href: '/prod',
    },
    {
      id: 5,
      title: 'О нас',
      href: '/about',
    },
  ]
  const PrivateLinks = [
    {
      id: 1,
      title: 'Личный кабинет',
      href: '/account',
    },
    {
      id: 2,
      title: 'Добавление болика',
      href: '/addbolik',
    },

  ]
  return (
    <footer className={s.footer}>
      <Container className='container--Index'>
        <div className={s.topLine}>
          <Link href="/">
            <Image
              src={logo}
              alt='logo'
              width={140}
              height={30} />
          </Link>
          <p className={s.slogan}>Охлаждайтесь лимонадом Болола!</p>
        </div>
        <hr />
        <div className={s.nav}>
          <nav className={s.nav__menu}>
            <ul>
              {links.map((link) => (
                <li key={link.id}>
                  <Link href={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav className={s.nav__menu}>
            <ul>
              {PrivateLinks.map((link) => (
                <li key={link.id}>
                  <Link href={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className={s.contact}>
            <Link className={s.number} href={'tel:+78672403163'}>+7 (8672) 403-163</Link>
            <Link href={'mailto:bolola@mail.ru'}>bolola@mail.ru</Link>
          </div>
          <div className={s.contact}>
            <div className={s.socialnet}>
              {social.map((el) => (
                <Link key={el.id} href={el.link} >
                 
                  <Image src={el.img} alt='' width={50} height={50} />
    
                </Link>
              ))}
            </div>
            <p className={s.adress}>г. Владикавказ,ул. Весенняя 7/6</p>
          </div>
        </div>
        <hr />
        <div className={s.bottomLine}>
          <Link href={'/'}>Политика конфиденциальности</Link>
          <p>Сайт разработали <Link href={''}>мы</Link>:)</p>
        </div>
      </Container>
    </footer>
  )
}

export default footer
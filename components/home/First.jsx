import React from 'react'
import { useEffect, useRef } from 'react'

import cl from 'classnames'
import Image from 'next/image'
import { gsap } from "gsap";
import s from './home.module.scss'

import bolikImg from '../../public/bolik.gif'

import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'
import Container from '../Container'
import Link from 'next/link';


const First = () => {
  const app = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.current = gsap
        .fromTo(".bubble", { y: 1000 }, { y: 0, duration: 2.5,  stagger: {each:0.1,from: "random", ease: "power1.out", }, })
      gsap.current = gsap
        .fromTo(".bubble", { x: -25, }, { x: 0, ease: "power1.inOut", duration: 2,stagger: {each:0.1, from: "random", repeat:-1, yoyo: true} , })
    }, app)

  }, [])

  return (
    <section ref={app} className={cl(s.first, 'first')}>
      <Container className={s.container}>
        <div className={s.first__wrapper}>
          <div className={s.first__left}>
            <h1 className={s.first__title}>Шипучий лимонад <span>Болола</span></h1>
            <p className={s.first__description}>Собери свою коллекцию Боликов с твоими любимыми персонажами</p>
            <Link href='/add_bolik' className={s.first__button}> Добавить болик</Link>

          </div>
          <div className={s.first__right}>
            <Image src={bolikImg} alt='Фишка болик' priority />
          </div>
        </div>
      </Container>
      <div className='bubbles'>
        <BubbleGroup>
          <Bubble size='small' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='tiny' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='small' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='medium' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='big' color="white" />
          <Bubble size='tiny' color="white" />
          <Bubble size='medium' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='medium' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='medium' color="white" />
          <Bubble size='tiny' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='big' color="white" />
          <Bubble size='tiny' color="white" />
        </BubbleGroup>
      </div>
    </section>
  )
}

export default First
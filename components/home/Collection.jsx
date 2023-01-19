import React from 'react'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import cl from 'classnames'

import s from './home.module.scss'
import Container from '../Container'
import Title from '../title/title'
import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'

import { gsap } from "gsap";

import gavs from '../../public/Gavs.png'


const Collection = () => {
  const app = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.current = gsap
        .fromTo(".bubble", { y: 400,  opacity:1 }, { y: -400, opacity:0.5, duration: 3,  stagger: {each:0.3,ease: "none.none",repeat: -1,}, })
      gsap.current = gsap
        .fromTo(".bubble", { x: -25, }, { x: 0, ease: "power1.inOut", duration: 0.8, stagger: {each:0.1, from: "random", repeat:-1, yoyo: true} , })
    }, app)

  }, [])

  return (
    <section className={cl(s.collection, 'collection')} ref={app} >
      <Container>
        <Title className={s.collection__title} type='medium' color='black'>Собери полную коллекцию боликов и получи приз!</Title>
        <div className={s.collection__wrapper}>
          <ul className={s.collection__list}>
            <li><span className={s.collection__order}>1</span>Купи лимонад в магазине</li>
            <li><span className={s.collection__order}>2</span>Зарегистрируйся на сайте</li>
            <li><span className={s.collection__order}>3</span>Добавь Болик в коллекцию</li>
            <li><span className={s.collection__order}>4</span>Получи орден</li>
          </ul>
          <div  className={s.collection__img}>
            <Image
              src={gavs}
              alt="Генерал Гавс"
              width={360}
              height={500}
            />
            <div className='bubbles'>
              <BubbleGroup >
                <Bubble size='tiny' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
                <Bubble size='medium' color="pinkOpacity" />
              </BubbleGroup >
              <BubbleGroup  >
                <Bubble size='medium' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup  >
                <Bubble size='tiny' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup  >
                <Bubble size='medium' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup  >
                <Bubble size='small' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup >
                <Bubble size='tiny' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup >
                <Bubble size='tiny' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
              </BubbleGroup>
              <BubbleGroup >
                <Bubble size='tiny' color="pinkOpacity" />
                <Bubble size='small' color="pinkOpacity" />
                <Bubble size='medium' color="pinkOpacity" />
              </BubbleGroup >
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Collection
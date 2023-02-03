import React from 'react'
import cl from 'classnames'
import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { gsap } from "gsap";


import s from './home.module.scss'
import Container from '../Container'
import Title from '../title/title'
import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'


const About = () => {
  const app = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.current = gsap.timeline()
        .fromTo(".bubble", { x: -25, }, { x: 0, ease: "power1.inOut", duration: 2, stagger: { each: 0.1, from: "random", repeat: -1, yoyo: true }, })
    }, app)
  }, [])

  const aboutInNumbers = [
    {
      id: 1,
      number: 42,
      text: "Фишки-Боликов"
    },
    {
      id: 2,
      number: '100%',
      text: "Натуральный состав"
    },
    {
      id: 3,
      number: 3,
      text: "Свежих вкуса"
    },
  ]
  return (
    <section ref={app} className={cl(s.about, `about`)}>
      <Container className='container--Index'>
        <div className={s.about__wrapper}>
          <Title type='medium' color='black' className={s.about__title}>что такое болола?</Title>
          <div className={s.about__numbers}>
            {aboutInNumbers.map((item) =>
              <div key={item.id} className={s.about__number}>
                <span>{item.number}</span>
                {item.text}
              </div>
            )}

          </div>
          <div className={s.about__info}>
            <h3>
              Почему лимонад Болола рекоммендуют?
            </h3>
            <p>Болола освежает, утоляет жажду и насыщает организм полезными веществами. Напиток с натуральным составом укрепляет иммунитет, помогает организму бороться с инфекциями и выводить токсины, поддерживать водный баланс, препятствует старению организма, снижает давление, повышает аппетит.</p>
          </div>
        </div>
       
      </Container>
      <div className='bubbles'>
          <BubbleGroup>
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='medium' color="pinkOpacity" />
            <Bubble size='big' color="pinkOpacity" />
          </BubbleGroup>
          <BubbleGroup>
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='big' color="pinkOpacity" />
          </BubbleGroup>
          <BubbleGroup>
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='tiny' color="pinkOpacity" />
          </BubbleGroup>
          <BubbleGroup>
            <Bubble size='medium' color="pinkOpacity" />
            <Bubble size='big' color="pinkOpacity" />
            <Bubble size='tiny' color="pinkOpacity" />
          </BubbleGroup>
          <BubbleGroup>
            <Bubble size='tiny' color="pinkOpacity" />
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='small' color="pinkOpacity" />
            <Bubble size='medium' color="pinkOpacity" />
          </BubbleGroup>
        </div>
    </section>
  )
}

export default About
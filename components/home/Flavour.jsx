import React from 'react'
import Image from 'next/image'
import cl from 'classnames'
import { useEffect, useRef } from 'react'
import { gsap } from "gsap";

import s from './home.module.scss'
import Container from '../Container'
import Title from '../title/title'
import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'

import berryFlavour from '../../public/flavour/berry.png'
import pearFlavour from '../../public/flavour/pear.png'
import tarragonFlavour from '../../public/flavour/tarragon.png'

const flavours = [
  {
    id: 1,
    image: pearFlavour,
    text: 'Груша',
    color: 'yellow',
  },
  {
    id: 2,
    image: tarragonFlavour,
    text: 'Тархун',
    color: 'green'
  },
  {
    id: 3,
    image: berryFlavour,
    text: 'Вишня',
    color: 'pink'
  },

]

const Flavour = () => {
  const app = useRef();

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.current = gsap.timeline()
        .fromTo(".bubble", { x: -25, }, { x: 0, ease: "power1.inOut", duration: 2, stagger: { each: 0.1, from: "random", repeat: -1, yoyo: true }, })
    }, app)

  }, [])
  return (
    <section ref={app} className={cl(s.flavour, 'flavour')}>
      <Container className="container--Index">
        <div className={s.flavour__wrapper}>
          <Title type='medium' color='white' className={s.flavour__title}>ВЫБери свой вкус!</Title>
          <div className={s.flavour__list} >
            {flavours.map((flavour) =>
              <div key={flavour.id} className={s.flavour__element + ' flavour__element'}>
                <div className={s.flavour__image}>
                  <Image
                    src={flavour.image}
                    alt={flavour.text}
                    width={300}
                    height={300}
                  /></div>
                <p className={s.flavour__text}>{flavour.text}</p>
                <div className='bubbles'>
                  <BubbleGroup>
                    <Bubble size='tiny' color="white" />
                    <Bubble size='medium' color="white" />
                    <Bubble size='small' color="white" />
                    <Bubble size='small' color="white" />
                  </BubbleGroup>
                  <BubbleGroup>
                    <Bubble size='small' color="white" />
                    <Bubble size='medium' color="white" />
                  </BubbleGroup>
                </div>
                </div>
            )}
              </div>
        </div>

      </Container>
      <div className='bubbles'>
        {/* <BubbleGroup>
          <Bubble size='tiny' color="white" />
          <Bubble size='medium' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='small' color="white" />
        </BubbleGroup>
        <BubbleGroup>
        <Bubble size='small' color="white" />
          <Bubble size='medium' color="white" />
        </BubbleGroup> */}
        {/* <BubbleGroup>
          <Bubble size='tiny' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='medium' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='medium' color="white" />
          <Bubble size='small' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='medium' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='tiny' color="white" />
        </BubbleGroup>
        <BubbleGroup>
          <Bubble size='medium' color="white" />
          <Bubble size='tiny' color="white" />
          <Bubble size='small' color="white" />
          <Bubble size='tiny' color="white" />
        </BubbleGroup> */}
      </div>

    </section>
  )
}

export default Flavour
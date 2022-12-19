import React from 'react'
import Image from 'next/image'
import cl from 'classnames'

import s from '../../styles/home.module.scss'
import Container from '../container/Container'
import Title from '../title/title'
import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'

import bluewave from '../../public/waves/blueWave.svg'
import berryFlavour from '../../public/flavour/berry.png'
import pearFlavour from '../../public/flavour/pear.png'
import tarragonFlavour from '../../public/flavour/tarragon.png'

const flavours = [
  {
    id: 1,
    image: pearFlavour,
    text: 'Груша',
    color: 'yellow'
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
    text: 'Ягода',
    color: 'pink'
  },

]

const Flavour = () => {
  return (
    <section className={cl(s.flavour, 'flavour')} style={{ backgroundImage: `url(${bluewave.src})` }}>
      <Container>
        <Title type='medium' color='blue' className={s.flavour__title}>ВЫБери свой вкус!</Title>

        <div className={s.flavour__list} >
          {flavours.map((flavour) =>
            <div key={flavour.id} className={s.flavour__element}>
              <div className={s.flavour__image}>
                <Image
                src={flavour.image}
                alt={flavour.text}
              /></div>
              <p className={s.flavour__text} style={{ color: `var(--color-${flavour.color})` }}>{flavour.text}</p>
            </div>
          )}
        </div>
      </Container>
      <div className='bubbles'>
      <BubbleGroup>
        <Bubble size='medium' color="blue" />
        <Bubble size='small' color="blue" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="blue" />
        <Bubble size='medium' color="blue" />
        <Bubble size='tiny' color="blue" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='tiny' color="blue" />
        <Bubble size='small' color="blue" />
        <Bubble size='small' color="blue" />
        <Bubble size='tiny' color="blue" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="blue" />
        <Bubble size='tiny' color="blue" />
        <Bubble size='small' color="blue" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='medium' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="white" />
        <Bubble size='tiny' color="white" />
        <Bubble size='medium' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="white" />
        <Bubble size='tiny' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="white" />
        <Bubble size='tiny' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='big' color="white" />
        <Bubble size='small' color="white" />
        <Bubble size='medium' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='tiny' color="blue" />
        <Bubble size='small' color="blue" />
        <Bubble size='medium' color="blue" />
      </BubbleGroup>
      </div>
      
    </section>
  )
}

export default Flavour
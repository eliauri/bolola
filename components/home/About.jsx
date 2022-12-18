import React from 'react'
import cl from 'classnames'
import Image from 'next/image'

import waveTop from '../../public/waves/wave-top.svg'
import waveBottom from '../../public/waves/wave-bottom.svg'
// import subwave from '../../public/waves/subwave.svg'

import s from './home.module.scss'
import Container from '../container/Container'
import Title from '../title/title'
import Bubble from '../bubble/bubble'
import BubbleGroup from '../bubble/bubbleGroup'


const About = () => {
  return (
    <section className={cl(s.about, `about`)}>
      <Image
        src={waveTop}
        alt="waveTop"
        height="0"
        style={{ width: '100%', height: 'auto' }}
      />
      <Container>
        <Title type='medium' color='white' className={s.about__title}>что такое болола?</Title>
        <div className={s.about__list}>
          <div className={s.about__element}>Вкусный напиток для детей и взрослых</div>
          <div className={s.about__element}>Натуральный состав, подтвержденный лабораторными исследованиями</div>
          <div className={s.about__element}>Болик-фишка, для игры с друзьями</div>
        </div>
      </Container>
      <Image
        src={waveBottom}
        alt="waveBottom"
        height="300"
        style={{ width: '100%', height: 'auto' }}
      />
      <Image
        src={subwave}
        alt="waveBottom"
        style={{ width: '100%', height: 'auto', position: 'relative', top: '-10px' }}
      />
      <div className='bubbles'>
      {/* <BubbleGroup>
        <Bubble size='medium' color="white" />
        <Bubble size='big' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='big' color="white" />
        <Bubble size='medium' color="white" />
        <Bubble size='small' color="white" />
        <Bubble size='small' color="white" />
        <Bubble size='tiny' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="pink" />
        <Bubble size='tiny' color="pink" />
        <Bubble size='medium' color="pink" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="pink" />
        <Bubble size='small' color="pink" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='medium' color="pink" />
        <Bubble size='big' color="pink" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="white" />
        <Bubble size='big' color="white" />
        <Bubble size='small' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='small' color="white" />
        <Bubble size='medium' color="white" />
        <Bubble size='small' color="white" />
      </BubbleGroup>
      <BubbleGroup>
        <Bubble size='medium' color="white" />
      </BubbleGroup> */}
      </div>
      
    </section>
  )
}

export default About
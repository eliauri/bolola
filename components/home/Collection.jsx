import React from 'react'
import Image from 'next/image'
import cl from 'classnames'

import s from '../../styles/home.module.scss'
import Container from '../container/Container'
import Title from '../title/title'

import gavs from '../../public/Gavs.png'


const Collection = () => {
  return (
    <section className={cl(s.collection, 'collection')}>
        <Container>
          <Title className={s.collection__title} type='medium'>Собери полную коллекцию боликов и получи приз!</Title>
          <div className={s.collection__wrapper}>
            <ul className={s.collection__list}>
              <li><span className={s.collection__order}>1</span>Купи лимонад в магазине</li>
              <li><span className={s.collection__order}>2</span>Зарегистрируйся на сайте</li>
              <li><span className={s.collection__order}>3</span>Добавь Болик в коллекцию</li>
              <li><span className={s.collection__order}>4</span>Получи орден</li>
            </ul>
            <div className={s.collection__img}>
              <Image
                src={gavs}
                alt="Генерал Гавс"
                width={360}
                height={500}
              />
            </div>
          </div>
        </Container>
      </section>
  )
}

export default Collection
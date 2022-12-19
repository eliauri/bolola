import React from 'react'
import Image from 'next/image'

import s from '../../styles/news.module.scss'
import Container from '../../components/container/Container'
import Title from '../../components/title/title'
import newsImg from '../../public/news-post.jpg'

const Post = () => {
  const post = {
    id: 3,
    title: 'Новый вкус “Апельсин” от Болола уже в продаже',
    date: '10.12.2022',
    img: newsImg,
    content: "Сборная Аргентины обыграла команду Франции в послематчевой серии пенальти и стала победителем чемпионата мира по футболу в Катаре. Основные два тайма финальной встречи на стадионе Лусаил Айконик завершились со счетом 2:2, в дополнительное время команды обменялись забитыми мячами. У сборной Аргентины дубль оформил Лионель Месси.",
  }
  return (
    <section className={s.news}>
      <Container>
        <div className={s.news__image}>
          <Image src={post.img} alt='' fill={true} />
        </div>
        <div className={s.news__info}>
          <h1 className={s.news__title}>{post.title}</h1>
          <div className={s.news__date}>{post.date}</div>
          <p>{post.content}</p>
        </div>
      </Container>
    </section>
  )
}

export default Post
import React from 'react'


import cl from 'classnames'


import s from '../../styles/home.module.scss'

import newsImg from '../../public/news-post.jpg'
import newsImg2 from '../../public/RjVGAt0I-Ks.jpg'
import stokImg from '../../public/stock.jpg'
import Title from '../../components/title/title'
import Container from '../../components/container/Container'
import NewsPost from '../../components/news/NewsPost'
import Slider from '../../components/news/swiper/Slider'




export default function News() {
  const news = [
    {
      id: 1,
      title: 'Новый вкус “Апельсин” от Болола уже в продаже',
      date: '10.12.2022',
      img: newsImg
    },
    {
      id: 2,
      title: 'Новый вкус “Апельсин” от Болола уже в продаже',
      date: '10.12.2022',
      img: newsImg2
    },
    {
      id: 3,
      title: 'Новый вкус “Апельсин” от Болола уже в продаже',
      date: '10.12.2022',
      img: newsImg
    }
  ]
  const stocks = [
    {
      id: 1,
      img: stokImg
    },
    {
      id: 2,
      img: newsImg2
    },
    {
      id: 3,
      img: stokImg
    }
  ]
  return (
    <>
      <Container>
        <Title color='black' className={s.news__title}>Новости компании</Title>
        <Slider posts={stocks}/>
        <div className={s.news__list}>
          {news.map((post) =>
            <NewsPost post={post} key={post.id} />
          )}
        </div>
      </Container>
    </>
  )
}

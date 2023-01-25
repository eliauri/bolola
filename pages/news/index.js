import React from 'react'

import s from '../../components/home/home.module.scss'
import Title from '../../components/title/title'
import Container from '../../components/Container'
import NewsPost from '../../components/news/NewsPost'
import Promotions from '../../components/news/PromotionsSlider'




export default function News({news, promotions}) {
  return (
    <>
      <Container>
        <Title color='black' className={s.news__title}>Новости компании</Title>
        <Promotions posts={promotions}/>
        <div className={s.news__list}>
          {news.map((post) =>
            <NewsPost post={post} key={post.id} />
          )}
        </div>
      </Container>
    </>
  )
}
export async function getStaticProps() {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const news = await fetch(`${process.env.BASE_URL}/api/news`, options)
    .then((res) => res.json())
    .catch(err => console.log(err));

  const promotions = await fetch(`${process.env.BASE_URL}/api/promotions`, options)
  .then((res) => res.json())
  .catch(err => console.log(err));
  return {
    props: {
      news,
      promotions
    },
  }
}


import React from 'react'

import s from '../../components/home/home.module.scss'
import Title from '../../components/title/title'
import Container from '../../components/Container'

import Promotions from '../../components/news/PromotionsSlider'
import NewsList from '../../components/news/NewsList'
import axios from '../api/axios'

export default function News({news, promotions}) {
  return (
    <>
      <Container>
        <Title color='black' className={s.news__title}>Новости компании</Title>
        <Promotions posts = {promotions}/>
        <NewsList posts = {news}/>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const news = await axios.get('/news')
  .then(news => news.data)
  .catch(err => console.log(err));

  const promotions = await axios.get('/promotions')
  .then(promotions => promotions.data)
  .catch(err => console.log(err));

  return {
    props: {
      news,
      promotions
    },
  }
}


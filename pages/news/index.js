import React from 'react'

import s from '../../components/news/news.module.scss'
import Title from '../../components/title/title'
import Container from '../../components/Container'

import Promotions from '../../components/news/PromotionsSlider'
import NewsList from '../../components/news/NewsList'
import axios from '../api/axios'
import Head from 'next/head'

export default function News({news, promotions}) {
  return (
    <>
     <Head>
        <title>Новости - Болола</title>
        <meta name="description" content="Следите за последними новостями и акциями компании Болола" />
      </Head>
      <Container>
        <Title color='black' className={s.titleMain}>Новости компании</Title>
        <Promotions posts = {promotions}/>
        <NewsList posts = {news}/>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
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


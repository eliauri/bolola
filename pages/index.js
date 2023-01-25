import Head from 'next/head'

// import s from '../styles/home.module.scss'

import First from '../components/home/First'
import About from '../components/home/About'
import Collection from '../components/home/Collection'
import Flavour from '../components/home/Flavour'
import News from '../components/home/News'



export default function Home({ news }) {
  return (
    <>
      <Head>
        <title>Bolola</title>
        <meta name="description" content="Шипучий лимонад Бололо" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <First />
      <About />
      <Collection />
      <Flavour />
      <News posts={news} />
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
  const res = await fetch(`${process.env.BASE_URL}/api/news`, options)
    .then((res) => res.json())
    .catch(err => console.log(err))
  const news = res ? res.slice(0, 3) : [];
  
  return {
    props: {
      news,
    },
  }
}


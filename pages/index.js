import Head from 'next/head'

// import s from '../styles/home.module.scss'

import First from '../components/home/First'
import About from '../components/home/About'
import Collection from '../components/home/Collection'
import Flavour from '../components/home/Flavour'



export default function Home() {
  return (
    <>
      <Head>
        <title>Bolola</title>
        <meta name="description" content="Шипучий лимонад Бололо" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <First/>
      <About/>
      <Collection/>
      <Flavour/>
    </>
  )
}

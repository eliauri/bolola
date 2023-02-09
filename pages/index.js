import Head from 'next/head'
import First from '../components/home/First'
import About from '../components/home/About'
import Collection from '../components/home/Collection'
import Flavour from '../components/home/Flavour'
import News from '../components/home/News'
import axios from './api/axios'



export default function Home({ news }) {
  return (
    <>
      <Head>
        <title>Bolola</title>
        <meta name="description" content="Шипучий лимонад Бололо" />
      </Head>
      <First />
      <About />
      <Collection />
      <Flavour />
      <News posts={news} />
    </>
  )

}

export async function getServerSideProps() {
  const res = await axios.get('/news')
  .then(res => res.data)
  .catch(err => console.log(err))
  const news = res ? res.slice(0, 3) : [];
  
  return {
    props: {
      news,
    },
  }
}

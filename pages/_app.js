
import 'reset-css';
import '../styles/globals.scss'
import '../styles/bubble.scss'
import '../styles/swiper.scss'
import Layout from '../components/layout/layout'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || function (page) {
    return <Layout>{page}</Layout>;
  };
 
  return getLayout( <Component {...pageProps} />)
  
}

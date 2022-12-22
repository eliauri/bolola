
import 'reset-css';
import '../styles/globals.scss'
import '../styles/bubble.scss'
import Layout from '../components/layout'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
import { store } from '../store/store';
import { Provider } from "react-redux";
import 'reset-css';
import '../styles/globals.scss'
import '../styles/bubble.scss'
import '../styles/swiper.scss'
import Layout from '../components/layout/layout'

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || function (page) {
    return (
      <Provider store={store}>
        <Layout>{page}</Layout>
      </Provider>
    )
  };

  return getLayout(
    <Provider store={store}>
    <Component {...pageProps} />
    </Provider>
  )

}

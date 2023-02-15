import 'reset-css';
import '../styles/globals.scss'
import '../styles/bubble.scss'
import '../styles/swiper.scss'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import Layout from '../components/layout/layout'
import { Provider } from 'react-redux';
import store from '../store/store';

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <Provider store={store}>
       <SkeletonTheme baseColor="#cdcdcd" highlightColor="#dfdddd66">
        {getLayout(<Component {...pageProps} />)}
       </SkeletonTheme>
    </Provider>
);
}



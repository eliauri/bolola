import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../Container'
import s from './collection.module.scss'
import AccountNav from '../AccountNav'
import cl from 'classnames'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/auth/action-creators'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import HorizontalScroll from './HorizontalScroll'


const Collection = () => {
  const axiosPrivate = useAxiosPrivate();
  const [boliks, setBoliks] = useState([]);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const getBoliks = async () => {
    try {
      const response = await axiosPrivate.get('/user/boliks/');
      setBoliks(response.data);
    } catch (err) {
      console.error(err);
    }
  }
  useEffect(() => {
    // rome-ignore lint/complexity/useSimplifiedLogicExpression: <explanation>
    if (!isLoggedIn) {
      dispatch(logoutUser());
    } else {
      getBoliks();
    }
  }, []);
  console.log(boliks)
  return (
    <article className={s.collections}>
      <Container>
        <AccountNav />
        <h1 className={s.title}>Коллекция боликов</h1>
      </Container>
      {
        boliks.map((collection) => (
          <section className={cl(s.block, { [s.collected]: collection.collected })} key={collection.idCollection}>
            <div className={s.absolute}>
              {
                !collection.collected ?
                  <h2 className={s.subtitle}>{collection.nameCollection}</h2>
                  : <h2 className={cl(s.subtitle, s.award)}>Забрать награду</h2>
              }

            </div>
            <HorizontalScroll className={s.list}>
              {
                collection.collection.map((col) => (
                  <div className={cl(s.bolik, { [s.opacity]: !col.count })} key={col.id}>
                    <Image src={process.env.NEXT_PUBLIC_IMG_URL + col.image} alt={`bolik ${col.bolik}`} height={150} width={150} />

                    {
                      col.count > 1 ?
                        <div className={s.count}>
                          x<span>{col.count}</span>
                        </div>
                        : ''
                    }
                  </div>

                ))
              }
            </HorizontalScroll>

          </section>
        ))
      }





    </article>
  )
}

export default Collection
import React from 'react';
import Container from '../../components/Container';
import Image from 'next/image';
import s from './news.module.scss';
import useFormattedDate from '../../hooks/useFormattedDate'

const NewsPage = ({data}) => {
    const date = useFormattedDate;
  return (
    <section className={s.news}>
      <Container>
        <div className={s.news__image}>
          <Image src={process.env.NEXT_PUBLIC_IMG_URL + data.thumbnail} alt='' fill={true} />
        </div>
        <div className={s.news__info}>
          <h1 className={s.news__title}>{data.title}</h1>
          <div className={s.news__date}>
            {date(data.updated_at)}
          </div>
          <p>{data.content}</p>
        </div>
      </Container>
    </section>
  )
}

export default NewsPage
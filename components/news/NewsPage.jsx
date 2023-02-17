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
        <div className={s.image}>
          <Image src={process.env.NEXT_PUBLIC_IMG_URL + data.thumbnail} alt='' fill={true} />
        </div>
        <div className={s.info}>
          <h1 className={s.title}>{data.title}</h1>
          <div className={s.date}>
            {date(data.updated_at)}
          </div>
          <div className={s.content} dangerouslySetInnerHTML={{__html: data.content}}></div>
        </div>
      </Container>
    </section>
  )
}

export default NewsPage
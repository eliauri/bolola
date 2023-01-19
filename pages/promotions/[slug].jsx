import React from 'react'
import Image from 'next/image'

import s from '../news/news.module.scss'
import Container from '../../components/Container'


const Post = ({post}) => {
  console.log(post);
  return (
    <section className={s.news}>
      <Container>
        <div className={s.news__image}>
          <Image src={process.env.NEXT_PUBLIC_IMG_URL + post.thumbnail} alt='' fill={true} />
        </div>
        <div className={s.news__info}>
          <h1 className={s.news__title}>{post.title}</h1>
          <div className={s.news__date}>
            {new Date(post.updated_at).toLocaleDateString("en-GB")}
          </div>
          <p>{post.content}</p>
        </div>
      </Container>
    </section>
  )
}
export async function getServerSideProps  (context) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const res = await fetch(`${process.env.BASE_URL}api/promotions/${context.query.id}`, options)
    .then((res) => res.json());
  const post = res;

  return {
    props: {
      post,
    },
  }
}
export default Post
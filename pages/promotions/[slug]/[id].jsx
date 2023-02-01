import React from 'react'
import NewsPage from '../../../components/news/NewsPage'
import axios from '../../api/axios'

const Post = ({ post }) => {
  return (
    <NewsPage data={post} />
  )
}


export async function getStaticPaths() {
  const promotions = await axios.get('/promotions')
    .then(promotions => promotions.data);

  const paths = promotions.map((post) => ({
    params: { id: post.id.toString(), slug: post.slug },
  }))

  return {
    paths,
    fallback: false,
  }
}
export async function getStaticProps(context) {
  const post = await axios.get(`/promotion/${context.params.id}`)
    .then(post => post.data)
  .catch(err => console.log(err));
  return {
    props: {
      post,
    },
  }
}


export default Post
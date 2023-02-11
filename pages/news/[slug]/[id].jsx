import Head from 'next/head';
import React from 'react'
import NewsPage from '../../../components/news/NewsPage'
import axios from '../../api/axios';


const Post = ({post}) => {
  return (
    <>
    <Head>
        <title>{post.title} - Болола</title>
    </Head>
      <NewsPage data={post}/>
    </>

  )
}

export async function getServerSideProps({ params }) {
  const post = await axios.get(`/news/${params.id}`)
    .then(post => post.data)
    .catch(err => console.log(err));
  return {
    props: {
      post,
    },
  }
}
export default Post
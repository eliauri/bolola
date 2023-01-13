import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import newsImg from '../../public/news-post.jpg'

import s from '../home/home.module.scss'

const NewsPost = ({ post }) => {
    return (
        <Link 
        href={{
            pathname: `/news/${post.slug}`,
            query: {
                id: post.id,
            }
        }}
        className={s.news__new}>
            <div className={s.news__image}>
                <Image src={process.env.NEXT_PUBLIC_IMG_URL +   post.thumbnail} alt={post.title} fill={true} />
            </div>
            <div className={s.news__info}>
                <h3 className={s.news__subtitle}> {post.title}</h3>
                <div className={s.news__date}>{post.date}</div>
            </div>
        </Link>
    )
}

export default NewsPost
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import s from '../../styles/home.module.scss'

const NewsPost = ({ post }) => {
    return (
        <Link href={`/news/${post.title}`} className={s.news__new}>
            <div className={s.news__image}>
                <Image src={post.img} alt={post.title} fill={true} />
            </div>
            <div className={s.news__info}>
                <h3 className={s.news__subtitle}> {post.title}</h3>
                <div className={s.news__date}>{post.date}</div>
            </div>
        </Link>
    )
}

export default NewsPost
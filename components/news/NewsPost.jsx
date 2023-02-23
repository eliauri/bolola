import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import useFormattedDate from '../../hooks/useFormattedDate'
import s from '../home/home.module.scss'

const NewsPost = ({ post }) => {
    const date = useFormattedDate;
    return (
        <Link
            href={{
                pathname: `/news/${post.slug}/${post.id}`
            }}
            className={s.new}>
            <div className={s.image}>
                <Image
                    src={process.env.NEXT_PUBLIC_IMG_URL + post.thumbnail}
                    alt={post.title}
                    fill={true}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
            </div>
            <div className={s.info}>
                <h3 className={s.subtitle}> {post.title}</h3>
                <div className={s.date}>{date(post.created_at)}</div>
            </div>
        </Link>
    )
}

export default NewsPost
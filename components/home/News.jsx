import React, { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cl from 'classnames'
import s from './home.module.scss'
import Container from '../Container'
import Title from '../title/title'
import useFormattedDate from '../../hooks/useFormattedDate'
import { gsap } from "gsap";


const News = ({ posts }) => {
    const date = useFormattedDate;
   

    return (
        <section  className={cl(s.news, "news")}>
            <Container>
                <Title type='medium' color='black' >Новости</Title>
                <div className={s.list}>
                    {
                        posts?.map((post) =>
                            <Link
                                href={{
                                    pathname: `/news/${post.slug}/${post.id}`,
                                }}
                                key={post.id}
                                data-animate='new'
                                className={s.new}>
                                <div className={s.image}>
                                    <Image src={process.env.NEXT_PUBLIC_IMG_URL + post.thumbnail} alt={post.title}
                                        fill={true}
                                        priority
                                        sizes="(max-width: 768px) 100vw,
                                               (max-width: 1200px) 50vw,
                                                    33vw"
                                    />
                                </div>
                                <div className={s.info}>
                                    <h3 className={s.subtitle}> {post.title}</h3>
                                    <div className={s.date}>{date(post.created_at)}</div>
                                </div>
                            </Link>
                        )}
                </div>
                <div className={s.more}> <Link href='/news' >Смотреть все новости</Link></div>
            </Container>
        </section>
    )
}


export default News
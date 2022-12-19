import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import cl from 'classnames'

import s from '../../styles/home.module.scss'
import Container from '../container/Container'
import Title from '../title/title'
import newsImg from '../../public/news-post.jpg'


const News = () => {
    const news = [
        {
            id: 1,
            title: 'Новый вкус “Апельсин” от Болола уже в продаже',
            date: '10.12.2022',
            img: newsImg
        },
        {
            id: 2,
            title: 'Новый вкус “Апельсин” от Болола уже в продаже',
            date: '10.12.2022',
            img: newsImg
        },
        {
            id: 3,
            title: 'Новый вкус “Апельсин” от Болола уже в продаже',
            date: '10.12.2022',
            img: newsImg
        }
    ]
    return (
        <section className={cl(s.news, "news")}>
        
            <Container>
                <Title type='medium' color='black' >Новости</Title>
                <div className={s.news__list}>
                    {news.map((post) =>
                        <Link  href={`/news/${post.title}`} key={post.id} className={s.news__new}>
                           <div className={s.news__image}><Image src={post.img} alt={post.title} fill={true}/></div>
                            <div className={s.news__info}>
                                <h3 className={s.news__subtitle}> {post.title}</h3>
                                <div className={s.news__date}>{post.date}</div>
                            </div>
                        </Link>
                    )}
                </div>
                <div className={s.news__more}> <Link href='/news' >Смотреть все новости</Link></div>
            </Container>

        </section>
    )
}

export default News
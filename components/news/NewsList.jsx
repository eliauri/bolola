import React from 'react'
import s from '../home/home.module.scss'
import NewsPost from './NewsPost'

const NewsList = ({posts}) => {
    return (
        <div className={s.newsPage}>
        <div className={s.list}>
            {posts.map((post) =>
                <NewsPost post={post} key={post.id} />
            )}
        </div>
        </div>
    )
}

export default NewsList
import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = ({posts}) => {
    console.log(posts)
    return (
        posts.length ?
        <Swiper 
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            slidesPerView={1}
            loop={true}
            className='news-slider'
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
        >
            {posts.map((post) =>
                <SwiperSlide key={post.id}  className='news-slider__slide'>
                    <Link href={{
                        pathname: `/promotions/${post.slug}/${post.id}`,
                    }}>
                        <Image src={process.env.NEXT_PUBLIC_IMG_URL + post.thumbnail} width={1080} height={400} alt={'акция ' + post.id} />
                    </Link>
                </SwiperSlide>
            )}
        </Swiper> : <></>
    )
}

export default Slider
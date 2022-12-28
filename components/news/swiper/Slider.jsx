import React from 'react'
import Link from 'next/link'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper';
import Image from 'next/image'
import 'swiper/css';
import 'swiper/css/pagination';

const Slider = ({posts}) => {
    return (
        <Swiper 
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect={"coverflow"}
            pagination={{ clickable: true }}
            slidesPerView={1}
            loop={true}
            className='news-slider'
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              }}
        >
            {posts.map((post) =>
                <SwiperSlide key={post.id}  className='news-slider__slide'>
                    <Link href={`/news/${post.id}`}>
                        <Image src={post.img} alt={'акция ' + post.id} />
                    </Link>
                </SwiperSlide>
            )}
        </Swiper>
    )
}

export default Slider
import React, { useEffect, useState } from 'react'
import s from './collection.module.scss'
import Image from 'next/image'
import cl from 'classnames'
import Skeleton from 'react-loading-skeleton'
import "react-loading-skeleton/dist/skeleton.css";

const Bolik = ({ data }) => {
    const [isImageReady, setIsImageReady] = useState(false);

    const onLoadCallBack = (e) => {
        setIsImageReady(true)
    }

    return (
        <>
            <div className={cl(s.bolik, { [s.opacity]: !data.count })} key={data.id}>
                <Image
                    src={process.env.NEXT_PUBLIC_IMG_URL + data.image}
                    alt={''}
                    fill
                    className='borderImg'
                    style={{ opacity: !isImageReady ? '0' : '' }}
                    onLoadingComplete={onLoadCallBack}
                    sizes="150px"
                />
                {!isImageReady && (
                    <Skeleton circle width='100% 'height='100%' />
                )}
                {
                    data.count > 1 ?
                        <div className={s.count}>
                            x<span>{data.count}</span>
                        </div>
                        : ''
                }
            </div>
        </>
    )
}

export default Bolik
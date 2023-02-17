/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import cl from 'classnames'
import s from '../bolikСheck/bolikCheck.module.scss'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, clearBolik } from '../../../store/bolik/addbolik-slice';
import Skeleton from 'react-loading-skeleton'
import { gsap } from "gsap";
import { useRef } from 'react'

const BolikSave = () => {
    const [errMsg, setErrMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isImageReady, setIsImageReady] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const bolik = useSelector(state => state.bolik.bolik);
    const img = useRef(null);
    const message = useRef(null);

    const onLoadCallBack = (e) => {
        setIsImageReady(true)
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.current = gsap.timeline()
                .to(img.current, { scale: 1.2, duration: 0.5 })
                .to(img.current, { x: -10, duration: 0.1 })
                .to(img.current, { repeat: 5, x: 10, yoyo: true, duration: 0.1 })
                .to(img.current, {x:0, duration:0.05})
                .to(img.current, { scale: 0.85, duration: 0.4})
                .to(img.current, { scale: 1, duration: 0.5})
                .fromTo(message.current, {opacity: 0, y: 50}, {opacity:1, y:0,ease: "power1.out", duration: 0.6})
        })
    }, [isLoading])

    useEffect(() => {
        const getResponse = async () => {
            try {
                const response = await axiosPrivate.post(`/bolik/submit/${bolik.hash}`)
                    .then(() => setSuccessMsg('Поздравляем, вы добавили болик в коллекцию!'));
            } catch (err) {
                console.log(err)
                setErrMsg(err.response.data.message)
            } finally {
                setIsLoading(true);
            }
        }
        getResponse()
    }, [])

    return (
        <section className={s.bolik} >
            {isLoading ?
                <>
                    <div className={s.image} ref={img}>
                        <Image
                            src={process.env.NEXT_PUBLIC_IMG_URL + bolik.img}
                            fill
                            alt=""
                            className={cl({ [s.opacity]: errMsg }, "borderImg")}
                            style={{ opacity: !isImageReady ? '0' : '' }}
                            onLoadingComplete={onLoadCallBack}
                            sizes="300px"
                        />
                        {!isImageReady && (<Skeleton circle width={300} height={300} />)}
                    </div>
                    <div className={s.info} ref={message}>
                        <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })} >
                            {
                                successMsg ? successMsg : errMsg
                            }
                        </p>
                        <Button className={s.button}
                            onClick={() => {
                                dispatch(clearBolik())
                                dispatch(setActiveStep(1));
                            }}>
                            Добавить другой
                        </Button>
                    </div>
                </> : <p>Добавляем ваш болик в коллекцию</p>}
        </section>
    )
}

export default BolikSave
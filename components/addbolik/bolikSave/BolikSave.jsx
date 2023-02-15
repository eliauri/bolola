/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect } from 'react'
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
import { useLayoutEffect } from 'react'


const BolikSave = () => {
    const [errMsg, setErrMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isImageReady, setIsImageReady] = useState(false);
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const bolik = useSelector(state => state.bolik.bolik);
    const el = useRef(null);

    const onLoadCallBack = (e) => {
        setIsImageReady(true)
    }

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.current = gsap.timeline()
                .to(el.current, { scale: 1.5, })
                .to(el.current, { scale: 1, duration: 0.3})
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
        getResponse();
    }, [])

    return (
        <section className={s.bolik} >
            {isLoading ?
                <>
                    <div className={s.image} ref={el}>
                        <Image
                            src={process.env.NEXT_PUBLIC_IMG_URL + bolik.img}
                            width={300}
                            height={300}
                            alt=""
                            className={cl({ [s.opacity]: errMsg })}
                            style={{ opacity: !isImageReady ? '0' : '' }}
                            onLoadingComplete={onLoadCallBack}
                        />
                        {!isImageReady && (<Skeleton circle width={300} height={300} />)}
                    </div>
                    <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })}>
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
                </> : <p>Добавляем ваш болик в коллекцию</p>}
        </section>
    )
}

export default BolikSave
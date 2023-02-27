/* eslint-disable react-hooks/exhaustive-deps */
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import s from './bolikCheck.module.scss'
import "react-loading-skeleton/dist/skeleton.css";
import cl from 'classnames'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, setBolikImg, clearBolik } from '../../../store/bolik/addbolik-slice';
import Skeleton from 'react-loading-skeleton'
import { gsap } from "gsap";
import { useRef } from 'react'


const BolickCheck = () => {
  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [isImageReady, setIsImageReady] = useState(false);
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const bolik = useSelector(state => state.bolik.bolik);

  const el = useRef(null);

  const onLoadCallBack = (e) => {
    setIsImageReady(true)
  }
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axiosPrivate.get(`/bolik/check/${bolik.hash}`)
        setData(response.data)
        dispatch(setBolikImg(response.data.image));
        if (response.data.status == 0) {
          setSuccessMsg('Болик свободен, вы можете добавить его в коллекцию!')
        } else if (response.data.status == 1) {
          setErrMsg('Болик занят другим человеком, попробуйте другой!')
        } else if (response.data.status == 2) setErrMsg('Данный болик уже погашен')
      } catch (err) {
        setData(err)
        setErrMsg(err.response.data.message)
      }
    }
    getResponse()
  }, [])
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.current = gsap.timeline()
      .fromTo(el.current, {opacity: 0, y: 50}, {opacity:1, y: 0, duration: 0.6})
    })
  }, [data])

  return (
    <section className={s.bolik} ref={el}>
      {data ?
        <>
          <div className={s.image}>
            {!isImageReady && (<Skeleton circle width={'100%'} height={'100%'} />)}
            <Image
              src={process.env.NEXT_PUBLIC_IMG_URL + data.image}
              fill
              alt=""
              style={{ opacity: !isImageReady ? '0' : '' }}
              className={cl({ [s.opacity]: errMsg }, "borderImg")}
              onLoadingComplete={onLoadCallBack}
              sizes="300px"
            />
          </div>
          <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })}>
            {
              successMsg ? successMsg : errMsg
            }
          </p>
          {errMsg ?
            <Button className={s.button} onClick={() => {
              dispatch(setActiveStep(1));
              dispatch(clearBolik());
            }}>Добавить другой
            </Button>
            :
            <Button className={s.button} onClick={() => { dispatch(setActiveStep(3)) }}>
              Добавить в коллекцию
            </Button>}
        </>
        : <p>Идет поиск болика...</p>}
    </section>
  )
}

export default BolickCheck
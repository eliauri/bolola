import Image from 'next/image'
import React, { useLayoutEffect, useState } from 'react'
import s from './bolikCheck.module.scss'
import bolikImg from '../../../public/bolik2.png'
import cl from 'classnames'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, setBolikImg , clearBolik} from '../../../store/bolik/addbolik-slice';

const BolickCheck = () => {
  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [data, setData] = useState();
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useDispatch();
  const bolik = useSelector(state => state.bolik.bolik);

  const getResponse = async () => {
    try {
      const response = await axiosPrivate.get(`/bolik/check/${bolik.hash}`)
        .then((res) => res.data)
        .then((res) => {
          dispatch(setBolikImg(res.image));
          if (res.status == 0) {
            setSuccessMsg('Болик свободен, вы можете добавить его в коллекцию!')
          } else if (res.status == 1) {
            setErrMsg('Болик занят другим человеком, попробуйте другой!')
          } else if (res.status == 2) setErrMsg('Данный болик уже погашен')
        })
    } catch (err) {
      console.log(err)
      setErrMsg(err.response.data.message)
    }
  }
  useLayoutEffect(() => {
     getResponse();
  }, [])

  return (
    <section className={s.bolik}>
      <Image src={process.env.NEXT_PUBLIC_IMG_URL + bolik.img} width={300} height={300} alt="" className={cl({ [s.opacity]: errMsg })} />
      <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })}>
        {
          successMsg ? successMsg : errMsg
        }
      </p>
      {errMsg ?
        <Button className={s.button} onClick={() => {
           dispatch(setActiveStep(1));
            dispatch(clearBolik());
        }}>Добавить другой</Button> :
        <Button className={s.button} onClick={() => { dispatch(setActiveStep(3))}}>Добавить в коллекцию</Button>}
    </section>
  )
}

export default BolickCheck
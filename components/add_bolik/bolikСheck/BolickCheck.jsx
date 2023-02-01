import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import s from './bolikCheck.module.scss'
import bolikImg from '../../../public/bolik2.png'
import cl from 'classnames'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'


const BolickCheck = ({ bolik, setActiveStep }) => {
  const [errMsg, setErrMsg] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const axiosPrivate = useAxiosPrivate();

  const getResponse = async () => {
    try {
      const response = await axiosPrivate.get(`/bolik/check/${bolik}`)
        .then((res) => res.data)
        .then((res) => {
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
  useEffect(() => {
     getResponse();
  }, [])
  return (
    <section className={s.bolik}>
      <Image src={bolikImg} width={300} height={300} alt="" className={cl({ [s.opacity]: errMsg })} />
      <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })}>
        {
          successMsg ? successMsg : errMsg
        }
      </p>
      {errMsg ?
        <Button className={s.button} onClick={() => { setActiveStep(1) }}>Добавить другой</Button> :
        <Button className={s.button} onClick={() => { setActiveStep(3) }}>Добавить в коллекцию</Button>}
    </section>
  )
}

export default BolickCheck
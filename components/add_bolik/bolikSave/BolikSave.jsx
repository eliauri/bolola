import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import cl from 'classnames'
import s from '../bolikСheck/bolikCheck.module.scss'
import bolikImg from '../../../public/bolik2.png'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'

const BolikSave = ({bolik, setActiveStep}) => {
    const [errMsg, setErrMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const axiosPrivate = useAxiosPrivate();
    const getResponse = async () => {
        try {
            const response = await axiosPrivate.post(`/bolik/submit/${bolik}`)
                .then((res) => res.data)
                .then(()=> setSuccessMsg('Поздравляем, вы добавили болик в коллекцию!'));
        } catch (err) {
            console.log(err)
            // setErrMsg(err.response.data.message)
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
            <Button className={s.button} onClick={() => { setActiveStep(1) }}>Добавить другой</Button>
        </section>
    )
}

export default BolikSave
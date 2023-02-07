import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import cl from 'classnames'
import s from '../bolikСheck/bolikCheck.module.scss'
import bolikImg from '../../../public/bolik2.png'
import Button from '../../button/Button'
import useAxiosPrivate from '../../../hooks/useAxiosPrivate'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveStep, clearBolik } from '../../../store/bolik/addbolik-slice';

const BolikSave = () => {
    const [errMsg, setErrMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();
    const axiosPrivate = useAxiosPrivate();
    const dispatch = useDispatch();
    const bolik = useSelector(state => state.bolik.bolik);

    const getResponse = async () => {
        try {
            const response = await axiosPrivate.post(`/bolik/submit/${bolik.hash}`)
                .then((res) => res.data)
                .then(() => setSuccessMsg('Поздравляем, вы добавили болик в коллекцию!'));
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
            <Image src={process.env.NEXT_PUBLIC_IMG_URL + bolik.img} width={300} height={300} alt="" className={cl({ [s.opacity]: errMsg })} />
            <p className={cl({ [s.access]: successMsg }, { [s.error]: errMsg })}>
                {
                    successMsg ? successMsg : errMsg
                }
            </p>
            <Button className={s.button}
                onClick={() => {
                    dispatch(setActiveStep(1));
                    dispatch(clearBolik())
                }}>
                Добавить другой
            </Button>
        </section>
    )
}

export default BolikSave
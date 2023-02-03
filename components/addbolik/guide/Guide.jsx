import React, { useEffect } from 'react'
import Button from '../../button/Button'
import s from './guide.module.scss'
import { useDispatch } from 'react-redux'
import { setActiveStep } from '../../../store/bolik/addbolik-slice';

const Guide = () => {
    const dispatch = useDispatch();

    const list = [
        { id: 1, name: 'Наведите камеру на qr-код с обратной стороны болика' },
        { id: 2, name: 'Добавьте болик в коллекцию' },
        { id: 3, name: 'Соберите коллекцию боликов и получите подарок' },
    ]
    useEffect(() => {

    },)
    return (
        <section className={s.guide}>
            <ul className={s.list}>
                {
                    list.map((el) => (
                        <li key={el.id} >
                            <span className={s.order}>{el.id}</span>
                            <p className={s.name}>{el.name}</p>
                        </li>
                    ))
                }
            </ul>
            <Button onClick={() => {dispatch(setActiveStep(1))}}>
                Добавить болик</Button>
        </section>
    )
}

export default Guide
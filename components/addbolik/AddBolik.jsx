/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Container from '../Container'
import Title from '../title/title'
import s from './addBolik.module.scss'

import Guide from './guide/Guide'
import Scanner from './scanner/Scanner'
import { setActiveStep, setBolik } from '../../store/bolik/addbolik-slice';
import BolickCheck from './bolikСheck/BolickCheck'
import BolikSave from './bolikSave/BolikSave'

const AddBolik = () => {
    const activestep = useSelector(state => state.bolik.activeStep)
    const dispatch = useDispatch();
    const router = useRouter();
    const components = [
        <Guide key={0} />,
        <Scanner key={1} />,
        <BolickCheck key={2} />,
        <BolikSave key={3} />
    ];
   
    useEffect(() => {
        if (!router.isReady) return;
        if (router.query.bolik) {
            dispatch(setBolik(router.query.bolik))
            dispatch(setActiveStep(2));
        }
        return () => {
            dispatch(setActiveStep(0));
        }
    }, [router.isReady]);

    return (
        <article className={s.addBolik}>
            <Container>
                <Title color='white' className={s.title}>Добавь болик в коллекцию</Title>
                <div className={s.wrapper}>
                    {components[activestep]}
                </div>
            </Container>
        </article >
    )
}
export default AddBolik
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Container from '../Container'
import Title from '../title/title'
import s from './addBolik.module.scss'
import BolikSave from './BolikSave/bolikSave'
import BolickCheck from './bolikСheck/bolickCheck'
import Guide from './guide/Guide'
import Scanner from './scanner/Scanner'


const AddBolik = () => {
    const [bolik, setBolik] = useState();
    const [activeStep, setActiveStep] = useState(0);

    const components = [
        <Guide key={0} setActiveStep={setActiveStep} />,
        <Scanner key={1} setActiveStep={setActiveStep} setBolik={setBolik} />,
        <BolickCheck key={2} setActiveStep={setActiveStep} bolik={bolik} />,
        <BolikSave key={3} setActiveStep={setActiveStep} bolik={bolik} />
    ]

    const  router = useRouter();
    useEffect(() => {
        if (!router.isReady) return;
        setBolik(router.query.bolik)
        setActiveStep(2);

    }, [router.isReady]);

    return (
        <article className={s.addBolik}>
            <Container>
                <Title color='white' className={s.title}>Добавь болик в коллекцию</Title>
                <div className={s.wrapper}>
                    {components[activeStep]}
                </div>
            </Container>
        </article >
    )
}
export default AddBolik
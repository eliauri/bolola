import React, { useEffect, useRef, useState } from 'react'
import s from './auth.module.scss'
import PinField from "react-pin-field"

const VerificationCall = (props) => {
    const ref = useRef([]);
    const [code, setCode] = useState();
    const [completed, setCompleted] = useState(false);
    const [errorMsg, setErrMsg] = useState();
    useEffect(() => {
        console.log(code, props.code)
        if (completed) {
            if (props.code == code) {
                props.registration();
                props.onClose();
            }
            else {
                setErrMsg(<p className={s.errMsg}>Неверный пин-код</p>)
                ref && ref.current && ref.current.forEach(input => (input.value = ""))
                setCompleted(false);
            }
        }
    }, [completed])

    return (
        <div className={s.verification}>
            {/* <h2 className={s.title}>Для подверждения номера телефона вам поступит звонок, <br/>введите последнии 4 цифры номера.</h2> */}
            <h2 className={s.title}>Мы вам звоним! Для завершения регистрации введите последние четыре цифры номера телефона.</h2>
            
            {errorMsg ? errorMsg : ''}
            <form className={s.form}>
                <PinField
                    ref={ref}
                    length={4}
                    validate={/^[0-9]$/}
                    onComplete={() => setCompleted(true)}
                    onChange={setCode}
                    className={s.input}
                />
            </form>
        </div>
    )
}

export default VerificationCall
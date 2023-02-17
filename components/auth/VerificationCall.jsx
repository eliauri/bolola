import React, { useEffect, useRef, useState } from 'react'
import s from './auth.module.scss'
import PinField from "react-pin-field"

const VerificationCall = (props) => {
    const ref = useRef([]);
    const [code, setCode] = useState();
    const [completed, setCompleted] = useState(false);
    const [errorMsg, setErrMsg] = useState();

    useEffect(() => {
        ref.current[0].focus();
    }, [])

    useEffect(() => {
        if (completed) {
            props.setData((prev) => prev['code'] = String(code));
            props.request()
            .then(() => {
                props.onClose();
            }).catch((err) => {
                if (err?.response?.data?.message) {
                    setErrMsg(<p className={s.errMsg}>{err.response.data.message}</p>)
                }
                ref && ref.current && ref.current.forEach(input => (input.value = ""));
                setCompleted(false);
                ref.current[0].focus();
            })
        }
    }, [completed])

    return (
        <div className={s.verification}>
            <h2 className={s.title}>Мы вам звоним! Для подверждения номера телефона введите последнии 4 цифры номера.</h2>
            {errorMsg ? errorMsg : ''}
            <form className={s.form}>
                <PinField
                    ref={ref}
                    length={4}
                    validate={/^[0-9]$/}
                    type="number"
                    onComplete={() => setCompleted(true)}
                    onChange={setCode}
                    className={s.input}
                />
            </form>
        </div>
    )
}

export default VerificationCall
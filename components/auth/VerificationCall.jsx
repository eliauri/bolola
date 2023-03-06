/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react'
import s from './auth.module.scss'
import PinField from "react-pin-field"
import { useDispatch, useSelector } from 'react-redux';
import { setCode, setCompleted } from '../../store/verification/verification-slice';


const VerificationCall = () => {
    const ref = useRef([]);
    const { errorMsg, completed } = useSelector(state => state.verification);
    const dispatch = useDispatch();

    useEffect(() => {
        ref.current[0].focus();
    }, [])

    useEffect(() => {
        if (errorMsg) {
            ref && ref.current && ref.current.forEach(input => (input.value = ""));
            dispatch(setCompleted(false));
            dispatch(setCode(''));
            ref.current[0].focus();
        }
    }, [errorMsg, completed])

    return (
        <div className={s.verification}>
            <h2 className={s.title}>Мы вам звоним! Для подверждения номера телефона введите последнии 4 цифры номера.</h2>
            {errorMsg ?
                <p className={s.errMsg}>{errorMsg}</p> : ''}
            <form className={s.form}>
                <PinField
                    ref={ref}
                    length={4}
                    validate={/^[0-9]$/}
                    type="number"
                    inputMode="number"
                    onComplete={() => dispatch(setCompleted(true))}
                    onChange={(code) => dispatch(setCode(code))}
                    className={s.input}
                />
            </form>
        </div>
    )
}

export default VerificationCall
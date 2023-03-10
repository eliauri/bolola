/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useForm, Controller } from 'react-hook-form'
import s from './auth.module.scss'
import axios from '../../pages/api/axios';
import cl from 'classnames'
import Button from '../button/Button';
import Modal from '../modal/Modal'
import VerificationCall from './VerificationCall';
import Link from 'next/link';
import { setVerificationError } from '../../store/verification/verification-slice';
import { useDispatch, useSelector } from 'react-redux';
import { setData, setErrMsg, setResponse } from '../../store/resetPassword/password-slice';

const ResetPassword = () => {
    const [modal, setModal] = useState(false);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({ mode: 'onBlur' });
    const dispatch = useDispatch();
    const { completed, code } = useSelector(state => state.verification);
    const {data, errMsg, responseSuccess} = useSelector(state => state.resetPassword)

    const resetPassword = async () => {
        const response = await axios.post('/forget-password/', {phone: data.tel, password: data.password, 'code': code})
        .then(() => {
            setModal(false);
            dispatch(setResponse(true));
            dispatch(setErrMsg(''))
        }).catch((err) => {
            console.log(err);
            dispatch(setVerificationError(err.response.data.message))
        })
    }

    const verify = async (data) => {
        const response = await axios.post('/phone-password/', { phone: data.tel })
            .then((res) => {
                dispatch(setErrMsg(''))
                setModal(true);
            }).catch((err) => {
                console.log(err);
                dispatch(setErrMsg(err.response.data.message))
            })
    }

    useEffect(() => {
        if (data) {
            resetPassword();
        }
    }, [completed])

    const onSubmit = async (data) => {
        verify(data);
        dispatch(setData(data))
    }

    return (
        <>
            {!responseSuccess ?
                <>
                    <h1 className={s.auth__title}>?????????????? ????????????</h1>
                    {errMsg && <p className={s.auth__serverError}>{errMsg}</p>}
                    <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.auth__inputLine}>
                            <label htmlFor="tel">
                                ??????????????:
                            </label>
                            <Controller
                                name="tel"
                                control={control}
                                rules={{
                                    validate: value => isValidPhoneNumber(String(value)) || '???????????????????????? ?????????? ????????????????'
                                }}
                                render={({ field: { onBlur, onChange, value } }) => (
                                    <Input
                                        value={value}
                                        onBlur={onBlur}
                                        onChange={onChange}
                                        rules={{
                                            validate: (value) => isValidPhoneNumber(value),
                                        }}
                                        defaultCountry='RU'
                                        id="tel"
                                        className={cl({ [s.auth__inputError]: errors.tel })}
                                    />
                                )}
                            />
                            {errors.tel && (<p className={s.auth__textError}>{errors.tel.message}</p>)}
                        </div>
                        <div className={s.auth__inputLine}>
                            <label htmlFor="password">
                                ?????????? ????????????:
                            </label>
                            <input
                                id="password"
                                type={"password"}
                                className={cl({ [s.auth__inputError]: errors.password })}
                                {...register('password',
                                    {
                                        required: '?????????????? ????????????',
                                        pattern: {
                                            value: /(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]/,
                                            message: '???????????? ???? ?????????? ???????????????? ???????????? ???? ???????? ?? ????????????????'
                                        },
                                        minLength: { value: 8, message: '???????????? ???????????? ?????????????????? ?????????????? 8 ????????????????' }
                                    },
                                )}
                                autoComplete="off"
                            />
                            {errors.password && (<p className={s.auth__textError}>{errors.password.message}</p>)}
                        </div>
                        <div className={s.account__inputLine}>
                            <label htmlFor="confirm_password">
                                ?????????????????????? ????????????:
                            </label>
                            <input
                                type={"password"}
                                id="confirm_password"
                                className={cl({ [s.auth__inputError]: errors.confirm_password })}
                                {...register('confirm_password',
                                    {
                                        required: '?????????????? ????????????',
                                        validate: (val) => {
                                            if (watch('password') != val) {
                                                return "???????????? ???? ??????????????????";
                                            }
                                        },
                                    },
                                )}
                                autoComplete="off"
                            />
                            {errors.confirm_password && (<p className={s.auth__textError}>{errors.confirm_password.message}</p>)}
                        </div>
                        <Button>??????????????????</Button>
                    </form>
                    <p className={s.auth__reference}>?????? ?????????????????{<Link href={'/auth/signup'} className={s.auth__blueLink}> ????????????????????????????????????</Link>}</p>
                </> :
                <p className={s.auth__success}>???????????? ?????????????? ??????????????</p>
            }
            <p className={s.auth__reference}>{<Link href={'/auth/signin'}>?????????????????? ?? ??????????????????????</Link>}</p>
            <Modal onClose={() => setModal(false)} modal={modal}>
                <VerificationCall/>
            </Modal>
        </>
    )
}

export default ResetPassword
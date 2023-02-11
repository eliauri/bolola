import React, { useState } from 'react'
import Input, { isValidPhoneNumber } from "react-phone-number-input/input";
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/router'
import s from './auth.module.scss'
import axios from '../../pages/api/axios';
import cl from 'classnames'
import Button from '../button/Button';
import Modal from '../modal/Modal'
import VerificationCall from './VerificationCall';
import Link from 'next/link';

const ResetPassword = () => {
    const [modal, setModal] = useState(false);
    const [data, setData] = useState();
    const [errMsg, setErrMsg] = useState();
    const [success, setSuccess] = useState(false);
    const { register, handleSubmit, control, watch, formState: { errors } } = useForm({ mode: 'onBlur' });

    const verify = async (data) => {
        const response = await axios.post('/phone-password/', { phone: data.tel })
            .then((res) => {
                setErrMsg('');
                setModal(true);
            }).catch((err) => {
                console.log(err);
                setErrMsg(err.response.data.message);
            })
    }
    const reset = async () => {
        try {
            const response = await axios.post('/forget-password/',
                {
                    code: data.code,
                    phone: data.tel,
                    password: data.password
                }
            );
            setErrMsg('');
            setSuccess(true)
        } catch (err) {
            console.log(err);
            if (err?.response?.data?.message)
                setErrMsg(err.response.data.message)
        }
    }

    const onSubmit = async (data) => {
        verify(data);
        setData(data);
    }
    return (
        <>
            {!success ?
                <>
                 <h1 className={s.auth__title}>Сменить пароль</h1>
                    {errMsg && <p className={s.auth__serverError}>{errMsg}</p>}
                    <form className={s.auth__form} onSubmit={handleSubmit(onSubmit)}>
                        <div className={s.auth__inputLine}>
                            <label htmlFor="tel">
                                Телефон:
                            </label>
                            <Controller
                                name="tel"
                                control={control}
                                rules={{
                                    validate: value => isValidPhoneNumber(String(value)) || 'Некорректный номер телефона'
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <Input
                                        value={value}
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
                                Пароль:
                            </label>
                            <input
                                id="password"
                                type={"password"}
                                className={cl({ [s.auth__inputError]: errors.password })}
                                {...register('password',
                                    {
                                        required: 'Введите пароль',
                                        pattern: {
                                            value: /(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]/,
                                            message: 'Пароль не может состоять только из цифр и символов'
                                        },
                                        minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' }
                                    },
                                )}
                                autoComplete="off"
                            />

                            {errors.password && (<p className={s.auth__textError}>{errors.password.message}</p>)}
                        </div>
                        <div className={s.account__inputLine}>
                            <label htmlFor="confirm_password">
                                Подтвердите пароль:
                            </label>
                            <input
                                type={"password"}
                                id="confirm_password"
                                className={cl({ [s.auth__inputError]: errors.confirm_password })}
                                {...register('confirm_password',
                                    {
                                        required: 'Введите пароль',
                                        validate: (val) => {
                                            if (watch('password') != val) {
                                                return "Пароли не совпадают";
                                            }
                                        },
                                    },
                                )}

                            />
                            {errors.confirm_password && (<p className={s.auth__textError}>{errors.confirm_password.message}</p>)}
                        </div>
                        <Button>Отправить</Button>
                    </form> 
                    <p className={s.auth__reference}>Нет аккаунта?{<Link href={'/auth/signup'} className={s.auth__blueLink}> Зарегистрироваться</Link>}</p>
                    </> : 
                    <p className={s.auth__success}>Пароль успешно изменен</p>
            }
            <p className={s.auth__reference}>{<Link href={'/auth/signin'}>Вернуться к авторизации</Link>}</p>
            <Modal onClose={() => setModal(false)} modal={modal}>
                <VerificationCall
                    onClose={() => setModal(false)}
                    setData={setData}
                    request={reset}
                />
            </Modal>
        </>
    )
}

export default ResetPassword
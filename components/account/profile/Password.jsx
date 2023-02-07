import React, { useEffect, useState } from 'react'
import s from './profile.module.scss'
import { useForm } from 'react-hook-form'
import cl from 'classnames'
import Image from 'next/image'
import Button from '../../button/Button';
import pencil from '../../../public/pencil.svg'
import Modal from '../../modal/Modal'
import { axiosPrivate } from '../../../pages/api/axios'

const Password = () => {
    const [modal, setModal] = useState(false);
    const [err, setError] = useState('');
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        mode: 'onBlur',
    });
    const onSubmit = async (data) => {
        try {
            const response = await axiosPrivate.post('/new-pass/', {
                new: data.new,
                old: data.old
            }).then((res) =>{
                if(res.status== 201){
                    setError();
                    setModal(false);
                }
            })
        } catch (err) {
            console.log(err)
            if(err.response.status == 409)
            setError('Старый пароль введен неверно')
        }
    }
    return (
        <div className={s.passwordResst}>
            <div className={s.inputLine}>
                <label htmlFor="pas">
                    Пароль:
                </label>
                <input
                    type={"password"}
                    id="pas"
                    value={'111111'}
                    autoComplete="off"
                    readOnly
                />
                <Image src={pencil} alt='Сменить пароль' onClick={() => setModal(true)} />
            </div>
            <Modal onClose={() => setModal(false)} modal={modal}>
                <form className={s.password} onSubmit={handleSubmit(onSubmit)}>
                    {err ? <p className={s.account__textError}>{err}</p> : ''}
                    <div className={s.account__inputLine}>
                        <label htmlFor="old">
                            Старый пароль:
                        </label>
                        <input
                            type={"password"}
                            id="old"
                            className={cl({ [s.account__inputError]: errors.old })}
                            {...register('old',
                                {
                                    required: 'Введите пароль',
                                },
                            )}
                            autoComplete="off"
                        />
                    </div>
                    <div className={s.account__inputLine}>
                        <label htmlFor="new">
                            Новый пароль:
                        </label>
                        <input
                            type={"password"}
                            id="new"
                            className={cl({ [s.account__inputError]: errors.new })}
                            {...register('new',
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
                        {errors.new && (<p className={s.account__textError}>{errors.new.message}</p>)}
                    </div>
                    <div className={s.account__inputLine}>
                        <label htmlFor="confirm_password">
                            Подтвердите пароль:
                        </label>
                        <input
                            type={"password"}
                            id="confirm_password"
                            className={cl({ [s.account__inputError]: errors.confirm_password })}
                            {...register('confirm_password',
                                {
                                    required: 'Введите пароль',
                                    validate: (val) => {
                                        if (watch('new') != val) {
                                            return "Пароли не совпадают";
                                        }
                                    },
                                    minLength: { value: 8, message: 'Пароль должен содержать минимум 8 символов' }
                                },
                            )}
                            autoComplete="off"
                        />
                        {errors.confirm_password && (<p className={s.account__textError}>{errors.confirm_password.message}</p>)}
                    </div>
                    <Button>Сохранить</Button>
                </form>
            </Modal>
        </div>
    )
}


export default Password